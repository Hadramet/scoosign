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
  teacherDetailsTabs,
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

const TeacherBasicDetails = (props) => {
  const {
    teacher,
    setTeacherInfos,
    deleteHandle,
    handleResetPassword,
    ...other
  } = props;
  const form = useFormik({
    initialValues: {
      firstName: teacher?.data?.user?.firstName,
      lastName: teacher?.data?.user?.lastName,
      email: teacher?.data?.user?.email,
      specialty: teacher?.data?.specialty,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().max(255).required("First name is required"),
      lastName: Yup.string().max(255).required("Last name is required"),
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      specialty: Yup.string().max(255),
    }),
    onSubmit: async (values, helpers) => {
      try {
        setTeacherInfos(values);
      } catch (error) {
        console.error(error);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error.message });
        helpers.setSubmitting(false);
      }
    },
  });

  if (!teacher) return "loading ..";
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
                disabled={!teacher.data?.user?.active}
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
                disabled={!teacher?.data?.user?.active}
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
                disabled={!teacher?.data?.user?.active}
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
TeacherBasicDetails.propTypes = {
  teacher: PropTypes.object,
  setTeacherInfos: PropTypes.func.isRequired,
  deleteHandle: PropTypes.func.isRequired,
  handleResetPassword: PropTypes.func.isRequired,
};
const TeacherDetails = (props) => {
  const [currentTab, setCurrentTab] = useState("details");
  const accessToken = globalThis.localStorage.getItem("accessToken");
  const router = useRouter();
  const { query } = router;
  const {
    data: teacher,
    error,
    mutate,
  } = useSWR([
    `/api/v1/teachers/${query.teacherId}`,
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
  const onSetTeacherInfos = async (infos) => {
    await mutate(
      fetch(`/api/v1/users/${teacher?.data?.user?._id}`, {
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
          ...teacher,
          data: {
            ...teacher.data,
            user: {
              ...teacher.data.user,
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
    console.log("TODO Delete teacher");
  };
  const handleResetPassword = async (e) => {
    e.preventDefault();
    await fetch(`/api/v1/users/${teacher?.data?.user?._id}/reset-password`, {
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

  if (error) return "Something went wrong";
  if (!teacher) return "Loading ...";

  return (
    <Box>
      <Head>
        <title>App - Teacher Details | ScooSign</title>
      </Head>
      <Container maxWidth="md">
        <div>
          <Box sx={{ mb: 4 }}>
            <NextLink href="/app/teachers" passHref>
              <Link
                color="textPrimary"
                component="a"
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">Teachers</Typography>
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
                {getInitials(
                  teacher?.data?.user?.firstName +
                    " " +
                    teacher?.data?.user?.lastName
                )}
              </Avatar>
              <div>
                <Typography variant="h4">
                  {teacher?.data?.user?.email}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle2">Teacher ID:</Typography>
                  <Chip
                    label={teacher?.data?._id}
                    size="small"
                    sx={{ ml: 1 }}
                  />
                  <Chip
                    label={teacher?.data?.user.active ? "ACTIVE" : "ARCHIVE"}
                    color={teacher?.data?.user.active ? "success" : "warning"}
                    size="small"
                    sx={{ ml: 1 }}
                  />
                </Box>
              </div>
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
            {teacherDetailsTabs.map((tab) => (
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
                <TeacherBasicDetails
                  teacher={teacher}
                  setTeacherInfos={onSetTeacherInfos}
                  deleteHandle={deleteHandle}
                  handleResetPassword={handleResetPassword}
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          )}
        </Box>
      </Container>
    </Box>
  );
};
TeacherDetails.getLayout = (page) => (
  <AuthGuard>
    <RoleGuard permissions={["admin", "academic"]}>
      <AppLayout>{page}</AppLayout>
    </RoleGuard>
  </AuthGuard>
);

export default TeacherDetails;
