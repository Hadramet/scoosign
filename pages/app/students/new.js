import { Box } from "@mui/system";
import { default as Head } from "next/head";
import { AuthGuard } from "@/components/authentication/auth-guard";
import { RoleGuard } from "@/components/authentication/role-guard";
import { AppLayout } from "@/components/app/app-layout";

const NewStudent = (props) => {
  return (
    <Box>
      <Head>
        <title>App - New Student | ScooSign</title>
      </Head>
    </Box>
  );
};
NewStudent.getLayout = (page) => (
  <AuthGuard>
    <RoleGuard permissions={["admin", "academic"]}>
      <AppLayout>{page}</AppLayout>
    </RoleGuard>
  </AuthGuard>
);

export default NewStudent;
