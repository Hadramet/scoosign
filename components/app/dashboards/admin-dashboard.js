import { useAuth } from "@/hooks/use-auth";
import { Box, Grid, Typography } from "@mui/material";

export const AdminDashboard = (props) => {
  const { user } = useAuth();
  return (
    <Box sx={{ mb: 4 }} {...props}>
      <Grid container spacing={3} sx={{ p: 3 }}>
        <Grid item container justifyContent="space-between" spacing={3}>
          <Grid item>
            <Typography variant="h4">{`Hello ${user?.name}`}</Typography>
          </Grid>
          
        </Grid>
        <Grid item>
            <Typography variant="body2">TODO  : Stats here ...</Typography>
          </Grid>
      </Grid>
    </Box>
  );
};
