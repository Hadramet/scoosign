import { AppBar, IconButton, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Menu as MenuIcon } from '../icons';

import PropTypes from 'prop-types';

const AppNavbarRoot = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    ...(theme.palette.mode === 'light'
        ? {
            boxShadow: theme.shadows[3]
        }
        : {
            backgroundColor: theme.palette.background.paper,
            borderBottomColor: theme.palette.divider,
            borderBottomStyle: 'solid',
            borderBottomWidth: 1,
            boxShadow: 'none'
        })
}));
export const AppNavbar = (props) => {
    const { onOpenSidebar, ...other } = props

    return (
        <>
            <AppNavbarRoot sx={{
                left: { lg: 280 },
                width: { lg: 'calc(100% - 280px)' }
            }}{...other}>
                <Toolbar
                    disableGutters
                    sx={{ minHeight: 64, left: 0, px: 2 }}>
                    <IconButton
                        onClick={onOpenSidebar}
                        sx={{
                            display: { xs: 'inline-flex', lg: 'none' }
                        }}
                    >
                        <MenuIcon fontSize="small" />
                    </IconButton>
                </Toolbar>
            </AppNavbarRoot>
        </>
    )
}

AppNavbar.propTypes = {
    onOpenSidebar: PropTypes.func
};
