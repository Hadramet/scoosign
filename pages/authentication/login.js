import { Box, Card, Container, Divider, Typography } from "@mui/material";
import NextLink from "next/link";
import { JWTLogin } from "../../components/authentication/login";
const { default: Head } = require("next/head");

const Login = () => {
  return (
    <>
      <Head>
        <title>Login | ScooSign</title>
      </Head>

      <Box
        component="main"
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            py: { xs: "60px", md: "120px" },
          }}
        >
          <Card elevation={16} sx={{ p: 4 }}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <NextLink href="/" passHref>
                <a> ScooSignLogo</a>
              </NextLink>
              <Typography variant="h4">Login</Typography>
              <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
                Sign in on the internal platform
              </Typography>
            </Box>
            <Divider sx={{ my: 3 }} />
            <JWTLogin />
          </Card>
        </Container>
      </Box>
    </>
  );
};

Login.getLayout = (page) => <>{page}</>;

export default Login;
