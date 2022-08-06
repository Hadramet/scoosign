import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { default as Head } from "next/head";
import NextLink from "next/link";
import {
  ArrowBack as ArrowBackIcon,
  AssignmentTurnedIn,
  ErrorOutline,
  FlashOffOutlined,
  Timelapse,
  Warning,
} from "@mui/icons-material";
import { AuthGuard } from "@/components/authentication/auth-guard";
import { RoleGuard } from "@/components/authentication/role-guard";
import { AppLayout } from "../../../../components/app/app-layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getFormattedStartEndDate } from "@/components/app/attendances/attendance-list-table";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

// // const CircularProgressRoot = styled("div")({
// //   height: 56,
// //   width: 56,
// // });
// // const CircularProgressBackground = styled("path")(({ theme }) => ({
// //   fill: "none",
// //   stroke:
// //     theme.palette.mode === "dark" ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.05)",
// //   strokeWidth: 4,
// // }));
// // const CircularProgressValue = styled("path")(({ theme }) => ({
// //   animation: "$progress 1s ease-out forwards",
// //   fill: "none",
// //   stroke: theme.palette.primary.main,
// //   strokeWidth: 4,
// //   "@keyframes progress": {
// //     "0%": {
// //       strokeDasharray: "0 100",
// //     },
// //   },
// // }));
// // const CircularProgress = (props) => {
// //   const { value, ...other } = props;

// //   return (
// //     <CircularProgressRoot {...other}>
// //       <svg viewBox="0 0 36 36">
// //         <CircularProgressBackground
// //           d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
// //           strokeDasharray="100, 100"
// //         />
// //         <CircularProgressValue
// //           d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
// //           strokeDasharray={`${value}, 100`}
// //         />
// //       </svg>
// //     </CircularProgressRoot>
// //   );
// // };

// // CircularProgress.propTypes = {
// //   value: PropTypes.number.isRequired,
// // };

const AttendanceDetails = (props) => {
  const router = useRouter();
  const { query } = router;

  const accessToken = globalThis.localStorage.getItem("accessToken");
  const {
    data: attendance,
    error,
    mutate,
  } = useSWR([
    `/api/v1/courses/attendance/${query.attendanceId}/certificate`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "X-Scoosign-Authorization": `Bearer ${accessToken}`,
      },
    },
  ]);

  if (error) return "Failed to fetch data";
  if (!attendance) return "loading...";

  return (
    <>
      <Head>
        <title>App : Attendance Details | ScooSign</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 3 }}>
            <Box sx={{ mb: 4 }}>
              <NextLink href="/app/attendances" passHref>
                <Link color="textPrimary" variant="subtitle2">
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="subtitle2">Attendances</Typography>
                  </Box>
                </Link>
              </NextLink>
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid
                item
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <div>
                  <Typography variant="h4">{attendance.data.name}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography color="textSecondary" variant="body2">
                      {getFormattedStartEndDate(
                        attendance.data.start,
                        attendance.data.end
                      )}
                    </Typography>
                  </Box>
                </div>
              </Grid>
              <Grid
                item
                sx={{
                  alignItems: "center",
                  display: "flex",
                  flexWrap: "wrap",
                  m: -1,
                }}
              >
                {attendance.data.isLock ? (
                  <Button
                    onClick={() => setViewPDF(true)}
                    sx={{ m: 1 }}
                    variant="outlined"
                  >
                    Preview
                  </Button>
                ) : (
                  <Button color="error" sx={{ m: 1 }} variant="contained">
                    Lock
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={4}>
            <Grid item lg={3} md={6} xs={12}>
              <Card sx={{ p: 3 }}>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    mb: 1,
                  }}
                >
                  <Avatar
                    variant="rounded"
                    sx={{
                      backgroundColor: (theme) =>
                        alpha(theme.palette.error.main, 0.1),
                      color: "error.main",
                      mr: 1,
                    }}
                  >
                    <Warning fontSize="small" />
                  </Avatar>
                  <Typography variant="h5">
                    {attendance.data.absentCount}
                  </Typography>
                </Box>
                <Typography color="textSecondary" variant="body2">
                  Absence
                </Typography>
              </Card>
            </Grid>
            <Grid item lg={3} md={6} xs={12}>
              <Card sx={{ p: 3 }}>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    mb: 1,
                  }}
                >
                  <Avatar
                    variant="rounded"
                    sx={{
                      backgroundColor: (theme) =>
                        alpha(theme.palette.success.main, 0.1),
                      color: "success.main",
                      mr: 1,
                    }}
                  >
                    <AssignmentTurnedIn fontSize="small" />
                  </Avatar>
                  <Typography variant="h5">{attendance.data.presentCount}</Typography>
                </Box>
                <Typography color="textSecondary" variant="body2">
                  Present
                </Typography>
              </Card>
            </Grid>
            <Grid item lg={3} md={6} xs={12}>
              <Card sx={{ p: 3 }}>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    mb: 1,
                  }}
                >
                  <Avatar
                    variant="rounded"
                    sx={{
                      backgroundColor: (theme) =>
                        alpha(theme.palette.warning.main, 0.1),
                      color: "warning.main",
                      mr: 1,
                    }}
                  >
                    <ErrorOutline fontSize="small" />
                  </Avatar>
                  <Typography variant="h5">0</Typography>
                </Box>
                <Typography color="textSecondary" variant="body2">
                  Justify
                </Typography>
              </Card>
            </Grid>
            <Grid item lg={3} md={6} xs={12}>
              <Card sx={{ p: 3 }}>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    mb: 1,
                  }}
                >
                  <Avatar
                    variant="rounded"
                    sx={{
                      backgroundColor: (theme) =>
                        alpha(theme.palette.primary.main, 0.1),
                      color: "primary.main",
                      mr: 1,
                    }}
                  >
                    <Timelapse fontSize="small" />
                  </Avatar>
                  <Typography variant="h5">{attendance.data.total}</Typography>
                </Box>
                <Typography color="textSecondary" variant="body2">
                  Total student(s)
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

AttendanceDetails.getLayout = (page) => (
  <AuthGuard>
    <RoleGuard permissions={["admin", "academic"]}>
      <AppLayout>{page}</AppLayout>
    </RoleGuard>
  </AuthGuard>
);

export default AttendanceDetails;
