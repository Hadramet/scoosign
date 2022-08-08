import { Grid, Button, Typography, Card, TextField, InputAdornment } from "@mui/material";
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
import { useState } from "react";
import { Search as SearchIcon } from "@/components/icons";
import useSWR from "swr";
import { TeacherListTable } from "@/components/app/teachers/teachers-list-table";

const TeachersList = (props) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const accessToken = globalThis.localStorage.getItem("accessToken");
  const { data, error } = useSWR([
    `/api/v1/teachers?page=${page}&limit=${rowsPerPage}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "X-Scoosign-Authorization": `Bearer ${accessToken}`,
      },
    },
  ]);

  const onPageChanged = (event, newPage) => {
    setPage(newPage + 1);
  };

  const onRowPerPageChanged = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  if (error) return "something went wrong";
  if (!data) return "Loading ...";
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
          <Card>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexWrap: "wrap",
                m: -1.5,
                p: 3,
              }}
            >
              <Box component="form" disabled sx={{ flexGrow: 1, m: 1.5 }}>
                <TextField
                  defaultValue=""
                  fullWidth
                  disabled
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search teachers"
                />
              </Box>
            </Box>
            {error ? (
              "An error has occurred."
            ) : !data ? (
              "loading ..."
            ) : (
              <TeacherListTable
                users={data.data?.itemsList}
                usersCount={data.data?.paginator?.itemCount}
                page={page - 1}
                rowsPerPage={rowsPerPage}
                onPageChange={onPageChanged}
                onRowsPerPageChange={onRowPerPageChanged}
              />
            )}
          </Card>
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
