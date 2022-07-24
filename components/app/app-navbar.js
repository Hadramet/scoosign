import {
  AppBar,
  Avatar,
  Box,
  ButtonBase,
  IconButton,
  Toolbar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Menu as MenuIcon } from "../icons";
import { UserCircle as UserCircleIcon } from "../icons";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { AccountPopover } from "./account-popover";

const AppNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...(theme.palette.mode === "light"
    ? {
        boxShadow: theme.shadows[3],
      }
    : {
        backgroundColor: theme.palette.background.paper,
        borderBottomColor: theme.palette.divider,
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
        boxShadow: "none",
      }),
}));

const AccountButton = () => {
  const anchorRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);

  const handleOpenPopover = () => {
    setOpenPopover(true);
  };

  const handleClosePopover = () => {
    setOpenPopover(false);
  };

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={handleOpenPopover}
        ref={anchorRef}
        sx={{
          alignItems: "center",
          display: "flex",
          ml: 2,
        }}
      >
        <Avatar
          sx={{
            height: 40,
            width: 40,
          }}
        >
          <UserCircleIcon fontSize="small" />
        </Avatar>
      </Box>
      <AccountPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      />
    </>
  );
};

export const AppNavbar = (props) => {
  const { onOpenSidebar, ...other } = props;

  return (
    <>
      <AppNavbarRoot
        sx={{
          left: { lg: 280 },
          width: { lg: "calc(100% - 280px)" },
        }}
        {...other}
      >
        <Toolbar disableGutters sx={{ minHeight: 64, left: 0, px: 2 }}>
          <IconButton
            onClick={onOpenSidebar}
            sx={{
              display: { xs: "inline-flex", lg: "none" },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <AccountButton />
        </Toolbar>
      </AppNavbarRoot>
    </>
  );
};

AppNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};
