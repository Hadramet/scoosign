import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { AppLayout } from "@/components/app/app-layout";
import { Reports as ReportsIcon } from "@/components/icons";
import { AuthGuard } from "@/components/authentication/auth-guard";
import { RoleGuard } from "@/components/authentication/role-guard";
import { useTheme } from "@emotion/react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import { format, subHours } from "date-fns";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import {
  AccessTime,
  CandlestickChartOutlined,
  CheckRounded,
  OpenInFull,
  School,
} from "@mui/icons-material";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const items = [
  {
    color: "#4CAF50",
    label: "Presence",
    subtitle: "Course attended",
    value: 85,
  },
  {
    color: "#FF9800",
    label: "Justify",
    subtitle: "Justify absence(s)",
    value: 10,
  },
  {
    color: "#F44336",
    label: "Absence ",
    subtitle: "Time(s)",
    value: 5,
  },
];
const dailyCourses = [
  {
    _id: "dqfoidsqfod",
    name: "4MERN ",
    date: subHours(Date.now(), 18).getTime(),
    students: [],
    isSigned: true,
  },
  {
    name: "2JAVA",
    date: subHours(Date.now(), 21).getTime(),
  },
];
const DailyCourses = (props) => {
  const { dailyCourses, ...other } = props;

  return (
    <Box sx={{ mb: 4, mt: 4, p: 4 }} {...other}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {" "}
        Next Courses{" "}
      </Typography>
      <Timeline position="alternate">
        {dailyCourses.map((activity, index) => (
          <TimelineItem key={activity.date}>
            <TimelineOppositeContent color="text.secondary">
              <Typography
                sx={{ m: "auto 0" }}
                variant="body2"
                color="text.secondary"
              >
                {format(activity.date, "p")}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot
                color={activity.isSigned ? "success" : "neutral"}
                variant="filled"
              >
                {activity.isSigned ? (
                  <CheckRounded fontsize="small" />
                ) : (
                  <AccessTime fontsize="small" />
                )}
              </TimelineDot>
              {dailyCourses.length - 1 > index && (
                <TimelineConnector
                  sx={{
                    backgroundColor: "divider",
                    minHeight: 30,
                  }}
                />
              )}
            </TimelineSeparator>
            <TimelineContent sx={{ py: "12px", px: 2 }}>
              <Card
                sx={{ display: "flex", mb: 6, justifyContent: "space-between" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h6">
                      {activity.name}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      component="div"
                    >
                      Room 24
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="div"
                    >
                      Some description that can be very long at least 255
                      caracteres so, if this is too long , look at it and test
                      it.
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
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
                </Box>
                <CardActions>
                  <IconButton href="/app/teachers/attendances/8888888">
                    <KeyboardArrowRightIcon fontSize="large" />
                  </IconButton>
                </CardActions>
              </Card>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};

DailyCourses.propTypes = {
  dailyCourses: PropTypes.object.isRequired,
};
const TeacherDashboard = (props) => {
  const theme = useTheme();
  const chartOptions = {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    fill: {
      opacity: 1,
    },
    labels: ["Total"],
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            show: true,
            color: theme.palette.text.secondary,
            fontSize: "12px",
            fontWeight: 400,
            offsetY: 20,
          },
          value: {
            color: theme.palette.text.primary,
            fontSize: "18px",
            fontWeight: 600,
            offsetY: -20,
          },
        },
        hollow: {
          size: "60%",
        },
        track: {
          background: theme.palette.background.default,
        },
      },
    },
    states: {
      active: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      hover: {
        filter: {
          type: "none",
          value: 0,
        },
      },
    },
    theme: {
      mode: theme.palette.mode,
    },
  };

  return (
    <Box sx={{ mb: 4 }} {...props}>
      <Grid container spacing={3} sx={{ p: 3 }}>
        <Grid item container justifyContent="space-between" spacing={3}>
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
            <RoleGuard permissions={["admin", "academic"]}>
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
            </RoleGuard>
          </Grid>
        </Grid>
        {items.map((item) => (
          <Grid item key={item.label} md={4} xs={12}>
            <Card
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                p: 2,
              }}
              variant="elevation"
            >
              <Typography sx={{ color: item.color }} variant="h6">
                {item.label}
              </Typography>
              <Chart
                height={200}
                options={{
                  ...chartOptions,
                  colors: [item.color],
                }}
                series={[item.value]}
                type="radialBar"
              />
              <Typography variant="h6">{item.value}</Typography>
              <Typography color="textSecondary" variant="body2">
                {item.subtitle}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
      <DailyCourses dailyCourses={dailyCourses} />
    </Box>
  );
};
const Overview = () => {
  return (
    <>
      <Head>
        <title>App - Dashboard | ScooSign</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="x1">
          <Box sx={{ mb: 4 }}>
            <RoleGuard permissions={["teacher"]}>
              <TeacherDashboard />
            </RoleGuard>
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
