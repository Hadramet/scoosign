import {
  Box,
  Button,
  Card,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Reports as ReportsIcon } from "@/components/icons";
import { RoleGuard } from "@/components/authentication/role-guard";
import { useTheme } from "@emotion/react";
import dynamic from "next/dynamic";
import { subHours } from "date-fns";
import { DailyCourses } from "@/components/app/teachers/daily-courses";
import { useAuth } from "@/hooks/use-auth";

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
    room: "D44",
    description: "description",
    date: subHours(Date.now(), 22).getTime(),
    students: [],
    isSigned: true,
  },
  {
    _id: "dqfoidssqfod",
    name: "2JAVA",
    room: "R24",
    description: "description",
    date: subHours(Date.now(), 21).getTime(),
    students: [],
    isSigned: false,
  },
  {
    _id: "dqfoidssqfozd",
    name: "R24",
    description: "descriptgion",
    date: subHours(Date.now(), 18).getTime(),
    students: [],
    isSigned: false,
  },
];

export const TeacherDashboard = (props) => {
  const theme = useTheme();
  const { user } = useAuth();
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
            fontSize: "8px",
            fontWeight: 400,
            offsetY: 10,
          },
          value: {
            color: theme.palette.text.primary,
            fontSize: "12px",
            fontWeight: 600,
            offsetY: -20,
          },
        },
        hollow: {
          size: "50%",
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
            <Typography variant="h4">{`Hello ${user.name}`}</Typography>
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
              <Typography color="textSecondary" variant="caption">
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
