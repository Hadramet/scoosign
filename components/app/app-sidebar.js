import { Box, Divider, Drawer, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Scrollbar } from '../custom';
import NextLink from 'next/link';
import {
    DocumentText as DocumentTextIcon,
    Calendar as CalendarIcon,
    ChartBar as ChartBarIcon,
    Home as HomeIcon,
    UserCircle as UserCircleIcon,
    Users as UsersIcon
} from '../icons';
import { useMemo } from 'react';
import {AppSidebarSection} from './app-sidebar-section'
import ClassIcon from '@mui/icons-material/Class';

const getSections = (t) => [
    {
        title: 'General',
        permissions: ['all'],
        items: [
            {
                title: 'Overview',
                path: '/app',
                icon: <HomeIcon fontSize='small' />,
                permissions: ['all']
            },
            {
                title: 'Analytics',
                path: '/app/analytics',
                icon: <ChartBarIcon fontSize="small" />,
                permissions: ['all']
            },
            {
                title: 'Calendar',
                path: '/app/calendar',
                icon: <CalendarIcon fontSize="small" />,
                permissions: ['all']
            },
            {
                title: 'Documents',
                path: '/app/documents',
                icon: <DocumentTextIcon fontSize="small" />,
                permissions: ['all']
            },
            {
                title: 'Account',
                path: '/app/account',
                icon: <UserCircleIcon fontSize="small" />,
                permissions: ['all']
            }
        ]
    },
    {
        title: 'Management',
        permissions: ['admin'],
        items: [
            {
                title: 'Users',
                path: '/app/users',
                icon: <UsersIcon fontSize='small' />,
                permissions: ['admin'],
                children: [
                    {
                        title: 'Browse users',
                        path: '/app/users',
                        permissions: ['admin'],
                    },
                    {
                        title: 'Create',
                        path: '/dashboard/users/new',
                        permissions: ['admin'],
                    }
                ]
            },
            {
                title: 'Class',
                path: '/app/class',
                icon: <ClassIcon fontSize='small' />,
                permissions: ['admin'],
                children: [
                    {
                        title: 'Browse',
                        path: '/app/class',
                        permissions: ['admin'],
                    },
                    {
                        title: 'Create',
                        path: '/dashboard/class/new',
                        permissions: ['admin'],
                    }
                ]
            }

        ]
    }
]

export const AppSidebar = (props) => {
    const { onClose, open } = props;

    const router = useRouter();
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
        noSsr: true
    });

    const sections = useMemo(() => getSections(), []);


    const content = (
        <>
            <Scrollbar sx={{
                height: '100%', '& .simplebar-content': { height: '100%' }
            }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%'
                    }}
                >

                    <div>
                        <Box sx={{ p: 3 }}>
                            <NextLink
                                href="/"
                                passHref
                            ><a>ScooSignLogo</a>
                            </NextLink>
                        </Box>
                        <Divider
                            sx={{ borderColor: '#2D3748', my: 3 }}
                        />
                        <Box sx={{ flexGrow: 1 }}>
                            {sections.map((section) => (
                                    <AppSidebarSection
                                        key={section.title}
                                        permissions={section.permissions}
                                        path={router.asPath}
                                        sx={{
                                            mt: 2,
                                            '& + &': {
                                                mt: 2
                                            }
                                        }}
                                        {...section}/>))}
                        </Box>
                    </div>
                </Box>
            </Scrollbar>
        </>
    )

    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        backgroundColor: 'neutral.900',
                        borderRightColor: 'divider',
                        borderRightStyle: 'solid',
                        borderRightWidth: (theme) => theme.palette.mode === 'dark' ? 1 : 0,
                        color: '#FFFFFF',
                        width: 280
                    }
                }}
                variant="permanent"
            >
                {content}
            </Drawer>
        )
    }

    return (
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    backgroundColor: 'neutral.900',
                    color: '#FFFFFF',
                    width: 280
                }
            }}
            sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
            variant="temporary"
        >
            {content}
        </Drawer>
    );

}
AppSidebar.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool
};
