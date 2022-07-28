import {
    Avatar,
  Button,
  Card,
  CardHeader,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
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
} from "@mui/icons-material";
import {
  Plus as PlusIcon,
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
  id: "1sqfs",
  name: "Asociate of science 1",
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
    id: "1sqfs",
    name: "Asociate of science 1",
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
    id: "1sqfs",
    name: "Asociate of science 1",
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
    id: "1sqfs",
    name: "Asociate of science 1",
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
          <Typography color="textSecondary" variant="body2">
            {group.description}
          </Typography>
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
  const { subGroups, ...other } = props;

  return (
    <Card {...other}>
      <CardHeader
        title="Sub Groups"
        action={
          <Button startIcon={<PlusIcon fontSize="small" />} variant="contained">
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
              {subGroups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell>
                    <Typography variant="subtitle2">{group.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {group.students.length}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton component="a">
                      <DeleteOutline fontSize="small" />
                    </IconButton>
                    <NextLink href={`/app/groups/${group.id}`} passHref>
                      <IconButton component="a">
                        <ArrowRightIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
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
  const { students, ...other } = props;
  return (
    <Card {...other}>
      <CardHeader
        title="Students"
        action={
          <Button startIcon={<PlusIcon fontSize="small" />} variant="contained">
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
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                  <Avatar
                  sx={{
                    height: 32,
                    width: 32,
                  }}
                >
                  {getInitials(student?.firstName + " " + student?.lastName)}
                </Avatar>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {student.firstName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {student.lastName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{student.email}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton component="a">
                      <DeleteOutline fontSize="small" />
                    </IconButton>
                    <NextLink
                      disabled
                      href={`/app/student/${student.id}`}
                      passHref
                    >
                      <IconButton component="a">
                        <ArrowRightIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
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
    id: "1sqfs",
    name: "Asociate of science 1",
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
    id: "1sqfs",
    name: "Asociate of science 1",
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
    id: "1sqdsfqdsqfs",
    firstName: "John ",
    lastName: "Doe",
    email: "jogn.doe@scoosign.com",
  },
  {
    id: "1sqddssfqdsqfs",
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

const GroupDetails = (props) => {
  const [currentTab, setCurrentTab] = useState("details");
  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
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
                <Button
                  endIcon={<PencilAltIcon fontSize="small" />}
                  variant="outlined"
                  sx={{ ml: 2 }}
                >
                  Edit
                </Button>
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
                <Grid item xs={12}>
                  <GroupSubGroupItems subGroups={groupChild} />
                </Grid>
                <Grid item xs={12}>
                  {group.students.length > 0 && (
                    <GroupStudentItems students={studentList} />
                  )}
                </Grid>
              </Grid>
            )}
          </Box>
        </Container>
      </Box>
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
