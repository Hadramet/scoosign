import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { Container } from "@mui/system";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useMounted } from "@/hooks/use-mounted";
import { useEffect, useState } from "react";
const { AppLayout } = require("@/components/app/app-layout");
const { AuthGuard } = require("@/components/authentication/auth-guard");
const { RoleGuard } = require("@/components/authentication/role-guard");
import { Plus as PlusIcon } from "@/components/icons";
import { Groups, RemoveCircleOutline } from "@mui/icons-material";
import { AddGroupDialog } from "@/components/app/add-group-dialog";
import { AddStudentDialog } from "@/components/app/add-student-dialog";
import useSWR from "swr";
import { useRouter } from "next/router";
const { default: Head } = require("next/head");

const CreateCourseForm = (props) => {
  const isMounted = useMounted();
  const router = useRouter();
  const accessToken = globalThis.localStorage.getItem("accessToken");
  const { data: availableParent, error } = useSWR([
    `/api/v1/groups?limit=20`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "X-Scoosign-Authorization": `Bearer ${accessToken}`,
      },
    },
  ]);
  const { data: teachers, error: teachersError } = useSWR([
    `/api/v1/teachers?limit=50`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "X-Scoosign-Authorization": `Bearer ${accessToken}`,
      },
    },
  ]);

  const [subGroups, setGroups] = useState([]);
  const [addGroupDialog, setAddGroupDialog] = useState({
    isOpen: false,
    eventId: undefined,
    range: undefined,
  });

  useEffect(() => {
    if (isMounted) {
    }
  }, [isMounted]);
  useEffect(() => {
    form.setFieldValue("subGroups", subGroups, true);
  }, [subGroups, form]);

  const addGroupHandler = (event) => {
    event.preventDefault();
    setAddGroupDialog({
      isOpen: true,
    });
  };
  const handleCloseAddGroupDialog = () => {
    setAddGroupDialog({
      isOpen: false,
    });
  };
  const handleGroupResult = (groups) => {
    setGroups((prevGroups) => [...prevGroups, ...groups]);
  };
  const removeItem = (id) => {
    setGroups((prev) => prev.filter((g) => g._id !== id));
  };

  const onRemoveAll = () => {
    setGroups([]);
  };
  const form = useFormik({
    initialValues: {
      name: "",
      description: "",
      subGroups: [],
      start: Date.now(),
      end: Date.now(),
      teacher: "",
      classRoom: "",
      allDay: false,
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Name is required"),
      allDay: Yup.bool(),
      description: Yup.string().max(5000),
      classRoom: Yup.string().max(255),
      subGroups: Yup.array()
        .min(1, "You must have at least 1 group")
        .required("Please provide at least one group"),
      start: Yup.date().required("Please provide a start date"),
      teacher: Yup.string().required("Please provide a teacher"),
      end: Yup.date().required("Please provide a end date"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const body = {
          name: values.name,
          description: values.description,
          start: new Date(values.start.getTime()).toISOString(),
          end: new Date(values.end.getTime()).toISOString(),
          teacher: values.teacher,
          allDay: values.allDay,
          classRoom: values.classRoom,
          groups: values.subGroups.map((g) => g._id),
        };

        await fetch("/api/v1/courses", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            "X-Scoosign-Authorization": `Bearer ${accessToken}`,
          },
          body: JSON.stringify(body),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              toast.success("Successfully created");
              router.push("/app/courses");
            } else toast.error(data.message || "Something went wrong");
          })
          .catch((err) => toast.err(err.message || "Something went wrong"));
      } catch (error) {
        console.error(err);
        toast.error("Something went wrong!");
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });
  const handleStartDateChange = (date) => {
    form.setFieldValue("start", date);
    console.log(date);
    // Prevent end date to be before start date
    if (form.values.end && date && date > form.values.end) {
      form.setFieldValue("end", date);
    }
  };

  const handleEndDateChange = (date) => {
    form.setFieldValue("end", date);

    console.log(date);
    // Prevent start date to be after end date
    if (form.values.start && date && date < form.values.start) {
      form.setFieldValue("start", date);
    }
  };

  return (
    <form onSubmit={form.handleSubmit} {...props}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Details</Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <TextField
                error={Boolean(form.touched.name && form.errors.name)}
                fullWidth
                helperText={form.touched.name && form.errors.name}
                label="Group Name"
                name="name"
                onBlur={form.handleBlur}
                onChange={form.handleChange}
                value={form.values.name}
              />
              <TextField
                error={Boolean(
                  form.touched.description && form.errors.description
                )}
                fullWidth
                helperText={form.touched.description && form.errors.description}
                label="Description"
                name="description"
                sx={{ mb: 2, mt: 3 }}
                onBlur={form.handleBlur}
                onChange={form.handleChange}
                value={form.values.description}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Time</Typography>
              <Typography color="textSecondary" variant="body2" sx={{ mt: 1 }}>
                {"Set the start end end date , or all day"}
              </Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Box sx={{ mt: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={form.values.allDay}
                      name="allDay"
                      onChange={form.handleChange}
                    />
                  }
                  label="All day"
                />
              </Box>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box sx={{ mt: 2 }}>
                  <DateTimePicker
                    label="Start date"
                    key="start"
                    onChange={handleStartDateChange}
                    renderInput={(inputProps) => (
                      <TextField fullWidth {...inputProps} />
                    )}
                    value={form.values.start}
                  />
                </Box>
                {Boolean(form.touched.start && form.errors.start) && (
                  <Box sx={{ mt: 2 }}>
                    <FormHelperText error>{form.errors.start}</FormHelperText>
                  </Box>
                )}
                <Box sx={{ mt: 2 }}>
                  <DateTimePicker
                    label="End date"
                    key="end"
                    onChange={handleEndDateChange}
                    renderInput={(inputProps) => (
                      <TextField fullWidth {...inputProps} />
                    )}
                    value={form.values.end}
                  />
                </Box>
                {Boolean(form.touched.end && form.errors.end) && (
                  <Box sx={{ mt: 2 }}>
                    <FormHelperText error>{form.errors.end}</FormHelperText>
                  </Box>
                )}
              </LocalizationProvider>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Class</Typography>
              <Typography color="textSecondary" variant="body2" sx={{ mt: 1 }}>
                {"Select the teacher and class room"}
              </Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <TextField
                label="Teacher"
                name="teacher"
                fullWidth
                sx={{ mt: 3 }}
                select
                onBlur={form.handleBlur}
                onChange={form.handleChange}
                error={Boolean(form.touched.teacher && form.errors.teacher)}
                value={form.values.teacher}
              >
                {teachers &&
                  teachers.data.itemsList.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                      {option.user.firstName + " " + option.user.lastName}
                    </MenuItem>
                  ))}
              </TextField>
              <TextField
                error={Boolean(form.touched.classRoom && form.errors.classRoom)}
                fullWidth
                sx={{ mt: 3 }}
                helperText={form.touched.classRoom && form.errors.classRoom}
                label="Class Room"
                name="classRoom"
                onBlur={form.handleBlur}
                onChange={form.handleChange}
                value={form.values.classRoom}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Groups</Typography>
              <Typography color="textSecondary" variant="body2" sx={{ mt: 1 }}>
                {"Select group of students"}
              </Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Button
                fullWidth
                color={
                  Boolean(form.touched.subGroups && form.errors.subGroups)
                    ? "error"
                    : "primary"
                }
                onClick={addGroupHandler}
                startIcon={<PlusIcon fontSize="small" />}
                variant="contained"
              >
                Add Group
              </Button>
              {form.values.subGroups.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <List>
                    {form.values.subGroups.map((subGroup) => (
                      <ListItem
                        key={subGroup.id}
                        sx={{
                          border: 1,
                          borderColor: "divider",
                          borderRadius: 1,
                          "& + &": { mt: 1 },
                        }}
                      >
                        <ListItemIcon>
                          <Groups fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={subGroup.name}
                          primaryTypographyProps={{
                            color: "textPrimary",
                            variant: "subtitle2",
                          }}
                        />
                        <Tooltip title="Remove">
                          <IconButton
                            color="error"
                            onClick={(e) => removeItem(subGroup._id)}
                            edge="end"
                          >
                            <RemoveCircleOutline fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </ListItem>
                    ))}
                  </List>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      mt: 2,
                    }}
                  >
                    <Button onClick={onRemoveAll} size="small" type="button">
                      Remove All
                    </Button>
                  </Box>
                </Box>
              )}

              {Boolean(form.touched.subGroups && form.errors.subGroups) && (
                <Box sx={{ mt: 2 }}>
                  <FormHelperText error>{form.errors.subGroups}</FormHelperText>
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>

        <AddGroupDialog
          open={addGroupDialog.isOpen}
          onClose={handleCloseAddGroupDialog}
          handleGroupResult={handleGroupResult}
        />
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
          href="/app/courses"
          passHref
          sx={{ m: 1, ml: "auto" }}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button sx={{ m: 1 }} type="submit" variant="contained">
          Create
        </Button>
      </Box>
    </form>
  );
};
const CourseCreate = () => {
  return (
    <>
      <Head>
        <title>App : Course create | ScooSign</title>
      </Head>

      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="md">
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4"> Create a new course </Typography>
            <Breadcrumbs separator="/" sx={{ mt: 1 }}>
              <NextLink href="/app" passHref>
                <Link variant="subtitle2">Dashboard</Link>
              </NextLink>
              <NextLink href="/app/courses" passHref>
                <Link color="primary" variant="subtitle2">
                  School
                </Link>
              </NextLink>
              <Typography color="textSecondary" variant="subtitle2">
                Courses
              </Typography>
            </Breadcrumbs>
          </Box>
          <CreateCourseForm />
        </Container>
      </Box>
    </>
  );
};

CourseCreate.getLayout = (page) => (
  <AuthGuard>
    <RoleGuard permissions={["admin", "academic"]}>
      <AppLayout>{page}</AppLayout>
    </RoleGuard>
  </AuthGuard>
);

export default CourseCreate;
