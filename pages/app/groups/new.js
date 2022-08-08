import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { Container } from "@mui/system";
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

const CreateGroupForm = (props) => {
  const isMounted = useMounted();
  const router = useRouter();
  const accessToken = globalThis.localStorage.getItem("accessToken");
  const { data: availableParent, error } = useSWR([
    `/api/v1/groups/list/available?limit=20`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "X-Scoosign-Authorization": `Bearer ${accessToken}`,
      },
    },
  ]);

  const [subGroups, setGroups] = useState([]);
  const [students, setStudents] = useState([]);

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

  useEffect(() => {
    if (isMounted) {
    }
  }, [isMounted]);
  useEffect(() => {
    form.setFieldValue("subGroups", subGroups, true);
  }, [subGroups, form]);
  useEffect(() => {
    form.setFieldValue("students", students, true);
  }, [students, form]);
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
  const handleGroupResult = (groups) => {
    setGroups((prevGroups) => [...prevGroups, ...groups]);
  };
  const removeItem = (id) => {
    setGroups((prev) => prev.filter((g) => g._id !== id));
  };
  const handleStudentsResult = (groups) => {
    setStudents((prevGroups) => [...prevGroups, ...groups]);
  };
  const removeStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s._id !== id));
  };
  const onRemoveAll = () => {
    setGroups([]);
  };
  const onRemoveAllStudents = () => {
    setStudents([]);
  };
  const form = useFormik({
    initialValues: {
      name: "",
      description: "",
      parent: "",
      isSubGroup: false,
      subGroups: [],
      students: [],
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required(),
      description: Yup.string().max(5000),
      parent: Yup.string()
        .max(255)
        .when("isSubGroup", {
          is: true,
          then: Yup.string().required(
            "Parent is required, if its is a sub group"
          ),
        }),
      isSubGroup: Yup.bool(),
      subGroups: Yup.array(),
      students: Yup.array(),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const sts = [];
        const sbg = [];

        values.subGroups.map((group) => sbg.push(group._id));
        values.students.map((student) => sts.push(student._id));

        const body = { ...values, students: sts, subGroups: sbg };
        console.log(body);
        await fetch("/api/v1/groups", {
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
              toast.success("Group successfully created");
              router.push("/app/groups");
            } else {
              toast.error(data.message);
            }
          })
          .catch((error) => {
            toast.error(err.message);
          });
      } catch (error) {
        console.error(err);
        toast.error("Something went wrong!");
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

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
              <Box sx={{ mt: 2, ml: 1 }}>
                <FormControlLabel
                  control={
                    <Switch
                      name="isSubGroup"
                      color="primary"
                      edge="start"
                      checked={form.values.isSubGroup}
                      onBlur={form.handleBlur}
                      onChange={form.handleChange}
                      value={form.values.isSubGroup}
                    />
                  }
                  label="Is this a sub-group ?"
                />
              </Box>
              {!form.values.isSubGroup ? (
                <></>
              ) : (
                <Box sx={{ mt: 2, ml: -1 }}>
                  <TextField
                    label="Parent"
                    margin="normal"
                    name="parent"
                    select
                    fullWidth
                    helperText={form.touched.parent && form.errors.parent}
                    onBlur={form.handleBlur}
                    onChange={form.handleChange}
                    error={Boolean(form.touched.parent && form.errors.parent)}
                    value={form.values.parent}
                    SelectProps={{ native: true }}
                    sx={{
                      flexGrow: 1,
                      m: 1,
                      minWidth: 150,
                    }}
                  >
                    <option></option>
                    {availableParent &&
                      availableParent.data.itemsList.map((parent) => (
                        <option key={parent._id} value={parent._id}>
                          {parent.name}
                        </option>
                      ))}
                  </TextField>
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {!form.values.isSubGroup && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={4} xs={12}>
                <Typography variant="h6">Sub groups</Typography>
                <Typography
                  color="textSecondary"
                  variant="body2"
                  sx={{ mt: 1 }}
                >
                  {"Optional - Select sub groups"}
                </Typography>
              </Grid>
              <Grid item md={8} xs={12}>
                <Button
                  fullWidth
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
              </Grid>
            </Grid>
          </CardContent>

          <AddGroupDialog
            open={addGroupDialog.isOpen}
            onClose={handleCloseAddGroupDialog}
            handleGroupResult={handleGroupResult}
          />
        </Card>
      )}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Typography variant="h6">Students</Typography>
              <Typography color="textSecondary" variant="body2" sx={{ mt: 1 }}>
                {
                  "If this group is a sub-group, you will only see students belonging to the parent group"
                }
              </Typography>
            </Grid>
            <Grid item md={8} xs={12}>
              <Button
                fullWidth
                onClick={addStudentHandler}
                startIcon={<PlusIcon fontSize="small" />}
                variant="contained"
              >
                Add students
              </Button>
              {form.values.students.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <List>
                    {form.values.students.map((student) => (
                      <ListItem
                        key={student._id}
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
                          primary={
                            student.user.firstName + " " + student.user.lastName
                          }
                          primaryTypographyProps={{
                            color: "textPrimary",
                            variant: "subtitle2",
                          }}
                          secondary={student.user.email}
                        />
                        <Tooltip title="Remove">
                          <IconButton
                            color="error"
                            onClick={(e) => removeStudent(student._id)}
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
                    <Button
                      onClick={onRemoveAllStudents}
                      size="small"
                      type="button"
                    >
                      Remove All
                    </Button>
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>

        <AddStudentDialog
          open={addStudentDialog.isOpen}
          onClose={handleCloseAddStudentDialog}
          handleResult={handleStudentsResult}
          groupParentId={form.values.parentId}
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
          href="/app/groups"
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

const CreateGroup = (props) => {
  return (
    <>
      <Head>
        <title>App : New Group | ScooSign</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4">Create new group</Typography>
            <Breadcrumbs separator="/" sx={{ mt: 1 }}>
              <NextLink href="/app" passHref>
                <Link color="primary" variant="subtitle2">
                  Dashboard
                </Link>
              </NextLink>
              <NextLink href="/app/groups" passHref>
                <Link color="primary" variant="subtitle2">
                  Groups
                </Link>
              </NextLink>
              <Typography color="textSecondary" variant="subtitle2">
                New Group
              </Typography>
            </Breadcrumbs>
          </Box>
          <CreateGroupForm />
        </Container>
      </Box>
    </>
  );
};

CreateGroup.getLayout = (page) => (
  <AuthGuard>
    <RoleGuard permissions={["admin", "academic"]}>
      <AppLayout>{page}</AppLayout>
    </RoleGuard>
  </AuthGuard>
);

export default CreateGroup;
