import {
    Box, Card,
    CardContent,
    CardHeader, Divider, Typography
} from "@mui/material";

export const UserLogs = (props) => (
    <Card {...props}>
        <CardHeader title="Recent Logs" />
        <Divider />
        <CardContent>
            <Box sx={{ mt: 1 }}>
                <Typography color="textSecondary" variant="body2">
                    TODO : show at least the last 10 user log
                </Typography>
            </Box>
        </CardContent>
    </Card>
);
