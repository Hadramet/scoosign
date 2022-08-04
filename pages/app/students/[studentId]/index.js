import { Box } from "@mui/system";
import { default as Head } from "next/head";
import { AuthGuard } from "@/components/authentication/auth-guard";
import { RoleGuard } from "@/components/authentication/role-guard";
import { AppLayout } from "@/components/app/app-layout";

const StudentDetails = (props) => {
  return (
    <Box>
      <Head>
        <title>App - Student Details | ScooSign</title>
      </Head>
    </Box>
  );
};
StudentDetails.getLayout = (page) => (
  <AuthGuard>
    <RoleGuard permissions={["admin", "academic"]}>
      <AppLayout>{page}</AppLayout>
    </RoleGuard>
  </AuthGuard>
);

export default StudentDetails;
