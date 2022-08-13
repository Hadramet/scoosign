import { AuthGuard } from "@/components/authentication/auth-guard";
import { RoleGuard } from "@/components/authentication/role-guard";
import { ArrowLeft, ArrowRight, CheckCircleOutlined } from "@/components/icons";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  Divider,
  Grid,
  IconButton,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import Head from "next/head";
import { alpha } from "@mui/material/styles";
import { createRef, useEffect, useRef, useState } from "react";
import {
  AssignmentTurnedIn,
  CheckCircleOutline,
  DeleteOutline,
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
import SignaturePad from "react-signature-pad-wrapper";
import { Scrollbar } from "@/components/custom";
import Link from "next/link";
import { SeverityBadge } from "@/components/severity-badge";

const ScooSignaturePad = (props) => {
  const { padRef, ...others } = props;
  return <SignaturePad {...others} ref={padRef} redrawOnResize />;
};

const TeacherAttendanceStep = (props) => {
  const { onBack, onNext, padRef, padData, handleClear, ...other } = props;
  useEffect(() => {
    padRef.current.fromData(padData, { clear: true });
  }, [padRef, padData]);
  return (
    <Container maxWidth="sm" {...other}>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Card variant="outlined" sx={{ mb: 2, px: 1, py: 1 }}>
            <Typography
              variant="overline"
              color="text.secondary"
              component="div"
            >
              Sign here
            </Typography>
            <ScooSignaturePad padRef={padRef} />
          </Card>
          <Typography variant="body2" color="text.secondary" component="div">
            I hereby certify that I, as my FIRST NAME, am present at the
            training course NAME OF THE COURSE, from the DATE OF START to the
            DATE OF END.
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            sx={{ mr: "auto" }}
            endIcon={<ArrowRight fontSize="small" />}
            onClick={onNext}
            variant="contained"
          >
            Continue
          </Button>
          <Button
            endIcon={<DeleteOutline fontSize="small" />}
            onClick={handleClear}
            variant="outlined"
          >
            Clear
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

TeacherAttendanceStep.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  padRef: PropTypes.object,
  padData: PropTypes.object,
  handleClear: PropTypes.func,
};

const StudentsAttendanceStep = (props) => {
  const {
    onBack,
    onNext,
    attendance,
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
      <Button onClick={onBack} sx={{ ml: 2, mt: 2 }}>
        Back
      </Button>
    </Container>
  );
};

StudentsAttendanceStep.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  attendance: PropTypes.object,
  handleSendEmailToAbsents: PropTypes.func,
  handleMarkStudentAsAbsentJustify: PropTypes.func,
  handleSendEmailToStudent: PropTypes.func,
  handleMarkStudentAsAbsent: PropTypes.func,
  handleMarkStudentAsPresent: PropTypes.func,
};

const FinishAttendanceStep = (props) => {
  const { onBack, onNext, ...other } = props;

  return (
    <div {...other}>
      <Typography variant="h6">Comment and validate</Typography>
      <Box sx={{ mt: 3 }}></Box>
      <Button
        endIcon={<ArrowRight fontSize="small" />}
        onClick={onNext}
        variant="contained"
      >
        Continue
      </Button>
      <Button onClick={onBack} sx={{ ml: 2 }}>
        Back
      </Button>
    </div>
  );
};

FinishAttendanceStep.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
};
const StepIcon = (props) => {
  const { active, completed, icon } = props;

  const highlight = active || completed;

  return (
    <Avatar
      sx={{
        height: 40,
        width: 40,
        ...(highlight && {
          backgroundColor: "secondary.main",
          color: "secondary.contrastText",
        }),
      }}
      variant="rounded"
    >
      {completed ? <CheckCircleOutlined fontSize="small" /> : icon}
    </Avatar>
  );
};
const TeacherAttendanceSession = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const [padData, setPadData] = useState([]);
  const [attendance, setAttendance] = useState(null); // TODO use api

  const padRef = useRef(null);

  const handleClear = () => {
    padRef.current.clear();
  };

  const handleNext = () => {
    if (activeStep == 0) {
      // console.log(padRef.current.toData())
      setPadData(padRef.current.toData());
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // if(activeStep == 0) padRef.current.fromData(padData);
  };

  const handleComplete = () => {
    setComplete(true);
  };

  const handleCourseLocked = async (e) => {
    e.preventDefault();
    // await fetch(`/api/v1/courses/${query.attendanceId}/lock`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-type": "application/json",
    //     "X-Scoosign-Authorization": `Bearer ${accessToken}`,
    //   },
    // });
    // mutate();
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
    // await fetch(
    //   `/api/v1/courses/${query.attendanceId}/studentAbsent/${studentId}`,
    //   {
    //     method: "PATCH",
    //     headers: {
    //       "Content-type": "application/json",
    //       "X-Scoosign-Authorization": `Bearer ${accessToken}`,
    //     },
    //   }
    // );
    // mutate();
  };

  const handleMarkStudentAsAbsentJustify = async (e, studentId) => {
    e.preventDefault();
    // await fetch(
    //   `/api/v1/courses/${query.attendanceId}/studentJustify/${studentId}`,
    //   {
    //     method: "PATCH",
    //     headers: {
    //       "Content-type": "application/json",
    //       "X-Scoosign-Authorization": `Bearer ${accessToken}`,
    //     },
    //   }
    // );
    // mutate();
  };

  const handleMarkStudentAsPresent = async (e, studentId) => {
    e.preventDefault();
    // await fetch(
    //   `/api/v1/courses/${query.attendanceId}/studentPresent/${studentId}`,
    //   {
    //     method: "PATCH",
    //     headers: {
    //       "Content-type": "application/json",
    //       "X-Scoosign-Authorization": `Bearer ${accessToken}`,
    //     },
    //   }
    // );
    // mutate();
  };

  const steps = [
    {
      label: "Teacher attendance",
      category: "ta",
      content: (
        <TeacherAttendanceStep
          onBack={handleBack}
          onNext={handleNext}
          padRef={padRef}
          padData={padData}
          handleClear={handleClear}
        />
      ),
    },
    {
      label: "Student attendance",
      category: "sa",
      content: (
        <StudentsAttendanceStep
          onBack={handleBack}
          onNext={handleNext}
          attendance={attendance}
          handleSendEmailToAbsents={handleSendEmailToAbsents}
          handleMarkStudentAsAbsentJustify={handleMarkStudentAsAbsentJustify}
          handleSendEmailToStudent={handleSendEmailToStudent}
          handleMarkStudentAsAbsent={handleMarkStudentAsAbsent}
          handleMarkStudentAsPresent={handleMarkStudentAsPresent}
        />
      ),
    },
    {
      label: "Finish",
      category: "fa",
      content: (
        <FinishAttendanceStep onBack={handleBack} onNext={handleComplete} />
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Attendance: attendance sign | Scoosign</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container>
          <NextLink href="/app" passHref>
            <Button component="a" startIcon={<ArrowLeft fontSize="small" />}>
              Dashboard
            </Button>
          </NextLink>
          <Box>
            <Typography sx={{ mb: 3 }} variant="h4">
              Attendance Name
            </Typography>
            {!complete ? (
              <Stepper
                activeStep={activeStep}
                orientation="vertical"
                sx={{
                  "& .MuiStepConnector-line": {
                    ml: 1,
                    borderLeftColor: "divider",
                    borderLeftWidth: 2,
                  },
                }}
              >
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel StepIconComponent={StepIcon}>
                      <Typography sx={{ ml: 2 }} variant="overline">
                        {step.label}
                      </Typography>
                    </StepLabel>
                    <StepContent
                      sx={{
                        ml: "20px",
                        borderLeftColor: "divider",
                        borderLeftWidth: 2,
                        ...(activeStep === index && {
                          py: 4,
                        }),
                      }}
                    >
                      {step.content}
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            ) : (
              <div>
                <Avatar
                  sx={{
                    backgroundColor: "success.main",
                    color: "success.contrastText",
                    height: 40,
                    width: 40,
                  }}
                >
                  <CheckCircleOutline />
                </Avatar>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  All done!
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  Thank you for your availability and good session 😉🚀
                </Typography>
                <Card
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    mt: 2,
                    px: 2,
                    py: 1.5,
                  }}
                  variant="outlined"
                >
                  <div>
                    <Typography variant="subtitle1">
                      TODO : Attendance name here
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        pl: 1,
                        pb: 1,
                      }}
                    >
                      <AvatarGroup max={4}>
                        {new Array(35).fill(0).map((_, index) => (
                          <Avatar
                            key={index}
                            src={`https://i.pravatar.cc/300?img=${Math.floor(
                              Math.random() * 30
                            )}`}
                          />
                        ))}
                      </AvatarGroup>
                    </Box>
                  </div>
                  <div>
                    <Typography
                      color="textSecondary"
                      sx={{ mr: 2 }}
                      variant="caption"
                    >
                      1 minute ago
                    </Typography>
                    <Button href="/app" passHref>
                      Dashboard
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

TeacherAttendanceSession.getLayout = (page) => (
  <AuthGuard>
    <RoleGuard permissions={["teacher"]}>{page}</RoleGuard>
  </AuthGuard>
);

export default TeacherAttendanceSession;
