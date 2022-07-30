import {
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
import PropTypes from "prop-types";

export const GroupSubGroupItems = (props) => {
  const {
    subGroups, canBrowseToGroup, addGroupHandler, removeGroupHandler, page, rowsPerPage, onPageChange, onRowsPerPageChange, count, ...other
  } = props;

  return (
    <Card {...other}>
      <CardHeader
        title="Sub Groups"
        action={<Button
          onClick={addGroupHandler}
          startIcon={<PlusIcon fontSize="small" />}
          variant="contained"
        >
          Add Group
        </Button>} />
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
        rowsPerPageOptions={[5, 10, 25]} />
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
