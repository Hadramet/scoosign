const { AppLayout } = require("@/components/app/app-layout");
const { AuthGuard } = require("@/components/authentication/auth-guard");
const { RoleGuard } = require("@/components/authentication/role-guard");

const Calendar = () => {
  return <>Calendar ...</>;
};

Calendar.getLayout = (page) => (
  <AuthGuard>
    <RoleGuard permissions={["all"]}>
      <AppLayout>{page}</AppLayout>
    </RoleGuard>
  </AuthGuard>
);

export default Calendar;