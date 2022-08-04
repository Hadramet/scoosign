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

const GroupDetails = (props) => {
  const isMounted = useMounted();
  const accessToken = globalThis.localStorage.getItem("accessToken");
  const { query } = useRouter();
  const [currentTab, setCurrentTab] = useState("details");

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  // ********************************
  // ** GROUP
  // ********************************
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
  const setGroupInfosHandler = async (body) => {
    await putGroupInfo(body);
    mutate({
      ...group,
      parent: body.parent,
      description: body.description,
    });
  };

  const putGroupInfo = async (body, groupId = query.groupId) => {
    await fetch(`/api/v1/groups/${groupId}`, {
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

  const handleDelete = (event) => {
    event.preventDefault();
    console.log("TODO : danger delete");
  };

  const handleLockUnlock = async (event) => {
    event.preventDefault();
    const body = {
      active: !group.data.active,
    };
    await putGroupInfo(body);
    mutate({
      ...group,
      active: body.active,
    });
  };

  // ********************************
  // ** SUB-GROUPS
  // ********************************
  const [groupsPage, setGroupsPage] = useState(1);
  const [groupsPerPage, setGroupsRowsPerPage] = useState(5);
  const { data: groupSubGroups, mutate: subGroupsMutate } = useSWR([
    `/api/v1/groups/subGroups/${query.groupId}?page=${groupsPage}&limit=${groupsPerPage}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "X-Scoosign-Authorization": `Bearer ${accessToken}`,
      },
    },
  ]);
  const [addGroupDialog, setAddGroupDialog] = useState({
    isOpen: false,
    eventId: undefined,
    range: undefined,
  });
  const handleGroupPageChange = (event, newPage) => {
    setGroupsPage(newPage + 1);
  };

  const handleGroupRowsPerPageChange = (event) => {
    setGroupsRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleCloseAddGroupDialog = () => {
    setAddGroupDialog({
      isOpen: false,
    });
  };

  const handleGroupsResult = async (groups) => {
    const ids = [];
    groups.map((group) => ids.push(group._id));

    const body = {
      subGroups: ids,
    };
    await putGroupInfo(body);
    subGroupsMutate({
      ...groupSubGroups,
      data: {
        ...groupSubGroups.data,
        paginator: {
          ...groupSubGroups.data.paginator,
          itemCount: groupSubGroups.data.paginator.itemCount + groups.length,
        },
        itemsList: [...groupSubGroups.data.itemsList, groups],
      },
    });
  };

  const removeGroupHandler = async (event, groupId) => {
    event.preventDefault();
    await putGroupInfo({ parent: "" }, groupId);
    subGroupsMutate({
      ...groupSubGroups,
      data: {
        ...groupSubGroups.data,
        paginator: {
          ...groupSubGroups.data.paginator,
          itemCount: groupSubGroups.data.paginator.itemCount - 1,
        },
        itemsList: [
          groupSubGroups.data.itemsList.filter((item) => item._id != groupId),
        ],
      },
    });
  };

  const addGroupHandler = (event) => {
    event.preventDefault();
    setAddGroupDialog({
      isOpen: true,
    });
  };

  // ********************************
  // ** STUDENTS
  // ********************************

  const [studentsPage, setStudentsPage] = useState(1);
  const [studentsRowsPerPage, setStudentsRowsPerPage] = useState(5);
  const { data: groupStudents, mutate: studentsMutate } = useSWR([
    `/api/v1/groups/${query.groupId}/students?page=${studentsPage}&limit=${studentsRowsPerPage}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "X-Scoosign-Authorization": `Bearer ${accessToken}`,
      },
    },
  ]);
  const [addStudentDialog, setAddStudentDialog] = useState({
    isOpen: false,
    eventId: undefined,
    range: undefined,
  });

  const handleStudentsPageChange = (event, newPage) => {
    setStudentsPage(newPage + 1);
  };

  const handleStudentsRowsPerPageChange = (event) => {
    setStudentsRowsPerPage(parseInt(event.target.value, 10));
  };

  const addStudentHandler = (event) => {
    event.preventDefault();
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

  const handleStudentsResult = async (students) => {
    const ids = [];
    students.map((student) => ids.push(student._id));

    const body = {
      students: ids,
    };
    await putGroupInfo(body);
    studentsMutate({
      ...groupStudents,
      data: {
        ...groupStudents.data,
        paginator: {
          ...groupStudents.data.paginator,
          itemCount: groupStudents.data.paginator.itemCount + students.length,
        },
        itemsList: [...groupStudents.data.itemsList, students],
      },
    });
  };

  if (!group) return null;
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
                    onClick={handleLockUnlock}
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
                    {groupSubGroups && (
                      <GroupSubGroupItems
                        subGroups={groupSubGroups.data?.itemsList}
                        count={groupSubGroups.data?.paginator?.itemCount}
                        canBrowseToGroup={false}
                        addGroupHandler={addGroupHandler}
                        removeGroupHandler={removeGroupHandler}
                        page={groupsPage - 1}
                        rowsPerPage={groupsPerPage}
                        onPageChange={handleGroupPageChange}
                        onRowsPerPageChange={handleGroupRowsPerPageChange}
                      />
                    )}
                  </Grid>
                )}
                {group.data?.active ? (
                  <Grid item xs={12}>
                    {groupStudents && (
                      <GroupStudentItems
                        addStudentHandler={addStudentHandler}
                        removeStudentHandler={removeStudentHandler}
                        students={groupStudents.data?.itemsList}
                        canBrowseToStudent={false}
                        count={groupStudents.data?.paginator.itemCount}
                        page={studentsPage - 1}
                        rowsPerPage={studentsRowsPerPage}
                        onPageChange={handleStudentsPageChange}
                        onRowsPerPageChange={handleStudentsRowsPerPageChange}
                      />
                    )}
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
                          onClick={handleLockUnlock}
                          sx={{ m: 1, mr: "auto" }}
                          color="error"
                          variant="contained"
                        >
                          Lock
                        </Button>
                      )}
                      <Button
                        align="right"
                        disabled
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
        groupParentId={group.data?.parent}
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
