import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Link,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import Head from "next/head";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { PencilAlt as PencilAltIcon } from "@/components/icons";
import { getInitials } from "@/lib/get-initials";
import { useCallback, useEffect, useState } from "react";
import { useMounted } from "@/hooks/use-mounted";
import { AuthGuard } from "@/components/authentication/auth-guard";
import { RoleGuard } from "@/components/authentication/role-guard";
import { AppLayout } from "@/components/app/app-layout";
import { UserBasicDetails } from "@/components/app/users/user-basic-details";
import { deleteUserApi, getUserApi } from "@/lib/user-api";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { userDetailsTabs } from "@/lib/user-options-and-tabs";
import { UserDataManagement } from "@/components/app/users/user-data-management";
import { ErrorPageManagement } from "@/components/app/error-page";
import { UserLogs } from "@/components/app/users/user-logs";

const UserDetails = () => {
  const isMounted = useMounted();
  const [user, setUser] = useState(null);
  const [currentTab, setCurrentTab] = useState("details");
  const [isFetched, setIsFetched] = useState({
    fetched: false,
    error: false,
    message: "",
  });
  const router = useRouter();
  const { query } = router;

  const getUser = useCallback(async () => {
    try {
      const data = await getUserApi(query);
      if (isMounted()) setUser(data);
    } catch (error) {
      console.error(error.message);
      setIsFetched({ ...isFetched, error: true, message: error.message });
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) setIsFetched({ fetched: true, error: false });
  }, [user]);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    // TODO : reset password
    console.log("TODO Reset password");
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    try {
      const userId = query.userId;
      const response = await deleteUserApi(userId);
      if (response.ok) {
        const resJson = await response.json();
        if (resJson.success) {
          toast.success("User successfully deleted");
          router.push("/app/users");
        } else {
          throw new Error(resJson.message);
        }
      } else {
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Something went wrong");
    }
  };

  if (!isFetched.fetched && isFetched.error) {
    return (
      <>
        <ErrorPageManagement
          message={isFetched.message}
          description="
              Either this user does not exist, or you do not have the necessary
              authorizations."
          backButtonText="User list"
          backButtonRoute="/app/users"
        />
      </>
    );
  }
  if (!user) return null;

  return (
    <>
      <Head>
        <title>App: User Details | Scoosign</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <div>
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
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid
                item
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
                  {getInitials(user?.firstName + " " + user?.lastName)}
                </Avatar>
                <div>
                  <Typography variant="h4">{user?.email}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle2">user_id:</Typography>
                    <Chip label={user?.id} size="small" sx={{ ml: 1 }} />
                    <Chip
                      label={user.active ? "ACTIVE" : "ARCHIVE"}
                      color={user.active ? "success" : "warning"}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Box>
                </div>
              </Grid>
              <Grid item sx={{ m: -1 }}>
                <NextLink href={`/app/users/${user?.id}/edit`} passHref>
                  <Button
                    component="a"
                    endIcon={<PencilAltIcon fontSize="small" />}
                    sx={{ m: 1 }}
                    variant="outlined"
                  >
                    Edit
                  </Button>
                </NextLink>
              </Grid>
            </Grid>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              sx={{ mt: 3 }}
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {userDetailsTabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
          </div>
          <Divider />
          <Box sx={{ mt: 3 }}>
            {currentTab === "details" && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <UserBasicDetails
                    firstName={user?.firstName}
                    lastName={user?.lastName}
                    email={user?.email}
                    createdAt={user?.created_at}
                    createdBy={user?.created_by}
                    handleResetPassword={handleResetPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <UserDataManagement handleDeleteUser={handleDeleteUser} />
                </Grid>
              </Grid>
            )}
            {currentTab === "logs" && <UserLogs />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

UserDetails.getLayout = (page) => (
  <AuthGuard>
    <RoleGuard permissions={["admin"]}>
      <AppLayout>{page}</AppLayout>
    </RoleGuard>
  </AuthGuard>
);

export default UserDetails;
