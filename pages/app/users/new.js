import { Box, Breadcrumbs, Container, Link, Typography } from "@mui/material";
import Head from "next/head";
import NextLink from "next/link";
import { AppLayout } from "@/components/app/app-layout";
import { UserCreateForm } from "@/components/app/users/user-create-form";
import { AuthGuard } from "@/components/authentication/auth-guard";
import { RoleGuard } from "@/components/authentication/role-guard";

const UserCreate = () => {
  return (
    <>
      <Head>
        <title>App : User create | ScooSign</title>
      </Head>

      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="md">
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4"> Create a new user </Typography>
            <Breadcrumbs separator="/" sx={{ mt: 1 }}>
              <NextLink href="/app" passHref>
                <Link variant="subtitle2">Dashboard</Link>
              </NextLink>
              <NextLink href="/app" passHref>
                <Link color="primary" variant="subtitle2">
                  Management
                </Link>
              </NextLink>
              <Typography color="textSecondary" variant="subtitle2">
                Users
              </Typography>
            </Breadcrumbs>
          </Box>
          <UserCreateForm />
        </Container>
      </Box>
    </>
  );
};

UserCreate.getLayout = (page) => (
  <AuthGuard>
    <RoleGuard permissions={["admin", "academic"]}>
      <AppLayout>{page}</AppLayout>
    </RoleGuard>
  </AuthGuard>
);

export default UserCreate;
