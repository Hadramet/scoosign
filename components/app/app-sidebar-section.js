import PropTypes from "prop-types";
import { List, ListSubheader } from "@mui/material";
import { AppSidebarItem } from "./app-sidebar-item";
import { RoleGuard } from "../authentication/role-guard";

const renderNavItems = ({ depth = 0, items, path }) => (
  <List disablePadding>
    {items.reduce(
      (acc, item) => reduceChildRoutes({ acc, depth, item, path }),
      []
    )}
  </List>
);

const reduceChildRoutes = ({ acc, depth, item, path }) => {
  const key = `${item.title}-${depth}`;
  const partialMatch = item.path ? path.includes(item.path) : false;
  const exactMatch = path.split("?")[0] === item.path; // We don't compare query params

  if (item.children) {
    acc.push(
      <AppSidebarItem
        active={partialMatch}
        chip={item.chip}
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={partialMatch}
        permissions={item.permissions}
        path={item.path}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          items: item.children,
          path,
        })}
      </AppSidebarItem>
    );
  } else {
    acc.push(
      <AppSidebarItem
        active={exactMatch}
        chip={item.chip}
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        permissions={item.permissions}
        path={item.path}
        title={item.title}
      />
    );
  }

  return acc;
};

export const AppSidebarSection = (props) => {
  const { items, path, title, permissions, ...other } = props;

  return (
    <RoleGuard permissions={permissions}>
      <List
        subheader={
          <ListSubheader
            disableGutters
            disableSticky
            sx={{
              color: "neutral.500",
              fontSize: "0.75rem",
              fontWeight: 700,
              lineHeight: 2.5,
              ml: 4,
              textTransform: "uppercase",
            }}
          >
            {title}
          </ListSubheader>
        }
        {...other}
      >
        {renderNavItems({
          items,
          path,
        })}
      </List>
    </RoleGuard>
  );
};

AppSidebarSection.propTypes = {
  items: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  permissions: PropTypes.array,
};
