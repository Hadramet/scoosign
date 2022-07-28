import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader, Divider, Typography
} from "@mui/material";
import PropTypes from "prop-types";

export const UserDataManagement = (props) => {
    const { handleDeleteUser, ...other } = props;
    return (
        <Card {...other}>
            <CardHeader title="Data Management" />
            <Divider />
            <CardContent>
                <Button
                    onClick={(e) => {
                        handleDeleteUser(e);
                    }}
                    color="error"
                    variant="outlined"
                >
                    Delete User
                </Button>
                <Box sx={{ mt: 1 }}>
                    <Typography color="textSecondary" variant="body2">
                        Delete this user file if he has requested it under the GDPR
                        regulation law, otherwise be aware that what has been deleted can
                        never be brought back.
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};
UserDataManagement.propTypes = {
    handleDeleteUser: PropTypes.func,
};
