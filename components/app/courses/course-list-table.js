import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import PropTypes from "prop-types";
import { Scrollbar } from "@/components/custom";
import { ArrowRight as ArrowRightIcon } from "@/components/icons";
import { getInitials } from "@/lib/get-initials";
import format from "date-fns/format";
const getFormattedStartEndDate = (start, end) => {
  const s = new Date(start);
  const e = new Date(end);
  if (s.getDate === e.getDate)
    return format(s, "MMM d,yyyy, h:mm") + "-" + format(new Date(end), "h:mm");
  else
    return (
      format(s, "MMM d,yyyy, h:mm") +
      "-" +
      format(new Date(end), "MMM d,yyyy, h:mm")
    );
};
export const CourseListTable = (props) => {
  const {
    courses,
    courseCount,
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
          <Table size="small" sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox></Checkbox>
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Teacher</TableCell>
                <TableCell>Room</TableCell>
                <TableCell>Groups</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses && courses.map((course) => {
                return (
                  <TableRow hover key={course._id}>
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <NextLink href={`/app/courses/${course._id}`} passHref>
                        <Link color="inherit" variant="subtitle2">
                          {course.name}
                        </Link>
                      </NextLink>
                    </TableCell>
                    <TableCell >
                      <Typography color="textSecondary" variant="body2">
                        {getFormattedStartEndDate(course.start, course.end)}
                      </Typography>
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
                            course.teacher.firstName +
                              " " +
                              course.teacher.lastName
                          )}
                        </Avatar>
                        <Box sx={{ ml: 1 }}>
                          <NextLink
                            href={`/app/teachers/${course.teacher._id}`}
                            passHref
                          >
                            <Link color="inherit" variant="subtitle2">
                              {course.teacher.firstName +
                                " " +
                                course.teacher.lastName}
                            </Link>
                          </NextLink>
                          <Typography color="textSecondary" variant="body2">
                            {course.teacher.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell >
                      <Typography color="textSecondary" variant="body2">
                        {course.classRoom}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {course.groups.map((group) => 
                        <Chip sx={{m:0.5}} key={group._id} label={group.name} color="default" size="small" />
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <NextLink href={`/app/courses/${course._id}`} passHref>
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
          count={courseCount}
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

CourseListTable.propTypes = {
  courses: PropTypes.array,
  courseCount: PropTypes.number,
  page: PropTypes.number,
  rowPerPage: PropTypes.number,
  onRowPerPageChanged: PropTypes.func,
  onPageChanged: PropTypes.func,
};
