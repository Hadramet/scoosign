import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { AppNavbar } from './app-navbar';
import { AppSidebar } from './app-sidebar';

const AppLayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
        paddingLeft: 280
    }
}));

export const AppLayout = (props) => {
    const { children } = props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            <AppLayoutRoot>
                <Box
                    sx={{
                        display: 'flex',
                        flex: '1 1 auto',
                        flexDirection: 'column',
                        width: '100%'
                    }}
                >
                    {children}
                </Box>
            </AppLayoutRoot>
            <AppNavbar onOpenSidebar={() => setIsSidebarOpen(true)} />
            <AppSidebar 
                onClose={() => setIsSidebarOpen(false)}
                open = { isSidebarOpen }/>
        </>
    )
}

AppLayout.propTypes = {
    children: PropTypes.node
}