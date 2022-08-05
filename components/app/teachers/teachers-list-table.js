import {
  Box,
  Button,
  Checkbox,
  Table,
  Link,
  TableBody,
  Avatar,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  TablePagination,
} from "@mui/material";
import PropTypes from "prop-types";
import { Scrollbar } from "../../custom";
import NextLink from "next/link";
import {
  PencilAlt as PencilAltIcon,
  ArrowRight as ArrowRightIcon,
} from "../../icons";
import { SeverityBadge } from "../../severity-badge";
import { getInitials } from "../../../lib/get-initials";

export const TeacherListTable = (props) => {
  const {
    users,
    usersCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox></Checkbox>
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>specialty</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user) => {
                return (
                  <TableRow hover key={user._id}>
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ alignItems: "center", display: "flex" }}>
                        <Avatar
                          sx={{
                            height: 40,
                            width: 40,
                          }}
                        >
                          {getInitials(
                            user.user.firstName + " " + user.user.lastName
                          )}
                        </Avatar>
                        <Box sx={{ ml: 1 }}>
                          <NextLink href={`/app/teachers/${user._id}`} passHref>
                            <Link color="inherit" variant="subtitle2">
                              {user.user.firstName + " " + user.user.lastName}
                            </Link>
                          </NextLink>
                          <Typography color="textSecondary" variant="body2">
                            {user.user.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <SeverityBadge
                        color={
                          user.user.active === true ? "success" : "warning"
                        }
                      >
                        {user.user.active === true ? "ACTIVE" : "ARCHIVE"}
                      </SeverityBadge>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="body2">
                        {user.specialty}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <NextLink href={`/app/teachers/${user._id}`} passHref>
                        <IconButton component="a">
                          <PencilAltIcon fontSize="small" />
                        </IconButton>
                      </NextLink>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={usersCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

TeacherListTable.propTypes = {
  users: PropTypes.array.isRequired,
  usersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
