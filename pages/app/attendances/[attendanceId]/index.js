import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  Grid,
  Icon,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { default as Head } from "next/head";
import NextLink from "next/link";
import {
  ArrowBack as ArrowBackIcon,
  AssignmentTurnedIn,
  ErrorOutline,
  FactCheck,
  FlashOffOutlined,
  Groups,
  HowToReg,
  NotInterested,
  Send,
  Timelapse,
  TimelapseSharp,
  TimelapseTwoTone,
  Verified,
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
import { Scrollbar } from "@/components/custom";
import { getInitials } from "@/lib/get-initials";
import { SeverityBadge } from "@/components/severity-badge";
import { formatDistanceToNow } from "date-fns";
import { Calendar } from "@/components/icons";

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

  const handleCourseLocked = async (e) => {
    e.preventDefault();
    await fetch(`/api/v1/courses/${query.attendanceId}/lock`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "X-Scoosign-Authorization": `Bearer ${accessToken}`,
      },
    });
    mutate();
  };

  const handleSendEmailToAbsents = (e) => {
    e.preventDefault();
    console.log("TODO send email to absent", query.attendanceId);
  };

  const handleSendEmailToStudent = (e, studentId) => {
    e.preventDefault();
    console.log("TODO send email to absent", studentId, query.attendanceId);
  };

  const handleMarkStudentAsAbsent = async (e, studentId) => {
    e.preventDefault();
    await fetch(
      `/api/v1/courses/${query.attendanceId}/studentAbsent/${studentId}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          "X-Scoosign-Authorization": `Bearer ${accessToken}`,
        },
      }
    );
    mutate();
  };

  const handleMarkStudentAsAbsentJustify = async (e, studentId) => {
    e.preventDefault();
    await fetch(
      `/api/v1/courses/${query.attendanceId}/studentJustify/${studentId}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          "X-Scoosign-Authorization": `Bearer ${accessToken}`,
        },
      }
    );
    mutate();
  };

  const handleMarkStudentAsPresent = async (e, studentId) => {
    e.preventDefault();
    await fetch(
      `/api/v1/courses/${query.attendanceId}/studentPresent/${studentId}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          "X-Scoosign-Authorization": `Bearer ${accessToken}`,
        },
      }
    );
    mutate();
  };

  const handlePreviewCertificate = (e) => {
    e.preventDefault();
    console.log("TODO preview certificate");
  };

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
                  <Typography variant="h4">{attendance?.data?.name}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      ml: -1,
                      mt: 1,
                    }}
                  >
                    <Calendar
                      color="action"
                      fontSize="small"
                      sx={{ ml: 1, mr: 0.5 }}
                    />
                    <Typography color="textSecondary" variant="body2">
                      {getFormattedStartEndDate(
                        attendance?.data?.start,
                        attendance?.data?.end
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
                {attendance?.data?.isLocked ? (
                  <Button
                    onClick={handlePreviewCertificate}
                    sx={{ m: 1 }}
                    variant="outlined"
                  >
                    Preview
                  </Button>
                ) : (
                  <Button
                    onClick={handleCourseLocked}
                    color="error"
                    sx={{ m: 1 }}
                    variant="contained"
                  >
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
                    {attendance?.data?.absentCount}
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
                  <Typography variant="h5">
                    {attendance?.data?.presentCount}
                  </Typography>
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
                  <Typography variant="h5">
                    {" "}
                    {attendance?.data?.justifyCount}
                  </Typography>
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
                    <Groups fontSize="small" />
                  </Avatar>
                  <Typography variant="h5">
                    {attendance?.data?.total}
                  </Typography>
                </Box>
                <Typography color="textSecondary" variant="body2">
                  Total student(s)
                </Typography>
              </Card>
            </Grid>
          </Grid>
          <Card sx={{ mt: 4 }}>
            <CardHeader
              title="Students"
              action={
                <Button
                  disabled={attendance?.data?.isLocked}
                  onClick={handleSendEmailToAbsents}
                  variant="contained"
                  startIcon={<Send fontSize="small" />}
                >
                  Send attendance email
                </Button>
              }
            />
            <Divider />
            <Scrollbar>
              <Table sx={{ minWidth: 700 }}>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox></Checkbox>
                    </TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">State</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendance?.data?.students &&
                    attendance.data.students.map((student) => (
                      <TableRow hover key={student._id}>
                        <TableCell padding="checkbox">
                          <Checkbox />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ alignItems: "center", display: "flex" }}>
                            <Avatar
                              sx={{
                                height: 40,
                                width: 40,
                              }}
                            >
                              {getInitials(
                                student.firstName + " " + student.lastName
                              )}
                            </Avatar>
                            <Box sx={{ ml: 1 }}>
                              <NextLink
                                href={`/app/students/${student.studentId}`}
                                passHref
                              >
                                <Link color="inherit" variant="subtitle2">
                                  {student.firstName + " " + student.lastName}
                                </Link>
                              </NextLink>
                              <Typography color="textSecondary" variant="body2">
                                {student.email}
                              </Typography>
                              {student.signedAt && (
                                <Box
                                  sx={{
                                    alignItems: "center",
                                    display: "flex",
                                    mt:0.5
                                  }}
                                >
                                  <Timelapse color="action" fontSize="small" />
                                  <Typography
                                    color="textSecondary"
                                    variant="caption"
                                    sx={{ ml: 1 }}
                                  >
                                    {formatDistanceToNow(
                                      new Date(student.signedAt),
                                      {
                                        addSuffix: true,
                                        includeSeconds: true,
                                      }
                                    )}
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <SeverityBadge
                            color={
                              student.present === true
                                ? "success"
                                : student.justify === true
                                ? "warning"
                                : "error"
                            }
                          >
                            {student.present === true
                              ? "PRESENT"
                              : student.justify === true
                              ? "JUSTIFY"
                              : "ABSENT"}
                          </SeverityBadge>
                        </TableCell>
                        <TableCell align="right">
                          {!student.present && (
                            <Tooltip title="Mark as justify">
                              <IconButton
                                onClick={(e) => {
                                  handleMarkStudentAsAbsentJustify(
                                    e,
                                    student.studentId
                                  );
                                }}
                                disabled={
                                  attendance?.data?.isLocked || student.justify
                                }
                                component="a"
                              >
                                <FactCheck fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}

                          {!student.present && (
                            <Tooltip title="Send attendance email">
                              <IconButton
                                disabled={
                                  attendance?.data?.isLocked || student.justify
                                }
                                onClick={(e) =>
                                  handleSendEmailToStudent(e, student.studentId)
                                }
                                component="a"
                              >
                                <Send fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}

                          <Tooltip
                            title={
                              student.present
                                ? "Mark as absent"
                                : "Mark as Present"
                            }
                          >
                            <IconButton
                              disabled={
                                attendance?.data?.isLocked || student.justify
                              }
                              onClick={(e) => {
                                if (student.present) {
                                  handleMarkStudentAsAbsent(
                                    e,
                                    student.studentId
                                  );
                                } else {
                                  handleMarkStudentAsPresent(
                                    e,
                                    student.studentId
                                  );
                                }
                              }}
                              color={student.present ? "error" : "success"}
                              component="a"
                            >
                              {student.present ? (
                                <NotInterested fontSize="small" />
                              ) : (
                                <HowToReg fontSize="small" />
                              )}
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Scrollbar>
          </Card>
          <Card sx={{ mt: 2 }}>
            <CardHeader title="Teacher" />
            <CardContent>
              <Card key={attendance?.data?.teacher._id} variant="outlined">
                <CardActions>
                  <SeverityBadge
                    color={
                      attendance?.data?.teacher.present === true
                        ? "success"
                        : "error"
                    }
                  >
                    {attendance?.data?.teacher.present === true
                      ? "PRESENT"
                      : "ABSENT"}
                  </SeverityBadge>
                </CardActions>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: {
                        xs: "flex-start",
                        sm: "center",
                      },
                      display: "flex",
                      flexDirection: {
                        xs: "column",
                        sm: "row",
                      },
                    }}
                  >
                    <Avatar sx={{ mr: 2 }}>
                      {getInitials(
                        attendance?.data?.teacher.firstName +
                          " " +
                          attendance?.data?.teacher.lastName
                      )}
                    </Avatar>
                    <div>
                      <Typography variant="subtitle1">
                        {attendance?.data?.teacher.firstName +
                          " " +
                          attendance?.data?.teacher.lastName}
                      </Typography>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                          flexWrap: "wrap",
                          ml: -2,
                          mt: -1,
                        }}
                      >
                        <Typography
                          noWrap
                          sx={{
                            ml: 2,
                            mt: 1,
                          }}
                          variant="subtitle2"
                        >
                          • {attendance?.data?.teacher.email}
                        </Typography>

                        {attendance?.data?.teacher.signedAt && (
                          <Typography
                            color="textSecondary"
                            noWrap
                            sx={{
                              ml: 2,
                              mt: 1,
                            }}
                            variant="body2"
                          >
                            •{" "}
                            {formatDistanceToNow(
                              new Date(attendance?.data?.teacher.signedAt),
                              {
                                addSuffix: true,
                              }
                            )}
                          </Typography>
                        )}
                      </Box>
                    </div>
                  </Box>
                  {attendance?.data?.teacher.comment && (
                    <Typography sx={{ mt: 2 }} variant="body1">
                      {attendance?.data?.teacher.comment}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </CardContent>
          </Card>
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
