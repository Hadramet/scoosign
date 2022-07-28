import {
    Alert, Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader, Divider,
    Grid,
    InputAdornment, MenuItem,
    Switch,
    TextField,
    Typography
} from "@mui/material";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { deleteUserApi, updateUserApi } from "../../../lib/user-api";
import { userRoleOptions } from "../../../lib/user-options-and-tabs";

export const UserEditForm = (props) => {
    const { user, ...other } = props;
    const router = useRouter();
    const { query } = router;
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
                const body = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    role: values.type,
                    active: values.active,
                };

                const userId = query.userId;
                const response = await updateUserApi(userId, body);
                if (response.ok) {
                    const resJson = await response.json();
                    if (resJson.success) {
                        toast.success("User successfully updated");
                        router.push("/app/users");
                    } else {
                        if (resJson.failed === "email") {
                            helpers.setStatus({ success: false });
                            setAlertState({
                                showAlert: true,
                                messageAlert: "There are some information's that you need to check",
                            });
                            helpers.setErrors({ email: resJson.message });
                            helpers.setSubmitting(false);
                        } else {
                            throw new Error("Something went wrong");
                        }
                    }
                }
            } catch (err) {
                console.error(err);
                toast.error("Something went wrong!");
                setAlertState({
                    showAlert: true,
                    messageAlert: err.message,
                });
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        },
    });

    useEffect(() => {
        router.prefetch("/app/users/" + user.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const userId = query.userId;
            const response = await deleteUserApi(userId);
            if (response.ok) {
                const resJson = await response.json();
                if (resJson.success) {
                    toast.success("User successfully deleted");
                    router.push("/app/users");
                } else {
                    throw new Error(resJson.message);
                }
            } else {
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };
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
                                helperText={userEditForm.touched.firstName &&
                                    userEditForm.errors.firstName}
                                label="First name"
                                name="firstName"
                                onBlur={userEditForm.handleBlur}
                                onChange={userEditForm.handleChange}
                                required
                                value={userEditForm.values.firstName} />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                error={Boolean(
                                    userEditForm.touched.lastName && userEditForm.errors.lastName
                                )}
                                fullWidth
                                helperText={userEditForm.touched.lastName && userEditForm.errors.lastName}
                                label="Last name"
                                name="lastName"
                                onBlur={userEditForm.handleBlur}
                                onChange={userEditForm.handleChange}
                                required
                                value={userEditForm.values.lastName} />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                error={Boolean(
                                    userEditForm.touched.email && userEditForm.errors.email
                                )}
                                fullWidth
                                helperText={userEditForm.touched.email && userEditForm.errors.email}
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
                                }} />
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
                            value={userEditForm.values.active} />
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
                    <Button
                        onClick={(e) => handleDelete(e)}
                        color="error"
                        disabled={userEditForm.isSubmitting}
                    >
                        Delete user
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
};
