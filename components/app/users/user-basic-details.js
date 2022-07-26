import {
  Card,
  CardHeader,
  Divider,
  useMediaQuery,
} from "@mui/material";
import PropTypes from "prop-types";
import { PropertyList } from "../../propertyList";
import { PropertyListItem } from "../../propertyListItem";

export const UserBasicDetails = (props) => {
  const { email,  createdAt, createdBy, ...other } = props;
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const align = mdUp ? "horizontal" : "vertical";

  return (
    <Card {...other}>
      <CardHeader title="Basic Details" />
      <Divider />
      <PropertyList>
        <PropertyListItem align={align} divider label="Email" value={email} />
        <PropertyListItem align={align} divider label="Created By" value={createdBy} />
        <PropertyListItem align={align} divider label="Created At" value={createdAt} />
      </PropertyList>
    </Card>
  );
};

UserBasicDetails.propTypes = {
  email: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  createdBy: PropTypes.string.isRequired,
};
