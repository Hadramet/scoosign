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
import { useAuth } from "../../../hooks/use-auth";
import { userRoleOptionsBool } from "../../../lib/user-options-and-tabs";

const applyFilters = (users, filters) => {
  if (!users) return [];
  return users.filter((user) => {
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
};

const applyPagination = (users, page, rowsPerPage) =>
  users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const UserList = (props) => {
  const isMounted = useMounted();
  const router = useRouter();
  const queryRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
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

  const getUsers = useCallback(
    async (filter, rowsPerPage, page) => {
      try {
        const accessToken = globalThis.localStorage.getItem("accessToken");
        const root_url = "/api/v1/users";
        const response = await fetch(root_url, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "X-Scoosign-Authorization": `Bearer ${accessToken}`,
          },
        });
        const response_json = await response.json();
        const data = response_json.data;

        if (isMounted()) {
          setUsers(data);
        }
      } catch (err) {
        console.error(err);
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [isMounted]
  );

  useEffect(
    () => {
      getUsers("student", 5, 1);
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

    if (value !== "all") {
      updatedFilter[value] = true;
    }

    setPage(0);
    setFilters(updatedFilter);
    setCurrentTab(value);
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
            <Box disabled sx={{ m: -1, mt: 3 }}>
              <Button disabled startIcon={<UploadIcon fontSize="small" />} sx={{ m: 1 }}>
                {" "}
                Import
              </Button>
              <Button disabled
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
              {userRoleOptionsBool.map((tab) => (
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
