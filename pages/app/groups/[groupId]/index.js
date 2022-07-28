import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  Container,
  Dialog,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import NextLink from "next/link";
import { AppLayout } from "../../../../components/app/app-layout";
import { AuthGuard } from "../../../../components/authentication/auth-guard";
import { RoleGuard } from "../../../../components/authentication/role-guard";
import {
  ArrowBack as ArrowBackIcon,
  DeleteOutline,
  Lock,
  LockOpen,
} from "@mui/icons-material";
import {
  Plus as PlusIcon,
  Search as SearchIcon,
  PencilAlt as PencilAltIcon,
  ChevronDown as ChevronDownIcon,
} from "../../../../components/icons";
import { useState } from "react";
import { PropertyList } from "../../../../components/property-list";
import { PropertyListItem } from "../../../../components/property-list-items";
import { Scrollbar } from "../../../../components/custom";
import {
  ChevronRight as ChevronRightIcon,
  ArrowRight as ArrowRightIcon,
} from "../../../../components/icons";
import { getInitials } from "../../../../lib/get-initials";

const group = {
  id: "1sqdsqfdq8845fs",
  name: "Asociate of science 77",
  description: "First class of 5 year program",
  students: ["ddd"],
  root_groups: null,
  child_count: 3,
  created_by: "Kurk Cobain",
  created_at: "2020-01-20T15:22:20.000Z",
  last_update: "2020-01-20T15:22:20.000Z",
  locked: false,
  locked_by: "Kurk Cobain",
  locked_at: "2020-01-20T15:22:20.000Z",
};

const groupChild = [
  {
    id: "1sqf8g4e46ds46dqfqs",
    name: "Asociate of science 66",
    description: "First class of 5 year program",
    students: [],
    root_groups: null,
    child_count: 5,
    created_by: "Kurk Cobain",
    created_at: "2020-01-20T15:22:20.000Z",
    last_update: "2020-01-20T15:22:20.000Z",
    locked: false,
  },
  {
    id: "1sq2156v1b56fhrrzrerearefs",
    name: "Asociate of science 19",
    description: "First class of 5 year program",
    students: [],
    root_groups: null,
    child_count: 5,
    created_by: "Kurk Cobain",
    created_at: "2020-01-20T15:22:20.000Z",
    last_update: "2020-01-20T15:22:20.000Z",
    locked: false,
  },
  {
    id: "1sqfhareaare84h61123fdsq3f1axcvs",
    name: "Asociate of science 8",
    description: "First class of 5 year program",
    students: ["dddd"],
    root_groups: null,
    child_count: 5,
    created_by: "Kurk Cobain",
    created_at: "2020-01-20T15:22:20.000Z",
    last_update: "2020-01-20T15:22:20.000Z",
    locked: false,
  },
];

