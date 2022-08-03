import {
  Checkbox, IconButton, Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow, Typography
} from "@mui/material";
import NextLink from "next/link";
import PropTypes from "prop-types";
import { Scrollbar } from "@/components/custom";
import { ArrowRight as ArrowRightIcon } from "@/components/icons";

export const GroupListTable = (props) => {
  const {
    groups, groupsCount, page, rowPerPage, onRowPerPageChanged, onPageChanged, ...other
  } = props;

  return (
    <>
      <div {...other}>
        <Scrollbar>
          <Table size="small" sx={{ minWidth: 700 }}>
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
                  <TableRow hover key={group.id}>
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
                        {group.child && group.child.length}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <NextLink href={`/app/groups/${group._id}`} passHref>
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
          rowsPerPageOptions={[5, 10, 25, 50]} />
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
  onPageChanged: PropTypes.func
};
