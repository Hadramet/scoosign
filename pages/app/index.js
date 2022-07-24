import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { AppLayout } from "../../components/app/app-layout";
import { Reports as ReportsIcon } from "../../components/icons";
import { AuthGuard } from "../../components/authentication/auth-guard";

const Overview = () => {
  return (
    <>
      <Head>
        <title>App - Dashboard | ScooSign</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="x1">
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">Good Morning</Typography>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  alignItems: "center",
                  m: -1,
                }}
              >
                <Button
                  startIcon={<ReportsIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="outlined"
                >
                  Reports
                </Button>
                <TextField
                  defaultValue="week"
                  label="Period"
                  select
                  size="small"
                  sx={{ m: 1 }}
                >
                  <MenuItem value="week">Last week</MenuItem>
                  <MenuItem value="month">Last month</MenuItem>
                  <MenuItem value="year">Last year</MenuItem>
                </TextField>
              </Grid>
            </Grid>{" "}
          </Box>
        </Container>
      </Box>
    </>
  );
};

Overview.getLayout = (page) => (
  <AuthGuard>
    <AppLayout>{page}</AppLayout>
  </AuthGuard>
);

export default Overview;
