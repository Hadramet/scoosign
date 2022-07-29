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
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
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
import { useEffect, useState } from "react";
import { PropertyList } from "../../../../components/property-list";
import { PropertyListItem } from "../../../../components/property-list-items";
import { Scrollbar } from "../../../../components/custom";
import {
  ChevronRight as ChevronRightIcon,
  ArrowRight as ArrowRightIcon,
} from "../../../../components/icons";
import { getInitials } from "../../../../lib/get-initials";
import { useMounted } from "../../../../hooks/use-mounted";
import PropTypes from "prop-types";
import { FieldArray, useFormik } from "formik";
import * as Yup from "yup";

const groupFixture = {
  id: "1sqdsqfdq8845fs",
  name: "Asociate of science 77",
  description: "First class of 5 year program",
  students: ["ddd"],
  root_groups: null,
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
    id: "1sqfhareaare84h6e1123fdsq3f1axcvs",
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
  {
    id: "1sqfhareaare84h6a1123fdsq3f1axcvs",
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
  {
    id: "1sqfhareaare84th61123fdsq3f1axcvs",
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
  {
    id: "1sqfhareaare84h611z23fdsq3f1axcvs",
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
  {
    id: "1sqfhareaare84h611az23fdsq3f1axcvs",
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
  {
    id: "1sqfhareaare84h6r11z23fdsq3f1axcvs",
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
  {
    id: "1sqfhareaare84sh611z23fdsq3f1axcvs",
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
  {
    id: "1sqfharesaare84h611z23fdsq3f1a33xcvs",
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
  ,
  {
    id: "1sqfharesaare84h611z23fdsq113f1axcvs",
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
  ,
  {
    id: "1sqfharesaare84h611z23fdsq3f133axcvs",
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
  ,
  {
    id: "1sqfharesaare84h611z23fd44sq3f1axcvs",
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
  ,
  {
    id: "1sqfharesaare84h611z23fdsq3f1a66xcvs",
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
  ,
  {
    id: "1sqfharesaare84h611z23fdsq3f144axcvs",
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
  ,
  {
    id: "1sqfharesaare84h611z23fdsq3f166axcvs",
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
  ,
  {
    id: "1sqfharesaare84h611z23fdsq3f441axcvs",
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
  ,
  {
    id: "1sqfharesaare84h611z23fdsq3f5531axcvs",
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
  ,
  {
    id: "1sqfharesaare84h611z23fdsq3f551axcvs",
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
  ,
  {
    id: "1sqfharesaare84h611z23fdsq399f1axcvs",
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
  ,
  {
    id: "1sqfharesaare84h611z23fdsq773f1axcvs",
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
  ,
  {
    id: "1sqfharesaare84h611z2399fdsq3f1axcvs",
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
  ,
  {
    id: "1sqfharesaare84h611z893fdsq3f1axcvs",
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
  ,
  {
    id: "1sqfharesaare84h611z878723fdsq3f1axcvs",
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
  ,
  {
    id: "1sqfharesaare84h611z2873fdsq3f1axcvs",
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
  {
    id: "1sqddsa6ez46e13e13gassfqdsqfs",
    firstName: "Kurk a",
    lastName: "Cobain",
    email: "kurk.cobain@scoosign.com",
  },
  {
    id: "1sqddsa6ez46e131q3gassfqdsqfs",
    firstName: "Kurk ",
    lastName: "Cobain",
    email: "kurk.cobain@scoosign.com",
  },
  {
    id: "1sqddsa6ez46e1s313gassfqdsqfs",
    firstName: "Kurk ",
    lastName: "Cobain",
    email: "kurk.cobain@scoosign.com",
  },
  {
    id: "1sqddsa6ez46e1b313gassfqdsqfs",
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


const GroupBasicDetails = (props) => {
  const { group, setGroupInfosHandler, ...other } = props;
  const isMounted = useMounted();
  const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const align = smDown ? "vertical" : "horizontal";
  const [availableParent, setAvailableParent] = useState([]);

  useEffect(() => {
    if (isMounted) getAvailableParent();
  }, [isMounted]);

  // Fetch available parent from api
  const getAvailableParent = async () => {
    const response = await new Promise((resolve) => resolve(parentList));
    console.log("[LOAD AVAILABLE PARENT]", response);
    setAvailableParent(response);
  };

  const groupForms = useFormik({
    initialValues: {
      parent: group.root_groups || "",
      description: group.description,
    },
    validationSchema: Yup.object({
      parent: Yup.string(),
      description: Yup.string().max(255),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await setGroupInfosHandler(values);
      } catch (error) {
        console.error(error);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={groupForms.handleSubmit} {...other}>
      <Card>
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
                label="Description"
                name="description"
                onBlur={groupForms.handleBlur}
                onChange={groupForms.handleChange}
                error={Boolean(
                  groupForms.touched.description &&
                    groupForms.errors.description
                )}
                helperText={
                  groupForms.touched.description &&
                  groupForms.errors.description
                }
                value={groupForms.values.description}
                size="small"
                sx={{
                  flexGrow: 1,
                  mr: 3,
                }}
              />
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
          {group.locked ? (
            <></>
          ) : (
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
                  select
                  onBlur={groupForms.handleBlur}
                  onChange={groupForms.handleChange}
                  error={Boolean(
                    groupForms.touched.parent && groupForms.errors.parent
                  )}
                  value={groupForms.values.parent}
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
            </PropertyListItem>
          )}
        </PropertyList>
        <Divider />
        <CardActions>
          <Button
            sx={{ mr: -1, ml: "auto" }}
            type="submit"
            disabled={groupForms.isSubmitting}
            variant="contained"
          >
            Save
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
GroupBasicDetails.propTypes = {
  group: PropTypes.object,
  setGroupInfosHandler: PropTypes.func.isRequired,
};

const GroupSubGroupItems = (props) => {
  const {
    subGroups,
    canBrowseToGroup,
    addGroupHandler,
    removeGroupHandler,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    count,
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
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
GroupSubGroupItems.propTypes = {
  subGroups: PropTypes.array.isRequired,
  canBrowseToGroup: PropTypes.bool.isRequired,
  addGroupHandler: PropTypes.func.isRequired,
  removeGroupHandler: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};

const GroupStudentItems = (props) => {
  const {
    students,
    canBrowseToStudent,
    addStudentHandler,
    removeStudentHandler,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    count,
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
              {students &&
                students.map((studentItem) => (
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
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
GroupStudentItems.propTypes = {
  students: PropTypes.array.isRequired,
  canBrowseToStudent: PropTypes.bool.isRequired,
  addStudentHandler: PropTypes.func.isRequired,
  removeStudentHandler: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};

// TODO: get group fixture
// TODO: get sub-group
// TODO: get students
// TODO: Remove group parent

const AddStudentDialog = (props) => {
  const { open, onClose, ...other } = props;
  const [availableStudents, setAvailableStudents] = useState([]);
  useEffect(() => {
    if (open) {
      setAvailableStudents([]);
      form.resetForm();
      getAvailableStudents();
    }
  }, [open, form]);

  const getAvailableStudents = async () => {
    const response = await new Promise((resolve) => resolve(studentList));
    console.log("TODO get available students");
    setAvailableStudents(response);
  };
  const form = useFormik({
    initialValues: {
      studentsToAdd: [],
    },
    validationSchema: Yup.object({
      studentsToAdd: Yup.array(),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const value_to_add = [];
        values.studentsToAdd.map((o) => value_to_add.push({ id: o.id }));
        console.log(value_to_add);
        onClose();
      } catch (error) {
        console.error(error);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error.message });
        helpers.setSubmitting(false);
      }
    },
  });
  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={!!open} {...other}>
      <Card>
        <form onSubmit={form.handleSubmit}>
          <CardContent>
            <div>
              <Typography variant="h6">Add Students</Typography>
              <Typography color="textSecondary" variant="body2" sx={{ mt: 1 }}>
                Click on the student and save your selections.
              </Typography>
            </div>
            <Divider
              sx={{
                mt: 3,
                mb: 3,
              }}
            />
            <Select
              label="Students"
              displayEmpty
              //   value={groups}
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              error={Boolean(
                form.touched.studentsToAdd && form.errors.studentsToAdd
              )}
              value={form.values.studentsToAdd}
              name="studentsToAdd"
              fullWidth
              multiple
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  <Typography color="textSecondary" variant="body2">
                    Students selected : {selected.length}
                  </Typography>
                </Box>
              )}
            >
              <MenuItem disabled value="">
                <em>Select students</em>
              </MenuItem>
              {availableStudents &&
                availableStudents.map((o) => (
                  <MenuItem key={o.id} value={o}>
                    <Checkbox
                      checked={form.values.studentsToAdd.indexOf(o) > -1}
                    />
                    <ListItemText primary={o.firstName + " " + o.lastName} />
                  </MenuItem>
                ))}
            </Select>
          </CardContent>
          <CardActions>
            <Button sx={{ ml: "auto" }} onClick={onClose}>
              Cancel
            </Button>
            <Button sx={{ ml: 1 }} type="submit" variant="contained">
              Confirm
            </Button>
          </CardActions>
        </form>
      </Card>
    </Dialog>
  );
};
AddStudentDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
const AddGroupDialog = (props) => {
  const { open, onClose, ...other } = props;
  const [availableGroup, setAvailableGroup] = useState([]);
  useEffect(() => {
    if (open) {
      setAvailableGroup([]);
      groupForms.resetForm();
      getAvailableGroup();
    }
  }, [open, groupForms]);

  const getAvailableGroup = async () => {
    const response = await new Promise((resolve) => resolve(groupChild));
    console.log("TODO get available groups");
    setAvailableGroup(response);
  };
  const groupForms = useFormik({
    initialValues: {
      groupsToAdd: [],
    },
    validationSchema: Yup.object({
      groupsToAdd: Yup.array(),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const value_to_add = [];
        values.groupsToAdd.map((group) => value_to_add.push({ id: group.id }));
        console.log(value_to_add);
        onClose();
      } catch (error) {
        console.error(error);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error.message });
        helpers.setSubmitting(false);
      }
    },
  });
  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={!!open} {...other}>
      <Card>
        <form onSubmit={groupForms.handleSubmit}>
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
            <Select
              label="Groups"
              displayEmpty
              //   value={groups}
              onBlur={groupForms.handleBlur}
              onChange={groupForms.handleChange}
              error={Boolean(
                groupForms.touched.parent && groupForms.errors.parent
              )}
              value={groupForms.values.groupsToAdd}
              name="groupsToAdd"
              fullWidth
              multiple
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  <Typography color="textSecondary" variant="body2">
                    Groups selected : {selected.length}
                  </Typography>
                </Box>
              )}
            >
              <MenuItem disabled value="">
                <em>Select groups</em>
              </MenuItem>
              {availableGroup &&
                availableGroup.map((group) => (
                  <MenuItem key={group.id} value={group}>
                    <Checkbox
                      checked={
                        groupForms.values.groupsToAdd.indexOf(group) > -1
                      }
                    />
                    <ListItemText primary={group.name} />
                  </MenuItem>
                ))}
            </Select>
          </CardContent>
          <CardActions>
            <Button sx={{ ml: "auto" }} onClick={onClose}>
              Cancel
            </Button>
            <Button sx={{ ml: 1 }} type="submit" variant="contained">
              Confirm
            </Button>
          </CardActions>
        </form>
      </Card>
    </Dialog>
  );
};
AddGroupDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
// TODO : refactor this to be global
const applyPagination = (tabs, page, rowsPerPage) =>
  tabs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const GroupDetails = (props) => {
  const isMounted = useMounted();
  const [group, setGroup] = useState(null);
  const [currentTab, setCurrentTab] = useState("details");
  const [groupStudents, setGroupStudents] = useState([]);
  const [groupSubGroups, setGroupSubGroups] = useState([]);
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
  const [groupPagination, setGroupPagination] = useState({
    page: 0,
    rowsPerPage: 5,
  });
  const [studentsPagination, setStudentsPagination] = useState({
    page: 0,
    rowsPerPage: 5,
  });

  const onGroupsPageChanged = (event, newPage) => {
    setGroupPagination({ ...groupPagination, page: newPage });
  };
  const onGroupsRowsPerPageChanged = (event) => {
    setGroupPagination({
      ...groupPagination,
      rowsPerPage: parseInt(event.target.value, 10),
    });
  };
  const onStudentsPageChanged = (event, newPage) => {
    setStudentsPagination({ ...studentsPagination, page: newPage });
  };
  const onStudentsRowsPerPageChanged = (event) => {
    setStudentsPagination({
      ...studentsPagination,
      rowsPerPage: parseInt(event.target.value, 10),
    });
  };

  useEffect(() => {
    if (isMounted()) {
      getGroup();
      getGroupStudents();
      getGroupSubGroups();
    }
  }, [isMounted, group]);

  // Fetch group from api
  const getGroup = async () => {
    const response = await new Promise((resolve) => {
      resolve(groupFixture);
    });
    console.log("[LOAD GROUP]", response);
    setGroup(response);
  };
  // Fetch group students from api
  const getGroupStudents = async () => {
    const response = await new Promise((resolve) => {
      resolve(studentList);
    });
    console.log("[LOAD GROUP-STUDENTS]", response);
    setGroupStudents(response);
  };
  // Fetch group sub-groups from api
  const getGroupSubGroups = async () => {
    const response = await new Promise((resolve) => {
      resolve(groupChild);
    });
    console.log("[LOAD GROUP-SUB-GROUPS]", response);
    setGroupSubGroups(response);
  };

  const setGroupInfosHandler = async (body) => {
    console.log("[SET GROUP INFOS", body);
  };

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

  const handleDelete = (event) => {
    event.preventDefault();
    console.log("TODO : danger delete");
  };

  const handleLock = (event) => {
    event.preventDefault();
    console.log("TODO : danger lock");
  };

  const handleUnlock = (event) => {
    event.preventDefault();
    console.log("TODO : unlock");
  };

  if (!group) return null;

  const paginatedSubGroups = applyPagination(
    groupSubGroups,
    groupPagination.page,
    groupPagination.rowsPerPage
  );
  const paginatedStudents = applyPagination(
    groupStudents,
    studentsPagination.page,
    studentsPagination.rowsPerPage
  );
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
                    label={!group.root_groups ? "ROOT-GROUP" : "SUB-GROUP"}
                    color={!group.root_groups ? "primary" : "secondary"}
                    size="small"
                    sx={{ ml: 1 }}
                  />
                </Box>
              </Grid>
              <Grid item sx={{ ml: -2 }}>
                {!group.locked && (
                  <Button
                    disabled
                    endIcon={<ChevronDownIcon fontSize="small" />}
                    sx={{ m: 1 }}
                    variant="contained"
                  >
                    Actions
                  </Button>
                )}
                {group.locked && (
                  <Button
                    onClick={handleUnlock}
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
                  <GroupBasicDetails
                    group={group}
                    setGroupInfosHandler={setGroupInfosHandler}
                  />
                </Grid>
                {group.locked || group.root_groups ? (
                  <></>
                ) : (
                  <Grid item xs={12}>
                    <GroupSubGroupItems
                      subGroups={paginatedSubGroups}
                      count={groupSubGroups.length}
                      canBrowseToGroup={false}
                      addGroupHandler={addGroupHandler}
                      removeGroupHandler={removeGroupHandler}
                      page={groupPagination.page}
                      rowsPerPage={groupPagination.rowsPerPage}
                      onPageChange={onGroupsPageChanged}
                      onRowsPerPageChange={onGroupsRowsPerPageChanged}
                    />
                  </Grid>
                )}
                {!group.locked ? (
                  <Grid item xs={12}>
                    <GroupStudentItems
                      addStudentHandler={addStudentHandler}
                      removeStudentHandler={removeStudentHandler}
                      students={paginatedStudents}
                      canBrowseToStudent={false}
                      count={groupStudents.length}
                      page={studentsPagination.page}
                      rowsPerPage={studentsPagination.rowsPerPage}
                      onPageChange={onStudentsPageChanged}
                      onRowsPerPageChange={onStudentsRowsPerPageChanged}
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
                          You have two possible actions, if you decide to lock
                          the group, this group will no longer be visible to
                          users. But you can always unlock it afterwards,.But If
                          you delete it, however, this action is irreversible.
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions sx={{ flewWrap: "wrap", m: -1 }}>
                      {!group.locked && (
                        <Button
                          onClick={handleLock}
                          sx={{ m: 1, mr: "auto" }}
                          color="error"
                          variant="contained"
                        >
                          Lock
                        </Button>
                      )}
                      <Button
                        align="right"
                        onClick={handleDelete}
                        color="error"
                      >
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
