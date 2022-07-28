import {
    Box,
    Button, Container, Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import NextLink from "next/link";
import Head from "next/head";
import PropTypes from "prop-types";

export const ErrorPageManagement = (props) => {
    const { message, description, backButtonText, backButtonRoute, ...others } = props;

    const theme = useTheme();
    const mobileDevice = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <>
            <Head>
                <title>App: Error | Scoosign</title>
            </Head>
            <Box
                component="main"
                sx={{
                    alignItems: "center",
                    backgroundColor: "background.paper",
                    display: "flex",
                    flexGrow: 1,
                    py: "80px",
                }}
                {...others}
            >
                <Container maxWidth="lg">
                    <Typography align="center" variant={mobileDevice ? "h4" : "h1"}>
                        {message}
                    </Typography>
                    <Typography
                        align="center"
                        color="textSecondary"
                        sx={{ mt: 0.5 }}
                        variant="subtitle2"
                    >
                        {description}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 6,
                        }}
                    ></Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 6,
                        }}
                    >
                        <NextLink href={backButtonRoute} passHref>
                            <Button component="a" variant="outlined">
                                {backButtonText}
                            </Button>
                        </NextLink>
                    </Box>
                </Container>
            </Box>
        </>
    );
};
ErrorPageManagement.propTypes = {
    message: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    backButtonText: PropTypes.string.isRequired,
    backButtonRoute: PropTypes.string.isRequired,
};
