import { Avatar, Box, Chip, Link, Typography } from "@mui/material";
import { Container } from "@mui/system";
import NextLink from "next/link";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { AppLayout } from "@/components/app/app-layout";
import { AuthGuard } from "@/components/authentication/auth-guard";
import { RoleGuard } from "@/components/authentication/role-guard";
import { useMounted } from "@/hooks/use-mounted";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { getInitials } from "@/lib/get-initials";
import { useRouter } from "next/router";
import { getUserApi } from "@/lib/user-api";
import { UserEditForm } from "@/components/app/users/user-edit-form";

const UserEdit = () => {
  const isMounted = useMounted();
  const [user, setUser] = useState(null);
  const { query } = useRouter();
  const getUser = useCallback(async () => {
    try {
      const data = await getUserApi(query);
      if (isMounted()) setUser(data);
    } catch (error) {
      // TODO : on error do something
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) return null;

  return (
    <>
      <Head>
        <title>App: User Edit | ScooSign</title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: "background.default",
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 4 }}>
            <NextLink href="/app/users" passHref>
              <Link
                color="textPrimary"
                component="a"
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">Users</Typography>
              </Link>
            </NextLink>
          </Box>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              overflow: "hidden",
            }}
          >
            <Avatar
              sx={{
                height: 64,
                mr: 2,
                width: 64,
              }}
            >
              {getInitials(user.firstName + " " + user.lastName)}
            </Avatar>
            <div>
              <Typography noWrap variant="h4">
                {user.email}
              </Typography>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <Typography variant="subtitle2">user_id:</Typography>
                <Chip label={user.id} size="small" sx={{ ml: 1 }} />
                <Chip
                  label={user.active ? "ACTIVE" : "ARCHIVE"}
                  color={user.active ? "success" : "warning"}
                  size="small"
                  sx={{ ml: 1 }}
                />
              </Box>
            </div>
          </Box>
          <Box mt={3}>
            <UserEditForm user={user} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

UserEdit.getLayout = (page) => (
  <AuthGuard>
    <RoleGuard permissions={["admin"]}>
      <AppLayout>{page}</AppLayout>
    </RoleGuard>
  </AuthGuard>
);
export default UserEdit;
