import {
  Box,
  Container,
} from "@mui/material";
import Head from "next/head";
import { AppLayout } from "@/components/app/app-layout";
import { AuthGuard } from "@/components/authentication/auth-guard";
import { RoleGuard } from "@/components/authentication/role-guard";
import { TeacherDashboard } from "@/components/app/dashboards/teacher-dashboard";
import { StudentDashboard } from "@/components/app/dashboards/student-dashboard";

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
            <RoleGuard permissions={["student"]}>
              <StudentDashboard />
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
