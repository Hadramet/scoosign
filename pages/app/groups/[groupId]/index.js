import {
  Button,
  Card,
  CardActions,
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
import { Box } from "@mui/system";
import Head from "next/head";
import NextLink from "next/link";
import { AppLayout } from "@/components/app/app-layout";
import { AuthGuard } from "@/components/authentication/auth-guard";
import { RoleGuard } from "@/components/authentication/role-guard";
import {
  ArrowBack as ArrowBackIcon,
  Lock,
  LockOpen,
} from "@mui/icons-material";
import { ChevronDown as ChevronDownIcon } from "@/components/icons";
import { useEffect, useState } from "react";
import { useMounted } from "@/hooks/use-mounted";
import {
  createRandomGroup,
  getRandomGroups,
  getRandomUser,
} from "@/faker/fakeDatas";
import { GroupBasicDetails } from "@/components/app/groups/group-basic-details";
import { GroupSubGroupItems } from "@/components/app/groups/group-sub-group-items";
import { GroupStudentItems } from "@/components/app/groups/group-student-items";
import { AddStudentDialog } from "@/components/app/add-student-dialog";
import { AddGroupDialog } from "@/components/app/add-group-dialog";
import { applyPagination } from "@/components/app/apply-pagination";
import useSWR from "swr";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const groupDetailsTabs = [
  { label: "Details", value: "details", disabled: false },
  { label: "Courses", value: "courses", disabled: true },
  { label: "Calendar", value: "calendar", disabled: true },
];

// TODO: get group fixture
// TODO: get sub-group
// TODO: get students
// TODO: Remove group parent
const GroupDetails = (props) => {
  const isMounted = useMounted();
  // // const [group, setGroup] = useState(null);
  const accessToken = globalThis.localStorage.getItem("accessToken");
  const { query } = useRouter();
  const { data: group, mutate } = useSWR([
    `/api/v1/groups/${query.groupId}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "X-Scoosign-Authorization": `Bearer ${accessToken}`,
      },
    },
  ]);

  const [currentTab, setCurrentTab] = useState("details");
  const [groupStudents, setGroupStudents] = useState([]);
  const [groupSubGroups, setGroupSubGroups] = useState([]);
  const [addGroupDialog, setAddGroupDialog] = useState({
    isOpen: false,
    eventId: undefined,
    range: undefined,
  });
  const [addStudentDialog, setAddStudentDialog] = useState({
    isOpen: false,
    eventId: undefined,
    range: undefined,
  });

  const [groupsPage, setGroupsPage] = useState(0);
  const [groupsPerPage, setGroupsRowsPerPage] = useState(5);

  const [studentsPage, setStudentsPage] = useState(0);
  const [studentsRowsPerPage, setStudentsRowsPerPage] = useState(5);

  const handleGroupPageChange = (event, newPage) => {
    setGroupsPage(newPage);
  };

  const handleGroupRowsPerPageChange = (event) => {
    setGroupsRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleStudentsPageChange = (event, newPage) => {
    setStudentsPage(newPage);
  };

  const handleStudentsRowsPerPageChange = (event) => {
    setStudentsRowsPerPage(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    if (isMounted()) {
      getGroupStudents();
      getGroupSubGroups();
    }
  }, [isMounted, group]);
  // Fetch group students from api
  const getGroupStudents = async () => {
    const response = await new Promise((resolve) => {
      resolve(getRandomUser(34));
    });
    console.log("[LOAD GROUP-STUDENTS]", response);
    setGroupStudents(response);
  };
  // Fetch group sub-groups from api
  const getGroupSubGroups = async () => {
    const response = await new Promise(async (resolve) =>
      resolve(getRandomGroups(5))
    );
    console.log("[LOAD GROUP-SUB-GROUPS]", response);
    setGroupSubGroups(response);
  };

  const setGroupInfosHandler = async (body) => {
    await putGroupInfo(body);  
    mutate({
      ...group,
      itemsList: { parent: body.parent, description: body.description },
    });
  };

  const putGroupInfo = async (body) => {
    await fetch(`/api/v1/groups/${query.groupId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "X-Scoosign-Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) toast.success("Successfully update");
        else toast.error("Update failed", data.message || "");
      })
      .catch((error) => toast.error(error.message));
  };

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const addStudentHandler = (event) => {
    event.preventDefault();
    console.log("TODO : add student handle");
    setAddStudentDialog({
      isOpen: true,
    });
  };
  const handleCloseAddStudentDialog = () => {
    setAddStudentDialog({
      isOpen: false,
    });
  };

  const removeStudentHandler = (event, studentId) => {
    event.preventDefault();
    console.log("TODO : remove student id: " + studentId);
  };

  const addGroupHandler = (event) => {
    event.preventDefault();
    console.log("TODO : add group handle");
    setAddGroupDialog({
      isOpen: true,
    });
  };
  const handleCloseAddGroupDialog = () => {
    setAddGroupDialog({
      isOpen: false,
    });
  };

  const removeGroupHandler = (event, groupId) => {
    event.preventDefault();
    console.log("TODO : remove group id: " + groupId);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    console.log("TODO : danger delete");
  };

  const handleLock = (event) => {
    event.preventDefault();
    console.log("TODO : danger lock");
  };

  const handleUnlock = (event) => {
    event.preventDefault();
    console.log("TODO : unlock");
  };

  const handleStudentsResult = (students) => {
    console.log("TODO API POST", students);
  };

  const handleGroupsResult = (groups) => {
    console.log("TODO API POST", groups);
  };

  if (!group) return null;

  const paginatedSubGroups = applyPagination(
    groupSubGroups,
    groupsPage,
    groupsPerPage
  );
  const paginatedStudents = applyPagination(
    groupStudents,
    studentsPage,
    studentsRowsPerPage
  );
  return (
    <>
      <Head>
        <title>App: Group Details | ScooSign</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 4 }}>
            <NextLink href="/app/groups" passHref>
              <Link
                color="textPrimary"
                component="a"
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">Groups</Typography>
              </Link>
            </NextLink>
          </Box>
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">
                  {!group.data?.active && (
                    <Lock color="textPrimary" fontSize="medium" />
                  )}{" "}
                  {group.data?.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Chip
                    label={group.data?._id}
                    color="default"
                    size="small"
                    sx={{ mr: 0.5 }}
                  />
                  {group.data?.active && (
                    <Chip
                      label={!group.data?.parent ? "ROOT-GROUP" : "SUB-GROUP"}
                      color={!group.data?.parent ? "primary" : "secondary"}
                      size="small"
                    />
                  )}
                </Box>
              </Grid>
              <Grid item sx={{ ml: -2 }}>
                {group.data?.active && (
                  <Button
                    disabled
                    endIcon={<ChevronDownIcon fontSize="small" />}
                    sx={{ m: 1 }}
                    variant="contained"
                  >
                    Actions
                  </Button>
                )}
                {!group.data?.active && (
                  <Button
                    onClick={handleUnlock}
                    endIcon={<LockOpen fontSize="small" />}
                    variant="contained"
                    color="primary"
                    sx={{ ml: 2 }}
                  >
                    Unlock
                  </Button>
                )}
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
              {groupDetailsTabs.map((tab) => (
                <Tab
                  key={tab.value}
                  disabled={tab.disabled}
                  label={tab.label}
                  value={tab.value}
                />
              ))}
            </Tabs>
          </Box>
          <Divider />
          <Box sx={{ mt: 3 }}>
            {currentTab === "details" && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <GroupBasicDetails
                    group={group}
                    setGroupInfosHandler={setGroupInfosHandler}
                  />
                </Grid>
                {!group.data?.active || group.data?.parent ? (
                  <></>
                ) : (
                  <Grid item xs={12}>
                    <GroupSubGroupItems
                      subGroups={paginatedSubGroups}
                      count={groupSubGroups.length}
                      canBrowseToGroup={false}
                      addGroupHandler={addGroupHandler}
                      removeGroupHandler={removeGroupHandler}
                      page={groupsPage}
                      rowsPerPage={groupsPerPage}
                      onPageChange={handleGroupPageChange}
                      onRowsPerPageChange={handleGroupRowsPerPageChange}
                    />
                  </Grid>
                )}
                {group.data?.active ? (
                  <Grid item xs={12}>
                    <GroupStudentItems
                      addStudentHandler={addStudentHandler}
                      removeStudentHandler={removeStudentHandler}
                      students={paginatedStudents}
                      canBrowseToStudent={false}
                      count={groupStudents.length}
                      page={studentsPage}
                      rowsPerPage={studentsRowsPerPage}
                      onPageChange={handleStudentsPageChange}
                      onRowsPerPageChange={handleStudentsRowsPerPageChange}
                    />
                  </Grid>
                ) : (
                  <></>
                )}
                <Grid item xs={12}>
                  <Card color="error" variant="outlined">
                    <CardHeader title="Danger Zone" />
                    <Divider />
                    <CardContent>
                      <Box sx={{ mt: 1 }}>
                        <Typography color="textSecondary" variant="body2">
                          You have two possible actions, if you decide to lock
                          the group, this group will no longer be visible to
                          users. But you can always unlock it afterwards,.But If
                          you delete it, however, this action is irreversible.
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions sx={{ flewWrap: "wrap", m: -1 }}>
                      {group.data?.active && (
                        <Button
                          onClick={handleLock}
                          sx={{ m: 1, mr: "auto" }}
                          color="error"
                          variant="contained"
                        >
                          Lock
                        </Button>
                      )}
                      <Button
                        align="right"
                        onClick={handleDelete}
                        color="error"
                      >
                        Delete group
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            )}
          </Box>
        </Container>
      </Box>
      <AddStudentDialog
        open={addStudentDialog.isOpen}
        onClose={handleCloseAddStudentDialog}
        handleResult={handleStudentsResult}
      />
      <AddGroupDialog
        open={addGroupDialog.isOpen}
        onClose={handleCloseAddGroupDialog}
        handleGroupResult={handleGroupsResult}
      />
    </>
  );
};

GroupDetails.getLayout = (page) => (
  <AuthGuard>
    <RoleGuard permissions={["admin", "academic"]}>
      <AppLayout>{page}</AppLayout>
    </RoleGuard>
  </AuthGuard>
);

export default GroupDetails;
