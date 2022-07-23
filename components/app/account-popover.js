import fetchJson from "../../lib/fetchJson";
import { Avatar, Box, Divider, ListItemIcon, ListItemText, MenuItem, Popover, Typography } from '@mui/material';
import { UserCircle as UserCircleIcon } from "../icons";
import PropTypes from 'prop-types';
import useSession from "../../lib/useSession"
import LogoutIcon from '@mui/icons-material/Logout'
import { useRouter } from "next/router";

export const AccountPopover = (props) => {
    const { anchorEl, onClose, open, ...other } = props;
    const { user, mutateUser } = useSession({})
    const router = useRouter();

    const handleLogout = async () => {
        try {
            onClose?.()
            mutateUser(await fetchJson('/api/authentication/logout', {
                method: 'POST'
            }), false)
            router.push('/').catch(console.error)

        } catch (error) {

            console.error(err);
            // toast.error('Unable to logout.');
        }
    }

    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
                horizontal: 'center',
                vertical: 'bottom'
            }}
            keepMounted
            onClose={onClose}
            open={!!open}
            PaperProps={{ sx: { width: 300 } }}
            transitionDuration={0}{...other}>
            <Box sx={{
                alignItems: 'center',
                p: 2,
                display: 'flex'
            }}>
                <Avatar sx={{
                    height: 40,
                    width: 40
                }}>
                    <UserCircleIcon fontSize="small" />
                </Avatar>

                <Box sx={{ ml: 1 }}>
                    {user && (
                        <>
                            <Typography variant="body1"> {user.infos?.name} </Typography>
                            <Typography variant="body2" color="textSecondary" >{user.id}</Typography>
                        </>
                    )}
                </Box>
            </Box>
            <Divider />
            <Box sx={{ my: 1 }}>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                        primary={(
                            <Typography variant="body1">
                                Logout
                            </Typography>
                        )}
                    />
                </MenuItem>
            </Box>
        </Popover>
    )
}
AccountPopover.propTypes = {
    anchorEl: PropTypes.any,
    onClose: PropTypes.func,
    open: PropTypes.bool
};