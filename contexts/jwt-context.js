import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";

var ActionType;
(function (ActionType) {
  ActionType["INITIALIZE"] = "INITIALIZE";
  ActionType["LOGIN"] = "LOGIN";
  ActionType["LOGOUT"] = "LOGOUT";
})(ActionType || (ActionType = {}));

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};
const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = globalThis.localStorage.getItem("accessToken");

        if (accessToken) {
          const res = await fetch("/api/v1/authorize/me", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Scoosign-Authorization": `Bearer ${accessToken}`,
            },
          });
          if (res.ok) {
            const { data } = await res.json();
            dispatch({
              type: ActionType.INITIALIZE,
              payload: {
                isAuthenticated: true,
                user: data,
              },
            });
          }else{ 
            // The token has expired
            logout()
          }
        } else {
          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (error) {
        console.error("[Jwt Context Init]", error);
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    await fetch("/api/v1/authorize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then(async (login_data) => {
        if (login_data.success) {
          const authorization = `Bearer ${login_data.data.token}`;
          await fetch("/api/v1/authorize/me", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Scoosign-Authorization": authorization,
            },
          })
            .then((response) => response.json())
            .then((me_data) => {
              localStorage.setItem("accessToken", login_data.data.token);
              dispatch({
                type: ActionType.LOGIN,
                payload: {
                  user: me_data.data,
                },
              });
            })
            .catch((error) => {
              console.error("[me Api]", error.message);
              throw new Error(error.message);
            });
        } else {
          throw new Error(login_data.message);
        }
      })
      .catch((error) => {
        console.error("[Auth Api]", error.message);
        throw new Error(error.message);
      });
  };

  const logout = async () => {
    localStorage.removeItem("accessToken");
    dispatch({ type: ActionType.LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const AuthConsumer = AuthContext.Consumer;
