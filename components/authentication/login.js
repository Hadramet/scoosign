import {
  Alert,
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useAuth } from "../../hooks/use-auth";
import { useMounted } from "../../hooks/use-mounted";

export const JWTLogin = (props) => {
  const router = useRouter();
  const isMounted = useMounted();
  const { login } = useAuth();

  const loginForm = useFormik({
    initialValues: {
      email: "admin@scoosign.com",
      password: "Supinf0?",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await login(values.email, values.password);
        if (isMounted()) {
          const returnUrl = router.query.returnUrl || "/app";
          router.push(returnUrl).catch(console.error);
        }
      } catch (error) {
        console.error("[Login comp]", error.message);
        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: error.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  return (
    <form noValidate onSubmit={loginForm.handleSubmit} {...props}>
      <TextField
        autoFocus
        error={Boolean(loginForm.touched.email && loginForm.errors.email)}
        fullWidth
        helperText={loginForm.touched.email && loginForm.errors.email}
        label="Email Address"
        name="email"
        onBlur={loginForm.handleBlur}
        onChange={loginForm.handleChange}
        type="email"
        value={loginForm.values.email}
        margin="normal"
      />
      <TextField
        autoFocus
        error={Boolean(loginForm.touched.password && loginForm.errors.password)}
        fullWidth
        helperText={loginForm.touched.password && loginForm.errors.password}
        label="Password"
        name="password"
        onBlur={loginForm.handleBlur}
        onChange={loginForm.handleChange}
        type="password"
        value={loginForm.values.password}
        margin="normal"
      />

      {loginForm.errors.submit && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>{loginForm.errors.submit}</FormHelperText>
        </Box>
      )}

      <Box sx={{ mt: 2 }}>
        <Button
          disabled={loginForm.isSubmitting}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Log In
        </Button>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Alert severity="info">
          <Typography variant="caption">
            <div>
              {" "}
              <b>Admin :</b> Use <b>admin@scoosign.com</b> and password{" "}
              <b>Supinf0?</b>{" "}
            </div>
            <div>
              {" "}
              <b>Academic :</b> Use <b>aca@scoosign.com</b> and password{" "}
              <b>Supinf1?</b>{" "}
            </div>
            <div>
              {" "}
              <b>Student :</b> Use <b>student@scoosign.com</b> and password{" "}
              <b>Supinf2?</b>{" "}
            </div>
            <div>
              {" "}
              <b>Teacher :</b> Use <b>teach.math@scoosign.com</b> and password{" "}
              <b>Supinf0?</b>{" "}
            </div>
            <div>
              {" "}
              <b>Parent :</b> Use <b>momanddad@scoosign.com</b> and password{" "}
              <b>Supinf4?</b>{" "}
            </div>
          </Typography>
        </Alert>
      </Box>
    </form>
  );
};
