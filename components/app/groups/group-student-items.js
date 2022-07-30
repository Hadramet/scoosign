import {
  Avatar,
  Button,
  Card, CardHeader, Divider, IconButton, Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow, Typography
} from "@mui/material";
import { Box } from "@mui/system";
import NextLink from "next/link";
import { DeleteOutline } from "@mui/icons-material";
import { Plus as PlusIcon } from "../../icons";
import { Scrollbar } from "../../custom";
import { ArrowRight as ArrowRightIcon } from "../../icons";
import { getInitials } from "../../../lib/get-initials";
import PropTypes from "prop-types";

export const GroupStudentItems = (props) => {
  const {
    students, canBrowseToStudent, addStudentHandler, removeStudentHandler, page, rowsPerPage, onPageChange, onRowsPerPageChange, count, ...other
  } = props;

  return (
    <Card {...other}>
      <CardHeader
        title="Students"
        action={<Button
          onClick={addStudentHandler}
          startIcon={<PlusIcon fontSize="small" />}
          variant="contained"
        >
          Add Student
        </Button>} />
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
                      <Avatar src={studentItem?.avatar}
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
        rowsPerPageOptions={[5, 10, 25]} />
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
