import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  useMediaQuery,
} from "@mui/material";
import PropTypes from "prop-types";
import { PropertyList } from "../../propertyList";
import { PropertyListItem } from "../../propertyListItem";

export const UserBasicDetails = (props) => {
  const { email, createdAt, createdBy, ...other } = props;
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const align = mdUp ? "horizontal" : "vertical";
  const handleResetPassword = (e) =>{
    e.preventDefault()
    console.log('TODO Reset password')
  }
  return (
    <Card {...other}>
      <CardHeader title="Basic Details" />
      <Divider />
      <PropertyList>
        <PropertyListItem align={align} divider label="Email" value={email} />
        <PropertyListItem
          align={align}
          divider
          label="Created By"
          value={createdBy}
        />
        <PropertyListItem
          align={align}
          divider
          label="Created At"
          value={createdAt}
        />
      </PropertyList>
      <CardActions
        sx={{
          flexWrap: "wrap",
          px: 3,
          py: 2,
          m: -1,
        }}
      >
        <Button
          sx={{ m: 1 }}
          onClick={(e) => handleResetPassword(e)}
          variant="outlined"
        >
          Reset &amp; Send Password
        </Button>
      </CardActions>
    </Card>
  );
};

UserBasicDetails.propTypes = {
  email: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  createdBy: PropTypes.string.isRequired,
};
