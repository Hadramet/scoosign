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
} from "@mui/material";
import PropTypes from "prop-types";
import { Scrollbar } from "../../custom";
import NextLink from "next/link";
import {
  PencilAlt as PencilAltIcon,
  ArrowRight as ArrowRightIcon,
} from "../../icons";
import { SeverityBadge } from "../../severityBadge";
import { getInitials } from "../../../lib/getInitials";

export const UserListTable = (props) => {
  const { users, ...other } = props;

  return (
    <div {...other}>
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "neutral.800" : "neutral.100",
          px: 2,
          py: 0.5,
        }}
      >
        <Checkbox />
        <Button size="small" sx={{ ml: 2 }}>
          Delete
        </Button>
        <Button size="small" sx={{ ml: 2 }}>
          Edit
        </Button>
      </Box>

      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox></Checkbox>
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              return (
                <TableRow hover key={user.id}>
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
                        {getInitials(user.name)}
                      </Avatar>
                      <Box sx={{ ml: 1 }}>
                        <NextLink href={`/app/user/${user.id}`} passHref>
                          <Link color="inherit" variant="subtitle2">
                            {user.name}
                          </Link>
                        </NextLink>
                        <Typography color="textSecondary" variant="body2">
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <SeverityBadge
                      color={user.active === true ? "success" : "warning"}
                    >
                      {user.active === true ? "ACTIVE" : "ARCHIVE"}
                    </SeverityBadge>
                  </TableCell>
                  <TableCell align="right">
                    <NextLink href={`/app/user/${user.id}/edit`} passHref>
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                    <NextLink href={`/app/user/${user.id}`} passHref>
                      <IconButton component="a">
                        <ArrowRightIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
    </div>
  );
};

UserListTable.propTypes = {
  users: PropTypes.array.isRequired,
};
