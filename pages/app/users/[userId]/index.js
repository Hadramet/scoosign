import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
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
import { PencilAlt as PencilAltIcon } from "../../../../components/icons";
import { ChevronDown as ChevronDownIcon } from "../../../../components/icons";
import { getInitials } from "../../../../lib/getInitials";
import { subDays, subHours, subMinutes, subSeconds } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { useMounted } from "../../../../hooks/use-mounted";
import { AuthGuard } from "../../../../components/authentication/auth-guard";
import { RoleGuard } from "../../../../components/authentication/role-guard";
import { AppLayout } from "../../../../components/app/app-layout";
import { UserBasicDetails } from "../../../../components/app/users/user-basic-details";

const now = new Date();

const tabs = [
  { label: "Details", value: "details" },
  { label: "Logs", value: "logs" },
];

const userFixture = {
  id: "df56d4f5dsq",
  name: "John Doe",
  active: true,
  email: "john.doe@scoosign.com",
  type: "student",
  createdAt: "10-10-2021",
  createdBy: "Jon fo",
};

const UserDataManagement = (props) => (
  <Card {...props}>
    <CardHeader title="Data Management" />
    <Divider />
    <CardContent>
      <Button color="error" variant="outlined">
        Delete Account
      </Button>
      <Box sx={{ mt: 1 }}>
        <Typography color="textSecondary" variant="body2">
          Delete this user file if he has requested it under the GDPR
          regulation law, otherwise be aware that what has been deleted can
          never be brought back.
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const UserLogs = (props) =>(
    <Card {...props}>
    <CardHeader title="Recent Logs" />
    <Divider />
    <CardContent>
      <Box sx={{ mt: 1 }}>
        <Typography color="textSecondary" variant="body2">
          TODO : show at least the last 10 user log
        </Typography>
      </Box>
    </CardContent>
  </Card>
)

const UserDetails = () => {
  const isMounted = useMounted();
  const [user, setUser] = useState(null);
  const [currentTab, setCurrentTab] = useState("details");
  const getUser = useCallback(() => {
    const data = userFixture;
    if (isMounted()) setUser(data);
  }, [isMounted]);

  useEffect(() => {
    getUser();
  }, []);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

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
                  {getInitials(user?.name)}
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
                  </Box>
                </div>
              </Grid>
              <Grid item sx={{ m: -1 }}>
                <NextLink href="/app/user/1/edit" passHref>
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
              {tabs.map((tab) => (
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
                    email={user?.email}
                    createdAt={user?.createdAt}
                    createdBy={user?.createdBy}
                  />
                </Grid>
                <Grid item xs={12}>
                  <UserDataManagement />
                </Grid>
              </Grid>
            )}
            {currentTab === 'logs' && <UserLogs/>}
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
