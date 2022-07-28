import {
  Box,
  Button,
  Card,
  Checkbox,
  Collapse,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import Head from "next/head";
import { AppLayout } from "../../../components/app/app-layout";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { RoleGuard } from "../../../components/authentication/role-guard";
import {
  Plus as PlusIcon,
  Upload as UploadIcon,
  Search as SearchIcon,
  Download as DownloadIcon,
} from "../../../components/icons";
import PropTypes from "prop-types";
import { useState } from "react";
import { Scrollbar } from "../../../components/custom";
import {
  ChevronRight as ChevronRightIcon,
  ChevronDown as ChevronDownIcon,
  PencilAlt as PencilAltIcon,
  ArrowRight as ArrowRightIcon,
} from "../../../components/icons";

const groupsFixture = [
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
    id: "2dsfsffdf",
    name: "Bsc 1 ",
    description: "Licence class",
    students: ["111", "222", "333"],
    root_groups: null,
    created_by: "Kurk Cobain",
    created_at: "2020-01-20T15:22:20.000Z",
    last_update: "2020-01-20T15:22:20.000Z",
    locked: false,
  },
  {
    id: "hzrgvd",
    name: "Asc1 Group1",
    description: "First class of 5 year program",
    students: ["111", "222", "333"],
    root_groups: "1sqfs",
    created_by: "Kurk Cobain",
    created_at: "2020-01-20T15:22:20.000Z",
    last_update: "2020-01-20T15:22:20.000Z",
    locked: false,
  },
  {
    id: "eareds",
    name: "Asc1 Group1",
    description: "First class of 5 year program",
    students: ["111", "222", "333"],
    root_groups: null,
    child_count: 3,
    created_by: "Kurk Cobain",
    created_at: "2020-01-20T15:22:20.000Z",
    last_update: "2020-01-20T15:22:20.000Z",
    locked: false,
  },
  {
    id: "hrqgds",
    name: "Asc1 Group1",
    description: "First class of 5 year program",
    students: ["111", "222", "333"],
    root_groups: "1sqfs",
    created_by: "Kurk Cobain",
    created_at: "2020-01-20T15:22:20.000Z",
    last_update: "2020-01-20T15:22:20.000Z",
    locked: false,
  },
  {
    id: "qze",
    name: "Asc1 Group1",
    description: "First class of 5 year program",
    students: ["111", "222", "333"],
    root_groups: "1sqfs",
    created_by: "Kurk Cobain",
    created_at: "2020-01-20T15:22:20.000Z",
    last_update: "2020-01-20T15:22:20.000Z",
    locked: false,
  },
  {
    id: "fdsfdsq",
    name: "Asc1 Group1",
    description: "First class of 5 year program",
    students: ["111", "222", "333"],
    root_groups: "1sqfs",
    created_by: "Kurk Cobain",
    created_at: "2020-01-20T15:22:20.000Z",
    last_update: "2020-01-20T15:22:20.000Z",
    locked: false,
  },
  {
    id: "dsfd",
    name: "Asc1 Group1",
    description: "First class of 5 year program",
    students: ["111", "222", "333"],
    root_groups: "1sqfs",
    created_by: "Kurk Cobain",
    created_at: "2020-01-20T15:22:20.000Z",
    last_update: "2020-01-20T15:22:20.000Z",
    locked: false,
  },
];

const GroupListTable = (props) => {
  const {
    groups,
    groupsCount,
    page,
    rowPerPage,
    onRowPerPageChanged,
    onPageChanged,
    ...other
  } = props;

  return (
    <>
      <div {...other}>
        <Scrollbar>
          <Table size="small" sx={{ minWidth: 700 }} >
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox></Checkbox>
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="right">Students</TableCell>
                <TableCell align="right">Sub-Group</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groups.map((group) => {
                return (
                    <TableRow
                      hover 
                      key={group.id}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                          <NextLink href={`/app/groups/${group.id}`} passHref>
                            <Link color="inherit" variant="subtitle2">
                              {group.name}
                            </Link>
                          </NextLink>
                      </TableCell>
                      <TableCell align="right">
                        <Typography color="textSecondary" variant="body2">
                          {group.students && group.students.length}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography color="textSecondary" variant="body2">
                          {group.child_count && group.child_count}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <NextLink href={`/app/groups/${group.id}`} passHref>
                          <IconButton component="a">
                            <ArrowRightIcon fontSize="small" />
                          </IconButton>
                        </NextLink>
                      </TableCell>
                    </TableRow>
                );
              })}
            </TableBody>
          </Table>{" "}
        </Scrollbar>
        <TablePagination
          component="div"
          count={groupsCount}
          onPageChange={onPageChanged}
          onRowsPerPageChange={onRowPerPageChanged}
          page={page}
          rowsPerPage={rowPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </div>
    </>
  );
};

GroupListTable.propTypes = {
  groups: PropTypes.array,
  groupsCount: PropTypes.number,
  page: PropTypes.number,
  rowPerPage: PropTypes.number,
  onRowPerPageChanged: PropTypes.func,
  onPageChanged: PropTypes.func,
};

const applyPagination = (groups, page, rowsPerPage) =>
  groups.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const GroupList = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const onPageChanged = (event, newPage) => {
    setPage(newPage);
  };

  const onRowPerPageChanged = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const paginatedGroups = applyPagination(groupsFixture, page, rowsPerPage);
  return (
    <>
      <Head>
        <title>App - Groups | ScooSign</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">Groups</Typography>
              </Grid>
              <Grid item>
                <Button
                  disabled
                  onClick={() => {
                    router.push("/app/groups/new");
                  }}
                  startIcon={<PlusIcon fontSize="small" />}
                  variant="contained"
                >
                  Add
                </Button>
              </Grid>
            </Grid>

            <Box sx={{ m: -1, mt: 3 }}>
              <Button
                disabled
                startIcon={<UploadIcon fontSize="small" />}
                sx={{ m: 1 }}
              >
                {" "}
                Import
              </Button>
              <Button
                disabled
                startIcon={<DownloadIcon fontSize="small" />}
                sx={{ m: 1 }}
              >
                {" "}
                Export
              </Button>
            </Box>
          </Box>
          <Card>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexWrap: "wrap",
                m: -1.5,
                p: 3,
              }}
            >
              <Box
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                sx={{ flexGrow: 1, m: 1.5 }}
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
            </Box>
            <GroupListTable
              groups={paginatedGroups}
              groupsCount={groupsFixture.length}
              page={page}
              rowPerPage={rowsPerPage}
              onPageChanged={onPageChanged}
              onRowPerPageChanged={onRowPerPageChanged}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

GroupList.getLayout = (page) => (
  <AuthGuard>
    <RoleGuard permissions={["admin", "academic"]}>
      <AppLayout>{page}</AppLayout>
    </RoleGuard>
  </AuthGuard>
);

export default GroupList;
