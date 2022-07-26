import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  InputAdornment,
  Link,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import NextLink from "next/link";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { AppLayout } from "../../../../components/app/app-layout";
import { AuthGuard } from "../../../../components/authentication/auth-guard";
import { RoleGuard } from "../../../../components/authentication/role-guard";
import { useMounted } from "../../../../hooks/use-mounted";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { getInitials } from "../../../../lib/getInitials";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
const userFixture = {
  id: "df56d4f5dsq",
  firstName: "John ",
  lastName: "Doe",
  active: false,
  email: "john.doe@scoosign.com",
  type: "student",
  createdAt: "10-10-2021",
  createdBy: "Jon fo",
};
// TODO: refactor this
const userRoleOptions = [
  {
    label: "Administrator",
    value: "admin",
  },
  {
    label: "Academic Manager",
    value: "academic",
  },
  {
    label: "Teacher",
    value: "teacher",
  },
  {
    label: "Student",
    value: "student",
  },
  {
    label: "Student Parent",
    value: "parent",
  },
];
const UserEditForm = (props) => {
  const { user, ...other } = props;
  const router = useRouter();
  const [alertState, setAlertState] = useState({
    showAlert: false,
    messageAlert: "",
  });
  const userEditForm = useFormik({
    initialValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      active: user.active || false,
      type: user.type || "default",
      submit: null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().max(255).required("First name is required"),
      lastName: Yup.string().max(255).required("Last name is required"),
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      active: Yup.bool(),
    }),
    onSubmit: async (values, helpers) => {
      try {
        console.log(values);
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success("Customer updated!");
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
        setAlertState({
          showAlert: true,
          messageAlert: error.message,
        });
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });
  useEffect(() => {
    router.prefetch("/app/users/" + user.id);
  }, []);
  const handleDelete = (e) => {
    e.preventDefault()
    console.log('TODO delete user')
  }
  return (
    <form onSubmit={userEditForm.handleSubmit} {...other}>
      {alertState.showAlert && (
        <Box sx={{ mt: 2, mb: 3 }}>
          <Alert
            severity="error"
            error={Boolean(
              userEditForm.touched.submit && userEditForm.errors.submit
            )}
          >
            <Typography variant="caption">
              <div>{alertState.messageAlert}</div>
            </Typography>
          </Alert>
        </Box>
      )}
      <Card>
        <CardHeader title="Edit user" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(
                  userEditForm.touched.firstName &&
                    userEditForm.errors.firstName
                )}
                fullWidth
                helperText={
                  userEditForm.touched.firstName &&
                  userEditForm.errors.firstName
                }
                label="First name"
                name="firstName"
                onBlur={userEditForm.handleBlur}
                onChange={userEditForm.handleChange}
                required
                value={userEditForm.values.firstName}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(
                  userEditForm.touched.lastName && userEditForm.errors.lastName
                )}
                fullWidth
                helperText={
                  userEditForm.touched.lastName && userEditForm.errors.lastName
                }
                label="Last name"
                name="lastName"
                onBlur={userEditForm.handleBlur}
                onChange={userEditForm.handleChange}
                required
                value={userEditForm.values.lastName}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(
                  userEditForm.touched.email && userEditForm.errors.email
                )}
                fullWidth
                helperText={
                  userEditForm.touched.email && userEditForm.errors.email
                }
                label="Email"
                name="email"
                onBlur={userEditForm.handleBlur}
                onChange={userEditForm.handleChange}
                required
                value={userEditForm.values.email}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">@</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              mt: 3,
            }}
          >
            <div>
              <Typography gutterBottom variant="subtitle1">
                Make User Info Public
              </Typography>
              <Typography color="textSecondary" variant="body2" sx={{ mt: 1 }}>
                Means that user can login in his account and will not be
                archive.
              </Typography>
            </div>
            <Switch
              checked={userEditForm.values.active}
              color="primary"
              edge="start"
              name="active"
              onChange={userEditForm.handleChange}
              value={userEditForm.values.active}
            />
          </Box>
          <Divider sx={{ my: 3 }} />
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Typography gutterBottom variant="subtitle1">
                User Type or Permission level
              </Typography>
            </div>
            <TextField
              label="Permission Level"
              name="type"
              fullWidth
              sx={{ mt: 3 }}
              select
              onBlur={userEditForm.handleBlur}
              onChange={userEditForm.handleChange}
              error={Boolean(
                userEditForm.touched.type && userEditForm.errors.type
              )}
              value={userEditForm.values.type}
            >
              {userRoleOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </CardContent>
        <CardActions sx={{ flewWrap: "wrap", m: -1 }}>
          <Button
            disabled={userEditForm.isSubmitting}
            type="submit"
            sx={{ m: 1 }}
            variant="contained"
          >
            Update
          </Button>
          <NextLink href={`/app/users/${user.id}`} passHref>
            <Button
              component="a"
              disabled={userEditForm.isSubmitting}
              sx={{
                m: 1,
                mr: "auto",
              }}
              variant="outlined"
            >
              Cancel
            </Button>
          </NextLink>
          <Button onClick={(e) =>handleDelete(e)} color="error" disabled={userEditForm.isSubmitting}>
            Delete user
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

// TODO: refactor getUser
const UserEdit = () => {
  const isMounted = useMounted();
  const [user, setUser] = useState(null);
  const getUser = useCallback(() => {
    const data = userFixture;
    if (isMounted()) setUser(data);
  }, [isMounted]);
  useEffect(() => {
    getUser();
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
