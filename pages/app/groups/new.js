import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
  FormHelperText,
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
import { QuillEditor } from "@/components/quill-editor";
import { PropertyListItem } from "@/components/property-list-items";
import { useMounted } from "@/hooks/use-mounted";
import { useEffect, useState } from "react";
import { getRandomGroups } from "@/faker/fakeDatas";

const { AppLayout } = require("@/components/app/app-layout");
const { AuthGuard } = require("@/components/authentication/auth-guard");
const { RoleGuard } = require("@/components/authentication/role-guard");
import { Plus as PlusIcon } from "@/components/icons";
import { Groups, RemoveCircleOutline } from "@mui/icons-material";
import { AddGroupDialog } from "@/components/app/add-group-dialog";
const { default: Head } = require("next/head");

const CreateGroupForm = (props) => {
  const isMounted = useMounted();
  const [availableParent, setAvailableParent] = useState([]);
  const [subGroups, setGroups] = useState([]);
  const [addGroupDialog, setAddGroupDialog] = useState({
    isOpen: false,
    eventId: undefined,
    range: undefined,
  });

  useEffect(() => {
    if (isMounted) getAvailableParent();
  }, [isMounted]);

  useEffect(() => {
    form.setFieldValue("subGroups", subGroups, true);
  }, [subGroups]);
  // Fetch available parent from api
  const getAvailableParent = async () => {
    const response = await new Promise((resolve) =>
      resolve(getRandomGroups(50))
    );
    console.log("[LOAD AVAILABLE PARENT]", response);
    setAvailableParent(response);
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

  const handleGroupResult = (groups) => {
    setGroups((prevGroups) => [...prevGroups, ...groups]);
  };

  const removeItem = (id) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
  };

  const onRemoveAll = () => {
    setGroups([]);
  };
  const form = useFormik({
    initialValues: {
      name: "",
      description: "",
      parentId: "",
      isSubGroup: false,
      subGroups: [],
      students: [],
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required(),
      description: Yup.string().max(5000),
      parentId: Yup.string()
        .max(255)
        .when("isSubGroup", {
          is: true,
          then: Yup.string().required(
            "Parent is required, if its is a sub group"
          ),
        }),
      isSubGroup: Yup.bool(),
      subGroups: Yup.array().of(
        Yup.object({
          id: Yup.string().max(255).required(),
          name: Yup.string().max(255),
        })
      ),
      students: Yup.array().of(
        Yup.object({
          id: Yup.string().max(255).required(),
          name: Yup.string().max(255),
        })
      ),
    }),
    onSubmit: async (values, helpers) => {
      try {
        console.log(values);
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
              <Typography
                color="textSecondary"
                sx={{
                  mb: 2,
                  mt: 3,
                }}
                variant="subtitle2"
              >
                Description
              </Typography>
              <QuillEditor
                onChange={(value) => {
                  form.setFieldValue("description", value);
                }}
                placeholder="Write something"
                sx={{ height: 250 }}
                value={form.values.description}
              />
              {Boolean(form.touched.description && form.errors.description) && (
                <Box sx={{ mt: 2 }}>
                  <FormHelperText error>
                    {form.errors.description}
                  </FormHelperText>
                </Box>
              )}
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
                    name="parentId"
                    select
                    fullWidth
                    helperText={form.touched.parentId && form.errors.parentId}
                    onBlur={form.handleBlur}
                    onChange={form.handleChange}
                    error={Boolean(
                      form.touched.parentId && form.errors.parentId
                    )}
                    value={form.values.parentId}
                    SelectProps={{ native: true }}
                    sx={{
                      flexGrow: 1,
                      m: 1,
                      minWidth: 150,
                    }}
                  >
                    <option></option>
                    {availableParent &&
                      availableParent.map((parent) => (
                        <option key={parent.id} value={parent.id}>
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
                              onClick={(e) => removeItem(subGroup.id)}
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
