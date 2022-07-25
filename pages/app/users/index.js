import {
  Box,
  Button,
  Container,
  Typography,
  Divider,
  Grid,
  Card,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
} from "@mui/material";
import Head from "next/head";
import { useRef, useState } from "react";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { AppLayout } from "../../../components/app/app-layout";
import {
  Plus as PlusIcon,
  Upload as UploadIcon,
  Search as SearchIcon,
  Download as DownloadIcon,
} from "../../../components/icons";
import { RoleGuard } from "../../../components/authentication/role-guard";
import { useRouter } from "next/router";

const tabs = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Students",
    value: "areStudent",
  },
  {
    label: "Academic",
    value: "areAcademic",
  },
  {
    label: "Teacher",
    value: "areTeacher",
  },
  {
    label: "Parent",
    value: "areParent",
  },
];

// const sortOptions = [
//     {
//         label: 'Last update (newest)',
//         value: 'updatedAt|desc'
//     },
//     {
//         label: 'Last update (oldest)',
//         value: 'updatedAt|asc'
//     },
// ];

const UserList = () => {
  const router = useRouter();
  const queryRef = useRef(null);
  const [currentTab, setCurrentTab] = useState("all");

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const handleQueryChange = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Head>
        <title>App: Users List | ScooSign</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">Users</Typography>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => {
                    router.push("/app/users/new");
                  }}
                  startIcon={<PlusIcon fontSize="small" />}
                  variant="contained"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
            <Box sx={{ m: -1, mt: 3 }}>
              <Button startIcon={<UploadIcon fontSize="small" />} sx={{ m: 1 }}>
                {" "}
                Import
              </Button>
              <Button
                startIcon={<DownloadIcon fontSize="small" />}
                sx={{ m: 1 }}
              >
                {" "}
                Export
              </Button>
            </Box>
          </Box>

          <Card>
            <Tabs
              indicatorColor="primary"
              scrollButtons="auto"
              onChange={handleTabsChange}
              sx={{ px: 3 }}
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value}></Tab>
              ))}
            </Tabs>
            <Divider />
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexWrap: "wrap",
                m: -1.5,
                p: 3,
              }}
            >
              <Box
                component="form"
                onSubmit={handleQueryChange}
                sx={{ flexGrow: 1, m: 1.5 }}
              >
                <TextField
                  defaultValue=""
                  fullWidth
                  inputProps={{ ref: queryRef }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Seach users"
                />
              </Box>
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};

UserList.getLayout = (page) => (
  <AuthGuard>
    <RoleGuard permissions={["admin", "academic"]}>
      <AppLayout>{page}</AppLayout>
    </RoleGuard>
  </AuthGuard>
);

export default UserList;
