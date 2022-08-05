export const userRoleOptions = [
  {
    label: "Administrator",
    value: "admin",
  },
  {
    label: "Academic Manager",
    value: "academic",
  },
  {
    label: "Teacher",
    value: "teacher",
  },
  {
    label: "Student",
    value: "student",
  },
  {
    label: "Student Parent",
    value: "parent",
  },
];

export const userRoleOptionsBool = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Students",
    value: "isStudent",
  },
  {
    label: "Academic",
    value: "isAcademic",
  },
  {
    label: "Teacher",
    value: "isTeacher",
  },
  {
    label: "Parent",
    value: "isParent",
  },
  {
    label: "Administrator",
    value: "isAdmin",
  },
];

export const userDetailsTabs = [
  { label: "Details", value: "details" },
  { label: "Logs", value: "logs" },
];
export const studentDetailsTabs = [
  { label: "Details", value: "details", disabled: false },
  { label: "Course", value: "course",  disabled: true },
  { label: "Calendar", value: "calendar",  disabled: true },
  { label: "Absence Certificate", value: "certificate", disabled: true },
  { label: "Logs", value: "logs", disabled: true },
];
export const teacherDetailsTabs = [
  { label: "Details", value: "details", disabled: false },
  { label: "Course", value: "course",  disabled: true },
  { label: "Calendar", value: "calendar",  disabled: true },
  { label: "Absence Certificate", value: "certificate", disabled: true },
  { label: "Logs", value: "logs", disabled: true },
];