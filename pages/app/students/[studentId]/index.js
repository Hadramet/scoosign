import { Box } from "@mui/system";
import { default as Head } from "next/head";
import { AuthGuard } from "@/components/authentication/auth-guard";
import { RoleGuard } from "@/components/authentication/role-guard";
import { AppLayout } from "@/components/app/app-layout";
import {
  ArrowBack as ArrowBackIcon,
  FlashOffOutlined,
} from "@mui/icons-material";
import { PencilAlt as PencilAltIcon } from "@/components/icons";
import NextLink from "next/link";
import {
  Avatar,
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
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  studentDetailsTabs,
  userDetailsTabs,
} from "@/lib/user-options-and-tabs";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import { getInitials } from "@/lib/get-initials";
import { PropertyList } from "@/components/property-list";
import { PropertyListItem } from "@/components/property-list-items";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { GroupSubGroupItems } from "@/components/app/groups/group-sub-group-items";
import { AddGroupDialog } from "@/components/app/add-group-dialog";

const StudentBasicDetails = (props) => {
  const {
    student,
    setStudentInfos,
    deleteHandle,
    handleResetPassword,
    ...other
  } = props;
  const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const align = smDown ? "vertical" : "horizontal";
  const form = useFormik({
    initialValues: {
      firstName: student?.data?.user?.firstName,
      lastName: student?.data?.user?.lastName,
      email: student?.data?.user?.email,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().max(255).required("First name is required"),
      lastName: Yup.string().max(255).required("Last name is required"),
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        setStudentInfos(values);
      } catch (error) {
        console.error(error);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error.message });
        helpers.setSubmitting(false);
      }
    },
  });

  if (!student) return "loading ..";
  return (
    <form onSubmit={form.handleSubmit} {...other}>
      <Card>
        <CardHeader title="Infos" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                name="firstName"
                label="FirstName"
                fullWidth
                onBlur={form.handleBlur}
                onChange={form.handleChange}
                disabled={!student.data?.user?.active}
                error={Boolean(form.touched.firstName && form.errors.firstName)}
                helperText={form.touched.firstName && form.errors.firstName}
                value={form.values.firstName}
                size="small"
                sx={{
                  flexGrow: 1,
                  mr: 3,
                }}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                name="lastName"
                label="Last Name"
                fullWidth
                onBlur={form.handleBlur}
                onChange={form.handleChange}
                disabled={!student?.data?.user?.active}
                error={Boolean(form.touched.lastName && form.errors.lastName)}
                helperText={form.touched.lastName && form.errors.lastName}
                value={form.values.lastName}
                size="small"
                sx={{
                  flexGrow: 1,
                  mr: 3,
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                name="email"
                label="Email"
                fullWidth
                onBlur={form.handleBlur}
                onChange={form.handleChange}
                disabled={!student?.data?.user?.active}
                error={Boolean(form.touched.email && form.errors.email)}
                helperText={form.touched.email && form.errors.email}
                value={form.values.email}
                size="small"
                sx={{
                  flexGrow: 1,
                  mr: 3,
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ flewWrap: "wrap", m: -1 }}>
          <Button
            sx={{ mr: "auto" }}
            disabled={form.isSubmitting}
            onClick={(e) => handleResetPassword(e)}
            variant="outlined"
          >
            Reset &amp; Send Password
          </Button>
          <Button onClick={(e) => deleteHandle(e)} color="error" disabled>
            Delete user
          </Button>
          <Button
            disabled={form.isSubmitting}
            type="submit"
            sx={{ m: 1 }}
            variant="contained"
          >
            Update
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
StudentBasicDetails.propTypes = {
  student: PropTypes.object,
  setStudentInfos: PropTypes.func.isRequired,
  deleteHandle: PropTypes.func.isRequired,
  handleResetPassword: PropTypes.func.isRequired,
};

const StudentDetails = (props) => {
  const [currentTab, setCurrentTab] = useState("details");
  const accessToken = globalThis.localStorage.getItem("accessToken");
  const router = useRouter();
  const { query } = router;
  const {
    data: student,
    error,
    mutate,
  } = useSWR([
    `/api/v1/students/${query.studentId}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "X-Scoosign-Authorization": `Bearer ${accessToken}`,
      },
    },
  ]);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };
  const onSetStudentInfos = async (infos) => {
    await mutate(
      fetch(`/api/v1/users/${student?.data?.user?._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "X-Scoosign-Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(infos),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) toast.success("Password reset, email send to user");
          else toast.error(data.message || "Something went wrong");
        })
        .catch((err) => {
          new Error(err.message || "Something went wrong");
        }),
      {
        optimisticData: {
          ...student,
          data: {
            ...student.data,
            user: {
              ...student.data.user,
              email: infos.email,
            },
          },
        },
        rollbackOnError: true,
        revalidate: true,
      }
    );
  };
  const deleteHandle = (e) => {
    e.preventDefault();
    console.log("TODO Delete student");
  };
  const handleResetPassword = async (e) => {
    e.preventDefault();
    await fetch(`/api/v1/users/${student?.data?.user?._id}/reset-password`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-Scoosign-Authorization": `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) toast.success("Password reset, email send to user");
        else
          toast.error(
            data.message || "Failed to reset the password. Try again"
          );
      })
      .catch((err) => toast.error(err.message || "Something went wrong"));
  };

  // ********************************
  // ** GROUPS
  // ********************************
  const [groupsPage, setGroupsPage] = useState(1);
  const [groupsPerPage, setGroupsRowsPerPage] = useState(5);
  const { data: groupSubGroups, mutate: subGroupsMutate } = useSWR([
    `/api/v1/students/${query.studentId}/groups?page=${groupsPage}&limit=${groupsPerPage}`,
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
      groups: ids,
    };
    await fetch(`/api/v1/students/${query.studentId}/add-groups`, {
      method: "Put",
      headers: {
        "Content-type": "application/json",
        "X-Scoosign-Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) toast.success("Groups successfully added");
        else toast.error(data.message);
      })
      .catch((err) => toast.error(err.message));
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
    // await putGroupInfo({ parent: "" }, groupId);
    await fetch(`/api/v1/students/${query.studentId}/remove-group`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "X-Scoosign-Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ groups: [groupId] }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) toast.success("Groups successfully added");
        else toast.error(data.message);
      })
      .catch((err) => toast.error(err.message));
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
    // if (error) return "Something went wrong";
    // if (!student) return "Loading ...";

  return (
    <Box>
      <Head>
        <title>App - Student Details | ScooSign</title>
      </Head>
      <Container maxWidth="md">
        <div>
          <Box sx={{ mb: 4 }}>
            <NextLink href="/app/students" passHref>
              <Link
                color="textPrimary"
                component="a"
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">Students</Typography>
              </Link>
            </NextLink>
          </Box>
          <Grid container justifyContent="space-between" spacing={3}>
            {error ? (
              "Something went wrong"
            ) : !student ? (
              "Loading ..."
            ) : (
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
                  {getInitials(
                    student?.data?.user?.firstName +
                      " " +
                      student?.data?.user?.lastName
                  )}
                </Avatar>
                <div>
                  <Typography variant="h4">
                    {student?.data?.user?.email}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle2">Student ID:</Typography>
                    <Chip
                      label={student?.data?._id}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                    <Chip
                      label={student?.data?.user.active ? "ACTIVE" : "ARCHIVE"}
                      color={student?.data?.user.active ? "success" : "warning"}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Box>
                </div>
              </Grid>
            )}
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
            {studentDetailsTabs.map((tab) => (
              <Tab
                disabled={tab.disabled}
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
        </div>
        <Divider />
        <Box sx={{ mt: 3, mb: 3 }}>
          {currentTab === "details" && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {error ? (
                  "Something went wrong"
                ) : !student ? (
                  "loading"
                ) : (
                  <StudentBasicDetails
                    student={student}
                    setStudentInfos={onSetStudentInfos}
                    deleteHandle={deleteHandle}
                    handleResetPassword={handleResetPassword}
                  />
                )}
              </Grid>
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
            </Grid>
          )}
        </Box>
      </Container>
      <AddGroupDialog
        open={addGroupDialog.isOpen}
        onClose={handleCloseAddGroupDialog}
        handleGroupResult={handleGroupsResult}
      />
    </Box>
  );
};
StudentDetails.getLayout = (page) => (
  <AuthGuard>
    <RoleGuard permissions={["admin", "academic"]}>
      <AppLayout>{page}</AppLayout>
    </RoleGuard>
  </AuthGuard>
);

export default StudentDetails;
