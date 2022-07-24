import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../hooks/use-auth";

export const RoleGuard = (props) => {
  const { children, permissions } = props;
  const auth  = useAuth();
  const {user} = useAuth();

  const [canView, setCanView] = useState(false);

  useEffect(() => {
    if (auth.isAuthenticated) {
      if (auth.user) {
        let res = false;
        permissions?.map((val) => {
          if (val === "all" || val === user.role) res = true;
        });

        if (res) setCanView(true);
      }
    }
  }, []);

  if (!canView) return null;

  return <>{children}</>;
};
RoleGuard.propTypes = {
  children: PropTypes.node,
  permissions: PropTypes.array,
};