const GroupBasicDetails = (props) => {
  const { group, ...other } = props;
  const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const align = smDown ? "vertical" : "horizontal";
  const [parent, setParent] = useState(null);

  const handleChange = (event) => {
    setParent(event.target.value);
  };

  return (
    <Card {...other}>
      <CardHeader title="Basic info" />
      <Divider />
      <PropertyList>
        <PropertyListItem align={align} label="Description">
          <Box
            sx={{
              display: "flex",
              mt: 3,
              alignItems: "center",
            }}
          >
            <TextField
              defaultValue={group.description}
              label="Description"
              size="small"
              sx={{
                flexGrow: 1,
                mr: 3,
              }}
            />
            <Button>Save</Button>
          </Box>
        </PropertyListItem>
        <Divider />
        <PropertyListItem
          align={align}
          label="Created By"
          value={group.created_by}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Created At"
          value={group.created_at}
        />
        <Divider />
        {group.locked && (
          <>
            <PropertyListItem
              align={align}
              label="Locked By"
              value={group.locked_by}
            />
            <Divider />
            <PropertyListItem
              align={align}
              label="Locked At"
              value={group.locked_at}
            />
            <Divider />
          </>
        )}
        <PropertyListItem align={align} label="Set Parent">
          <Box
            sx={{
              alignItems: {
                sm: "center",
              },
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              mx: -1,
            }}
          >
            <TextField
              label="Parent"
              margin="normal"
              name="parent"
              disabled={() => group.child_count >> 0 || group.locked}
              select
              onChange={handleChange}
              SelectProps={{ native: true }}
              sx={{
                flexGrow: 1,
                m: 1,
                minWidth: 150,
              }}
              value={parent}
            >
              {parentList.map((parent) => (
                <option key={parent.id} value={parent.id}>
                  {parent.name}
                </option>
              ))}
            </TextField>
            <Button
              disabled={() => group.child_count >> 0 || group.locked}
              sx={{ m: 1 }}
              variant="contained"
            >
              Save
            </Button>
            <Button
              disabled={() => group.child_count >> 0 || group.locked}
              sx={{ m: 1 }}
            >
              Cancel
            </Button>
          </Box>
        </PropertyListItem>
      </PropertyList>
    </Card>
  );
};
const GroupSubGroupItems = (props) => {
  const {
    subGroups,
    canBrowseToGroup,
    addGroupHandler,
    removeGroupHandler,
    ...other
  } = props;

  return (
    <Card {...other}>
      <CardHeader
        title="Sub Groups"
        action={
          <Button
            onClick={addGroupHandler}
            startIcon={<PlusIcon fontSize="small" />}
            variant="contained"
          >
            Add Group
          </Button>
        }
      />
      <Divider />
      <Scrollbar>
        <Box sx={{ minWidth: 700 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Number Of Student</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subGroups.map((groupItem) => (
                <TableRow key={groupItem.id}>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {groupItem.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {groupItem.students.length}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={(e) => removeGroupHandler(e, groupItem.id)}
                      component="a"
                    >
                      <DeleteOutline fontSize="small" />
                    </IconButton>
                    {canBrowseToGroup && (
                      <NextLink href={`/app/groups/${groupItem.id}`} passHref>
                        <IconButton component="a">
                          <ArrowRightIcon fontSize="small" />
                        </IconButton>
                      </NextLink>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={group.length}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
        page={0}
        rowsPerPage={5}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
const GroupStudentItems = (props) => {
  const {
    students,
    canBrowseToStudent,
    addStudentHandler,
    removeStudentHandler,
    ...other
  } = props;
  return (
    <Card {...other}>
      <CardHeader
        title="Students"
        action={
          <Button
            onClick={addStudentHandler}
            startIcon={<PlusIcon fontSize="small" />}
            variant="contained"
          >
            Add Student
          </Button>
        }
      />
      <Divider />
      <Scrollbar>
        <Box sx={{ minWidth: 700 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Fist Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((studentItem) => (
                <TableRow key={studentItem.id}>
                  <TableCell>
                    <Avatar
                      sx={{
                        height: 32,
                        width: 32,
                      }}
                    >
                      {getInitials(
                        studentItem?.firstName + " " + studentItem?.lastName
                      )}
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {studentItem.firstName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {studentItem.lastName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {studentItem.email}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={(e) => removeStudentHandler(e, studentItem.id)}
                      component="a"
                    >
                      <DeleteOutline fontSize="small" />
                    </IconButton>
                    {canBrowseToStudent && (
                      <NextLink
                        disabled
                        href={`/app/student/${studentItem.id}`}
                        passHref
                      >
                        <IconButton component="a">
                          <ArrowRightIcon fontSize="small" />
                        </IconButton>
                      </NextLink>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={group.length}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
        page={0}
        rowsPerPage={5}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
const parentList = [
  {
    id: "1sqaezat5456q1a1erezafs",
    name: "Asociate of science 2",
    description: "First class of 5 year program",
    students: ["dddd"],
    root_groups: null,
    child_count: 5,
    created_by: "Kurk Cobain",
    created_at: "2020-01-20T15:22:20.000Z",
    last_update: "2020-01-20T15:22:20.000Z",
    locked: false,
  },
  {
    id: "1ae9t64613ay4teza5qfs",
    name: "Asociate of science 3",
    description: "First class of 5 year program",
    students: ["dddd"],
    root_groups: null,
    child_count: 5,
    created_by: "Kurk Cobain",
    created_at: "2020-01-20T15:22:20.000Z",
    last_update: "2020-01-20T15:22:20.000Z",
    locked: false,
  },
];

const studentList = [
  {
    id: "1sqdsfqat949az4e613adsqfs",
    firstName: "John ",
    lastName: "Doe",
    email: "jogn.doe@scoosign.com",
  },
  {
    id: "1sqddsa6ez46e1313gassfqdsqfs",
    firstName: "Kurk ",
    lastName: "Cobain",
    email: "kurk.cobain@scoosign.com",
  },
];

const groupDetailsTabs = [
  { label: "Details", value: "details", disabled: false },
  { label: "Courses", value: "courses", disabled: true },
  { label: "Calendar", value: "calendar", disabled: true },
];

// TODO: get group fixture
// TODO: get sub-group
// TODO: get students
// TODO: Remove group parent

const AddStudentDialog = (props) => {
  const { open, onClose } = props;
  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={!!open}>
      <form>
        <Card>
          <CardContent>
            <div>
              <Typography variant="h6">Add Students</Typography>
              <Typography color="textSecondary" variant="body2" sx={{ mt: 1 }}>
                Click on the students checkbox and save your selection.
              </Typography>
            </div>
            <Divider
              sx={{
                mt: 3,
                mb: 3,
              }}
            />
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
              }}
              sx={{ flexGrow: 1 }}
            >
              <TextField
                defaultValue=""
                fullWidth
                disabled
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                placeholder="Search students"
              />
            </Box>
          </CardContent>
          <Scrollbar>
            <Table sx={{ minWidth: 400 }}>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentList.map((student) => (
                  <TableRow hover key={student.id}>
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ alignItems: "center", display: "flex" }}>
                        <Avatar sx={{ height: 32, width: 32, mr: 1 }}>
                          {getInitials(
                            student.firstName + " " + student.lastName
                          )}
                        </Avatar>
                        <div>
                          <Typography variant="subtitle2">
                            {student.firstName + " " + student.lastName}
                          </Typography>
                          <Typography color="textSecondary" variant="body2">
                            {student.email}
                          </Typography>
                        </div>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
          <TablePagination
            component="div"
            count={group.length}
            onPageChange={() => {}}
            onRowsPerPageChange={() => {}}
            page={0}
            rowsPerPage={5}
            rowsPerPageOptions={[5, 10, 25]}
          />
          <Divider />
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              p: 2,
            }}
          >
            <Box sx={{ flexGrow: 1 }} />
            <Button onClick={onClose}>Cancel</Button>
            <Button sx={{ ml: 1 }} type="submit" variant="contained">
              Confirm
            </Button>
          </Box>
        </Card>
      </form>
    </Dialog>
  );
};

const AddGroupDialog = (props) => {
  const { open, onClose } = props;
  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={!!open}>
      <form>
        <Card>
          <CardContent>
            <div>
              <Typography variant="h6">Add Groups</Typography>
              <Typography color="textSecondary" variant="body2" sx={{ mt: 1 }}>
                Click on the group and save your selections.
              </Typography>
            </div>
            <Divider
              sx={{
                mt: 3,
                mb: 3,
              }}
            />
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
              }}
              sx={{ flexGrow: 1 }}
            >
              <TextField
                defaultValue=""
                fullWidth
                disabled
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                placeholder="Search groups"
              />
            </Box>
          </CardContent>
          <Scrollbar>
            <Table sx={{ minWidth: 400 }} size="small">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groupChild.map((group) => (
                  <TableRow hover key={group.id}>
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{group.name}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
          <TablePagination
            component="div"
            count={group.length}
            onPageChange={() => {}}
            onRowsPerPageChange={() => {}}
            page={0}
            rowsPerPage={5}
            rowsPerPageOptions={[5, 10, 25]}
          />
          <Divider />
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              p: 2,
            }}
          >
            <Box sx={{ flexGrow: 1 }} />
            <Button onClick={onClose}>Cancel</Button>
            <Button sx={{ ml: 1 }} type="submit" variant="contained">
              Confirm
            </Button>
          </Box>
        </Card>
      </form>
    </Dialog>
  );
};

const GroupDetails = (props) => {
  const [currentTab, setCurrentTab] = useState("details");
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

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const addStudentHandler = (event) => {
    event.preventDefault();
    console.log("TODO : add student handle");
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
    console.log("TODO : remove studend id: " + studentId);
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

  const removeGroupHandler = (event, groupId) => {
    event.preventDefault();
    console.log("TODO : remove group id: " + groupId);
  };

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
                  {group.locked && (
                    <Lock color="textPrimary" fontSize="medium" />
                  )}{" "}
                  {group.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle2">Type :</Typography>
                  <Chip
                    label={group.child_count >> 0 ? "ROOT-GROUP" : "SUB-GROUP"}
                    color={group.child_count >> 0 ? "primary" : "secondary"}
                    size="small"
                    sx={{ ml: 1 }}
                  />
                </Box>
              </Grid>
              <Grid item sx={{ ml: -2 }}>
                {!group.locked && (
                  <Button
                    endIcon={<ChevronDownIcon fontSize="small" />}
                    sx={{ m: 1 }}
                    variant="contained"
                  >
                    Actions
                  </Button>
                )}
                {group.locked && (
                  <Button
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
                  <GroupBasicDetails group={group} />
                </Grid>
                {!group.locked && (
                  <Grid item xs={12}>
                    <GroupSubGroupItems
                      subGroups={groupChild}
                      canBrowseToGroup={false}
                      addGroupHandler={addGroupHandler}
                      removeGroupHandler={removeGroupHandler}
                    />
                  </Grid>
                )}
                {(group.students.length > 0) & !group.locked ? (
                  <Grid item xs={12}>
                    <GroupStudentItems
                      addStudentHandler={addStudentHandler}
                      removeStudentHandler={removeStudentHandler}
                      students={studentList}
                      canBrowseToStudent={false}
                    />
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
                          Describe the danger here.
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions sx={{ flewWrap: "wrap", m: -1 }}>
                      {!group.locked && (
                        <Button
                          sx={{ m: 1, mr: "auto" }}
                          color="error"
                          variant="contained"
                        >
                          Lock
                        </Button>
                      )}
                      <Button align="right" color="error">
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
        open={addStudentDialog.isOpen}
        onClose={handleCloseAddStudentDialog}
      />
      <AddGroupDialog
        open={addGroupDialog.isOpen}
        onClose={handleCloseAddGroupDialog}
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
