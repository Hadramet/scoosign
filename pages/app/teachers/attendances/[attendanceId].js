import { AuthGuard } from "@/components/authentication/auth-guard";
import { RoleGuard } from "@/components/authentication/role-guard";

const TeacherAttendanceSession = (props) => {
  return "attendance session ";
};

TeacherAttendanceSession.getLayout = (page) => (
  <AuthGuard>
    <RoleGuard permissions={["teacher"]}>{page}</RoleGuard>
  </AuthGuard>
);

export default TeacherAttendanceSession;
