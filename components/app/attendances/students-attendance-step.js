import { ArrowRight } from "@/components/icons";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Checkbox,
  Container,
  Divider,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { alpha } from "@mui/material/styles";
import {
  AssignmentTurnedIn,
  ErrorOutline,
  FactCheck,
  Groups,
  HowToReg,
  NotInterested,
  Send,
  Timelapse,
  Warning,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import { Scrollbar } from "@/components/custom";
import Link from "next/link";
import { SeverityBadge } from "@/components/severity-badge";
import { getInitials } from "@/lib/get-initials";
import { formatDistanceToNow } from "date-fns";

export const StudentsAttendanceStep = (props) => {
  const {
    onBack,
    onNext,
    attendance,
    isSigned,
    handleSendEmailToAbsents,
    handleMarkStudentAsAbsentJustify,
    handleSendEmailToStudent,
    handleMarkStudentAsAbsent,
    handleMarkStudentAsPresent,
    ...other
  } = props;
  return (
    <Container {...other}>
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
              <Typography variant="h5">666666</Typography>
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
              <Typography variant="h5">5555555</Typography>
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
              <Typography variant="h5"> 10000</Typography>
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
              <Typography variant="h5">25000</Typography>
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
              disabled={attendance && attendance?.data?.isLocked}
              onClick={handleSendEmailToAbsents}
              variant="contained"
              startIcon={<Send fontSize="small" />}
            >
              Send email
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
              {attendance &&
                attendance?.data?.students &&
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
                                mt: 0.5,
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
                          student.present ? "Mark as absent" : "Mark as Present"
                        }
                      >
                        <IconButton
                          disabled={
                            attendance?.data?.isLocked || student.justify
                          }
                          onClick={(e) => {
                            if (student.present) {
                              handleMarkStudentAsAbsent(e, student.studentId);
                            } else {
                              handleMarkStudentAsPresent(e, student.studentId);
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
      <Button
        endIcon={<ArrowRight fontSize="small" />}
        onClick={onNext}
        sx={{ mt: 2 }}
        variant="contained"
      >
        Continue
      </Button>
      <Button disabled={isSigned} onClick={onBack} sx={{ ml: 2, mt: 2 }}>
        Back
      </Button>
    </Container>
  );
};
StudentsAttendanceStep.propTypes = {
  onBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  attendance: PropTypes.object.isRequired,
  handleSendEmailToAbsents: PropTypes.func.isRequired,
  handleMarkStudentAsAbsentJustify: PropTypes.func.isRequired,
  handleSendEmailToStudent: PropTypes.func.isRequired,
  handleMarkStudentAsAbsent: PropTypes.func.isRequired,
  handleMarkStudentAsPresent: PropTypes.func.isRequired,
  isSigned: PropTypes.bool.isRequired
};
