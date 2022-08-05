import {
    Grid,
    Button,
    Typography,
  } from "@mui/material";
  import { Box, Container } from "@mui/system";
  import { default as Head } from "next/head";
  import {
    Upload as UploadIcon,
    Download as DownloadIcon,
    Plus as PlusIcon,
  } from "@/components/icons";
  import { AuthGuard } from "@/components/authentication/auth-guard";
  import { RoleGuard } from "@/components/authentication/role-guard";
  import { AppLayout } from "@/components/app/app-layout";
import { useRouter } from "next/router";
  
  const TeachersList = (props) => {
    const router = useRouter()
    return (
      <Box>
        <Head>
          <title>App - Teachers | ScooSign</title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth="xl">
            <Box sx={{ mb: 4 }}>
              <Grid container justifyContent="space-between" spacing={3}>
                <Grid item>
                  <Typography variant="h4">Teachers</Typography>
                </Grid>
                <Grid item>
                  <Button
                    onClick={() => {
                      router.push("/app/teachers/new");
                    }}
                    startIcon={<PlusIcon fontSize="small" />}
                    variant="contained"
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
  
              <Box sx={{ m: -1, mt: 3 }}>
                <Button
                  disabled
                  startIcon={<UploadIcon fontSize="small" />}
                  sx={{ m: 1 }}
                >
                  {" "}
                  Import
                </Button>
                <Button
                  disabled
                  startIcon={<DownloadIcon fontSize="small" />}
                  sx={{ m: 1 }}
                >
                  {" "}
                  Export
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    );
  };
  TeachersList.getLayout = (page) => (
    <AuthGuard>
      <RoleGuard permissions={["admin", "academic"]}>
        <AppLayout>{page}</AppLayout>
      </RoleGuard>
    </AuthGuard>
  );
  
  export default TeachersList;
  