import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { AppLayout } from "@/components/app/app-layout";
import { AuthGuard } from "@/components/authentication/auth-guard";
import { RoleGuard } from "@/components/authentication/role-guard";
import {
  Plus as PlusIcon,
  Upload as UploadIcon,
  Search as SearchIcon,
  Download as DownloadIcon,
} from "@/components/icons";
import { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { GroupListTable } from "../../../components/app/groups/group-list-table";

const GroupList = (props) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const accessToken = globalThis.localStorage.getItem("accessToken");
  const { data, error } = useSWR([
    `/api/v1/groups?page=${page}&limit=${rowsPerPage}`,
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

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";
  return (
    <>
      <Head>
        <title>App - Groups | ScooSign</title>
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
                <Typography variant="h4">Groups</Typography>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => {
                    router.push("/app/groups/new");
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
              <Box
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                sx={{ flexGrow: 1, m: 1.5 }}
              >
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
                  placeholder="Search groups"
                />
              </Box>
            </Box>
            <GroupListTable
              groups={data?.data?.itemsList}
              groupsCount={data?.data?.paginator?.itemCount}
              page={page-1}
              rowPerPage={rowsPerPage}
              onPageChanged={onPageChanged}
              onRowPerPageChanged={onRowPerPageChanged}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};
GroupList.getLayout = (page) => (
  <AuthGuard>
    <RoleGuard permissions={["admin", "academic"]}>
      <AppLayout>{page}</AppLayout>
    </RoleGuard>
  </AuthGuard>
);

export default GroupList;
