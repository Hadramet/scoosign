import { Box } from "@mui/system";
import { default as Head } from "next/head";
import NextLink from "next/link";
import { AuthGuard } from "@/components/authentication/auth-guard";
import { RoleGuard } from "@/components/authentication/role-guard";
import { AppLayout } from "@/components/app/app-layout";
import { Breadcrumbs, Container, Link, Typography } from "@mui/material";
import { StudentCreateForm } from "@/components/app/students/student-create-form";

const NewTeacher = (props) => {
  return (
    <Box>
      <Head>
        <title>App - New Teacher | ScooSign</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="md">
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4"> Create a new teacher </Typography>
            <Breadcrumbs separator="/" sx={{ mt: 1 }}>
              <NextLink href="/app" passHref>
                <Link variant="subtitle2">Dashboard</Link>
              </NextLink>
              <NextLink href="/app/teachers" passHref>
                <Link color="primary" variant="subtitle2">
                  School
                </Link>
              </NextLink>
              <Typography color="textSecondary" variant="subtitle2">
                Teachers
              </Typography>
            </Breadcrumbs>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
NewTeacher.getLayout = (page) => (
  <AuthGuard>
    <RoleGuard permissions={["admin", "academic"]}>
      <AppLayout>{page}</AppLayout>
    </RoleGuard>
  </AuthGuard>
);

export default NewTeacher;
