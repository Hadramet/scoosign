import { List } from "@mui/material";

export const PropertyList = (props) => {
    const { children } = props;
    return <List disablePadding>{children}</List>;
};
