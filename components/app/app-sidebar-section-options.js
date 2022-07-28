import {
  DocumentText as DocumentTextIcon,
  Calendar as CalendarIcon,
  ChartBar as ChartBarIcon,
  Home as HomeIcon,
  UserCircle as UserCircleIcon,
  Users as UsersIcon,
} from "../icons";
import ClassIcon from "@mui/icons-material/Class";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
export function getSections(t) {
  return [
    {
      title: "General",
      permissions: ["all"],
      items: [
        {
          title: "Overview",
          path: "/app",
          icon: <HomeIcon fontSize="small" />,
          permissions: ["all"],
        },
        // {
        //   title: "Analytics",
        //   path: "/app/analytics",
        //   icon: <ChartBarIcon fontSize="small" />,
        //   permissions: ["all"],
        // },
        // {
        //   title: "Calendar",
        //   path: "/app/calendar",
        //   icon: <CalendarIcon fontSize="small" />,
        //   permissions: ["all"],
        // },
        // {
        //   title: "Documents",
        //   path: "/app/documents",
        //   icon: <DocumentTextIcon fontSize="small" />,
        //   permissions: ["all"],
        // },
        // {
        //   title: "Account",
        //   path: "/app/account",
        //   icon: <UserCircleIcon fontSize="small" />,
        //   permissions: ["all"],
        // },
      ],
    },
    {
      title: "School",
      permissions: ["admin", "academic"],
      items: [
        // {
        //   title: "Students",
        //   path: "/app/students",
        //   icon: <SchoolIcon fontSize="small" />,
        //   permissions: ["admin", "academic"],
        // },
        {
          title: "Groups",
          path: "/app/groups",
          icon: <GroupsIcon fontSize="small" />,
          permissions: ["admin", "academic"],
        },
        // {
        //   title: "Courses",
        //   path: "/app/courses",
        //   icon: <ClassIcon fontSize="small" />,
        //   permissions: ["admin", "academic"],
        // },
        // {
        //   title: "Attendances",
        //   path: "/app/attendances",
        //   icon: <PermContactCalendarIcon fontSize="small" />,
        //   permissions: ["admin", "academic"],
        // },
      ],
    },
    {
      title: "Administrator",
      permissions: ["admin"],
      items: [
        {
          title: "Users",
          path: "/app/users",
          icon: <UsersIcon fontSize="small" />,
          permissions: ["admin"],
          children: [
            {
              title: "Browse",
              path: "/app/users",
              permissions: ["admin"],
            },
            {
              title: "Create",
              path: "/app/users/new",
              permissions: ["admin"],
            },
          ],
        },
      ],
    },
  ];
}
