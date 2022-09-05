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
import useSWR from "swr";
import { Chart } from "./Chart";

export const StudentDashboard = (props) => {
  const theme = useTheme();
  const { user } = useAuth();
  const accessToken = globalThis.localStorage.getItem("accessToken");
  const { data: stats, error: statsError } = useSWR([
    `/api/v1/students/stats/basic`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "X-Scoosign-Authorization": `Bearer ${accessToken}`,
      },
    },
  ]);

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
            <Typography variant="h4">{`Hello ${user?.name}`}</Typography>
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
        {statsError && "Something went wrong"}
        {stats
          ? stats.data?.items?.map((item) => (
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
            ))
          : "Loading"}
      </Grid>
    </Box>
  );
};
