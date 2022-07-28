import { createContext, useEffect, useReducer } from "react";
import { authorizeUserApi, meUserApi } from "../lib/user-api";
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
          const res = await meUserApi(accessToken);
          if (res.ok) {
            const { data } = await res.json();
            dispatch({
              type: ActionType.INITIALIZE,
              payload: {
                isAuthenticated: true,
                user: data,
              },
            });
          } else {
            // The token has expired
            logout();
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
    try {
      const loginResponse = await authorizeUserApi(email, password);
      const loginResJson = await loginResponse.json();
      if (!loginResponse.ok)
        throw new Error(loginResJson.message || loginResponse.statusText);

      const token = loginResJson.data.token;
      
      if (!loginResJson.success) throw new Error(loginResJson.message);
      const authResponse = await meUserApi(token);
      const authResJson = await authResponse.json();
      if (!authResponse.ok)
        throw new Error(authResJson.message || authResponse.statusText);
      if (!authResJson.success) throw new Error(authResJson.message);

      localStorage.setItem("accessToken", token);
      dispatch({
        type: ActionType.LOGIN,
        payload: {
          user: authResJson.data,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
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
