import { AuthGuard } from "@/components/authentication/auth-guard";
import { RoleGuard } from "@/components/authentication/role-guard";
import { ArrowLeft } from "@/components/icons";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  Container,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircleOutline } from "@mui/icons-material";
import { formatDistanceToNow } from "date-fns";
import { TeacherAttendanceStep } from "@/components/app/attendances/teacher-attendance-step";
import { StudentsAttendanceStep } from "@/components/app/attendances/students-attendance-step";
import { FinishAttendanceStep } from "@/components/app/attendances/finish-attendance-step";
import { StepIcon } from "@/components/app/attendances/step-icon";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getInitials } from "@/lib/get-initials";

const TeacherAttendanceSession = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const [padData, setPadData] = useState([]);
  // const [attendance, setAttendance] = useState(null); // TODO use api
  const [comment, setComment] = useState("");
  const [completedTime, setCompletedTime] = useState();
  const [isSigned, setIsSigned] = useState(false);
  const padRef = useRef(null);
  const router = useRouter();
  const { query } = router;
  const accessToken = globalThis.localStorage.getItem("accessToken");

  const {
    data: attendance,
    error,
    mutate,
  } = useSWR([
    `/api/v1/teachers/attendance/${query.attendanceId}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "X-Scoosign-Authorization": `Bearer ${accessToken}`,
      },
    },
  ]);

  useEffect(() => {
    if (attendance && attendance.data.isLocked) handleComplete(true);
  }, [attendance, handleComplete]);

  const handleClear = () => {
    padRef.current.clear();
  };

  const handleNext = () => {
    if (activeStep == 0) {
      if (!isSigned) setPadData(padRef.current.toData());
      setIsSigned(true);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleComplete = useCallback(
    (isLocked = false) => {
      setComplete(true);
      setCompletedTime(
        !isLocked ? new Date() : new Date(attendance?.data?.updatedAt)
      );
      if (!isLocked) handleCourseLocked();
    },
    [attendance, handleCourseLocked]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleCourseLocked = async () => {
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
    console.log("TODO send email to absent");
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

  const steps = [
    {
      label: "Teacher attendance",
      content: (
        <TeacherAttendanceStep
          onBack={handleBack}
          onNext={handleNext}
          padRef={padRef}
          padData={padData}
          isSigned={isSigned}
          name={attendance?.data?.name}
          start={attendance?.data?.start}
          end={attendance?.data?.end}
          handleClear={handleClear}
        />
      ),
    },
    {
      label: "Student attendance",
      content: (
        <StudentsAttendanceStep
          onBack={handleBack}
          onNext={handleNext}
          isSigned={isSigned}
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
      content: (
        <FinishAttendanceStep
          onBack={handleBack}
          onNext={handleComplete}
          setComment={setComment}
        />
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
          {error && "Something went wrong"}
          {attendance ? (
            <Box>
              <Typography sx={{ mb: 3 }} variant="h4">
                {attendance.data.name}
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
                        {attendance?.data?.name}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        sx={{ mr: 2 }}
                        variant="caption"
                      >
                        {formatDistanceToNow(completedTime, {
                          addSuffix: true,
                          includeSeconds: true,
                        })}
                      </Typography>
                      <Typography
                        sx={{
                          mt: 4,
                        }}
                        variant="body2"
                      >
                        {comment}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          pl: 1,
                          pb: 1,
                          mt: 4,
                        }}
                      >
                        <AvatarGroup max={4}>
                          {attendance.data.students.map((stu, index) => (
                            <Avatar key={index}>
                              {getInitials(stu.firstName + " " + stu.lastName)}
                            </Avatar>
                          ))}
                        </AvatarGroup>
                      </Box>
                    </div>
                  </Card>
                </div>
              )}
            </Box>
          ) : (
            "Loading ..."
          )}
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
