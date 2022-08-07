import { Logout, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Grid,
  Alert,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useAuth } from "../../../hooks/use-auth";

const saltRounds = 12;

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

export const UserCreateForm = (props) => {
  const userCreateForm = useFormik({
    initialValues: {
      firstName: "Aicha",
      lastName: "FaitMale",
      email: "aicha.faitmale@scoosign.com",
      password: "Supinf0?",
      role: "student",
      sendEmail: true,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().max(255).required("First name is required"),
      lastName: Yup.string().max(255).required("Last name is required"),
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
      sendEmail: Yup.boolean(),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const body = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          role: values.role,
          sendEmail: values.sendEmail,
        };

        await fetch("/api/v1/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Scoosign-Authorization": `Bearer ${accessToken}`,
          },
          body: JSON.stringify(body),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              toast.success("User successfully created");
              router.push("/app/users");
            } else {
              if (data.failed === "email") {
                helpers.setStatus({ success: false });
                setAlertState({
                  showAlert: true,
                  messageAlert: "There are some informations you need to check",
                });
                helpers.setErrors({ email: data.message });
                helpers.setSubmitting(false);
              } else {
                throw new Error("Something went wrong");
              }
            }
          })
          .catch((error) => {
            console.error("[me Api]", error);
            toast.error("Something went wrong");
            throw new Error(error.message);
          });
      } catch (error) {
        console.error(error);
        setAlertState({
          showAlert: true,
          messageAlert: error.message,
        });
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const router = useRouter();
  const { logout } = useAuth();
  const [alertState, setAlertState] = useState({
    showAlert: false,
    messageAlert: "",
  });

  useEffect(() => {
    router.prefetch("/app/users");
  }, [router]);

  const [valuesForm, setValuesForm] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValuesForm({ ...valuesForm, showPassword: !valuesForm.showPassword });
  };

  const accessToken = globalThis.localStorage.getItem("accessToken");

  return (
    <form onSubmit={userCreateForm.handleSubmit} {...props}>
      {alertState.showAlert && (
        <Box sx={{ mt: 2, mb: 3 }}>
          <Alert
            severity="error"
          >
            <Typography variant="caption">
              <div>{alertState.messageAlert}</div>
            </Typography>
          </Alert>
        </Box>
      )}
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              {" "}
              <Typography variant="h6"> Basic details </Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <TextField
                label="Fist Name"
                name="firstName"
                fullWidth
                onBlur={userCreateForm.handleBlur}
                onChange={userCreateForm.handleChange}
                error={Boolean(
                  userCreateForm.touched.firstName &&
                    userCreateForm.errors.firstName
                )}
                helperText={
                  userCreateForm.touched.firstName &&
                  userCreateForm.errors.firstName
                }
                value={userCreateForm.values.firstName}
              />

              <TextField
                label="Last Name"
                name="lastName"
                fullWidth
                sx={{ mb: 2, mt: 3 }}
                onBlur={userCreateForm.handleBlur}
                onChange={userCreateForm.handleChange}
                error={Boolean(
                  userCreateForm.touched.lastName &&
                    userCreateForm.errors.lastName
                )}
                helperText={
                  userCreateForm.touched.lastName &&
                  userCreateForm.errors.lastName
                }
                value={userCreateForm.values.lastName}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              {" "}
              <Typography variant="h6"> Contact </Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <TextField
                label="Email Address"
                name="email"
                fullWidth
                sx={{ mb: 2, mt: 3 }}
                onBlur={userCreateForm.handleBlur}
                onChange={userCreateForm.handleChange}
                error={Boolean(
                  userCreateForm.touched.email && userCreateForm.errors.email
                )}
                helperText={
                  userCreateForm.touched.email && userCreateForm.errors.email
                }
                value={userCreateForm.values.email}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">@</InputAdornment>
                  ),
                }}
              />

              <Box sx={{ mt: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      name="sendEmail"
                      color="primary"
                      edge="start"
                      checked={userCreateForm.values.sendEmail}
                      onBlur={userCreateForm.handleBlur}
                      onChange={userCreateForm.handleChange}
                      value={userCreateForm.values.sendEmail}
                    />
                  }
                  label="Send email on creation ?"
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              {" "}
              <Typography variant="h6"> Security </Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Password"
                  name="password"
                  fullWidth
                  type={valuesForm.showPassword ? "text" : "password"}
                  onBlur={userCreateForm.handleBlur}
                  onChange={userCreateForm.handleChange}
                  error={Boolean(
                    userCreateForm.touched.password &&
                      userCreateForm.errors.password
                  )}
                  helperText={
                    userCreateForm.touched.password &&
                    userCreateForm.errors.password
                  }
                  value={userCreateForm.values.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {valuesForm.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  variant="contained"
                  size="large"
                  onClick={() => {
                    const secret = crypto
                      .getRandomValues(new BigUint64Array(1))[0]
                      .toString(36);
                    userCreateForm.setFieldValue("password", secret);
                  }}
                >
                  Generate
                </Button>
              </Stack>
              <TextField
                label="Permission Level"
                name="role"
                fullWidth
                sx={{ mt: 3 }}
                select
                onBlur={userCreateForm.handleBlur}
                onChange={userCreateForm.handleChange}
                error={Boolean(
                  userCreateForm.touched.role && userCreateForm.errors.role
                )}
                value={userCreateForm.values.role}
              >
                {userRoleOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          mx: -1,
          mb: -1,
          mt: 3,
        }}
      >
        <Button
          onClick={() => {
            router.push("/app/users");
          }}
          sx={{ m: 1, ml: "auto" }}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          sx={{ m: 1 }}
          type="submit"
          disabled={userCreateForm.isSubmitting}
          variant="contained"
        >
          Create
        </Button>
      </Box>
    </form>
  );
};
