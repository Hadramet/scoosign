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
  Container,
  Grid,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import Head from "next/head";
import { createRef, useEffect, useRef, useState } from "react";
import { CheckCircleOutline, DeleteOutline } from "@mui/icons-material";
import PropTypes from "prop-types";
import SignaturePad from "react-signature-pad-wrapper";

const ScooSignaturePad = (props) => {
  const { padRef, ...others } = props;
  return <SignaturePad {...others} ref={padRef} redrawOnResize />;
};

const TeacherAttendanceStep = (props) => {
  const { onBack, onNext, ...other } = props;
  const padRef = useRef(null);

  const handleClear = () => {
    padRef.current.clear();
  };

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
            sx={{mr:'auto'}}
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
};

const StudentsAttendanceStep = (props) => {
  const { onBack, onNext, ...other } = props;
  return (
    <div {...other}>
      <Typography variant="h6">Student attendance list here</Typography>
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

StudentsAttendanceStep.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleComplete = () => {
    setComplete(true);
  };

  const steps = [
    {
      label: "Teacher attendance",
      content: (
        <TeacherAttendanceStep onBack={handleBack} onNext={handleNext} />
      ),
    },
    {
      label: "Student attendance",
      content: (
        <StudentsAttendanceStep onBack={handleBack} onNext={handleNext} />
      ),
    },
    {
      label: "Finish",
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
        <Container maxWidth="md">
          <NextLink href="/app" passHref>
            <Button component="a" startIcon={<ArrowLeft fontSize="small" />}>
              Dashboard
            </Button>
          </NextLink>
          <Box maxWidth="sm">
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
