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
import { useCallback, useEffect, useRef, useState } from "react";
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
import { UserListTable } from "../../../components/app/users/user-list-table";
import { useMounted } from "../../../hooks/use-mounted";

const tabs = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Students",
    value: "isStudent",
  },
  {
    label: "Academic",
    value: "isAcademic",
  },
  {
    label: "Teacher",
    value: "isTeacher",
  },
  {
    label: "Parent",
    value: "isParent",
  },
  {
    label: "Administrator",
    value: "isAdmin",
  },
];

const usersFixture = [
  {
    id: 1,
    name: "Admin Sy",
    email: "john.doe@scoosign.com",
    type: "admin",
    active: true,
  },
  {
    id: 2,
    name: "Aca Ma",
    email: "john.doe@scoosign.com",
    type: "academic",
    active: true,
  },
  {
    id: 3,
    name: "Student Mo",
    email: "john.doe@scoosign.com",
    type: "student",
    active: true,
  },
  {
    id: 4,
    name: "Parent Doe",
    email: "john.doe@scoosign.com",
    type: "parent",
    active: true,
  },
  {
    id: 5,
    name: "Teacher Cli",
    email: "john.doe@scoosign.com",
    type: "teacher",
    active: true,
  },
  {
    id: 6,
    name: "Student Ma",
    email: "john.doe@scoosign.com",
    type: "student",
    active: false,
  },
  {
    id: 1,
    name: "Admin Sy",
    email: "john.doe@scoosign.com",
    type: "admin",
    active: true,
  },
  {
    id: 2,
    name: "Aca Ma",
    email: "john.doe@scoosign.com",
    type: "academic",
    active: true,
  },
  {
    id: 3,
    name: "Student Mo",
    email: "john.doe@scoosign.com",
    type: "student",
    active: true,
  },
  {
    id: 4,
    name: "Parent Doe",
    email: "john.doe@scoosign.com",
    type: "parent",
    active: true,
  },
  {
    id: 5,
    name: "Teacher Cli",
    email: "john.doe@scoosign.com",
    type: "teacher",
    active: true,
  },
  {
    id: 6,
    name: "Student Ma",
    email: "john.doe@scoosign.com",
    type: "student",
    active: false,
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
const applyFilters = (users, filters) =>
  users.filter((user) => {
    if (filters.query) {
      let queryMatched = false;
      const properties = ["email", "name"];

      properties.forEach((property) => {
        if (
          user[property].toLowerCase().includes(filters.query.toLowerCase())
        ) {
          queryMatched = true;
        }
      });

      if (!queryMatched) {
        return false;
      }
    }

    if (filters.isStudent && !(user.type === "student")) return false;
    if (filters.isAcademic && !(user.type === "academic")) return false;
    if (filters.isAdmin && !(user.type === "admin")) return false;
    if (filters.isParent && !(user.type === "parent")) return false;
    if (filters.isTeacher && !(user.type === "teacher")) return false;

    return true;
  });

const applyPagination = (users, page, rowsPerPage) =>
  users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const UserList = () => {
  const isMounted = useMounted();
  const router = useRouter();
  const queryRef = useRef(null);
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    query: "",
    isStudent: undefined,
    isAcademic: undefined,
    isTeacher: undefined,
    isParent: undefined,
    isAdmin: undefined,
  });
  const [currentTab, setCurrentTab] = useState("all");

  const getUsers = useCallback(() => {
    try {
      const data = usersFixture;

      if (isMounted()) {
        setUsers(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      getUsers();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const handleTabsChange = (event, value) => {
    const updatedFilter = {
      ...filters,
      isStudent: undefined,
      isAcademic: undefined,
      isTeacher: undefined,
      isParent: undefined,
      isAdmin: undefined,
    };

    console.log(value);
    if (value !== "all") {
      updatedFilter[value] = true;
      console.log(updatedFilter);
    }

    console.log(updatedFilter);
    setFilters(updatedFilter);
    setCurrentTab(value);
    console.log(users);
    console.log(filteredUsers);
  };

  const handleQueryChange = (event) => {
    event.preventDefault();
    setFilters((prevState) => ({
      ...prevState,
      query: queryRef.current?.value,
    }));
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // TODO : filtering in backend with indexing solution this just for time purpose of supinfo :(

  const filteredUsers = applyFilters(users, filters);
  const paginatedUsers = applyPagination(filteredUsers, page, rowsPerPage);
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
                  placeholder="Search users"
                />
              </Box>
            </Box>
            <UserListTable
              users={paginatedUsers}
              usersCount={filteredUsers.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              rowsPerPage={rowsPerPage}
              page={page}
            />
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
