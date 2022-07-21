import { Box, Divider, Drawer, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import { Scrollbar } from '../custom';
import NextLink from 'next/link';


export const AppSidebar = (props) => {
    const { onClose, open } = props;
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
        noSsr: true
    });

    const content = (
        <>
            <Scrollbar sx={{
                height: '100%', '& .simplebar-content': {
                    height: '100%'
                }
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
                            >
                                <a>
                                    ScooSignLogo
                                </a>
                            </NextLink>
                        </Box>
                        <Divider
                            sx={{
                                borderColor: '#2D3748',
                                my: 3
                            }}
                        />
                    </div>
                </Box>
            </Scrollbar>
        </>
    )

    if (lgUp){
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
