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
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import HistoryIcon from '@mui/icons-material/History';
export function getSections(t) {
  return [
    {
      title: "General",
      permissions: ["all"],
      items: [
        {
          title: "Dashboard",
          path: "/app",
          icon: <HomeIcon fontSize="small" />,
          permissions: ["all"],
        },
        // {
        //   title: "History",
        //   path: "/app/history",
        //   icon: <HistoryIcon fontSize="small" />,
        //   permissions: ["all"],
        // },
        // {
        //   title: "Account",
        //   path: "/app/account",
        //   icon: <UserCircleIcon fontSize="small" />,
        //   permissions: ["all"],
        // },
        // {
        //   title: "Calendar",
        //   path: "/app/calendar",
        //   icon: <CalendarIcon fontSize="small" />,
        //   permissions: ["all"],
        // }

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
        
      ],
    },
    {
      title: "School",
      permissions: ["admin", "academic"],
      items: [
        {
          title: "Students",
          path: "/app/students",
          icon: <SchoolIcon fontSize="small" />,
          permissions: ["admin", "academic"],
        },
        {
          title: "Teachers",
          path: "/app/teachers",
          icon: <SupervisedUserCircleIcon fontSize="small" />,
          permissions: ["admin", "academic"],
        },
        {
          title: "Groups",
          path: "/app/groups",
          icon: <GroupsIcon fontSize="small" />,
          permissions: ["admin", "academic"],
        },
        {
          title: "Courses",
          path: "/app/courses",
          icon: <ClassIcon fontSize="small" />,
          permissions: ["admin", "academic"],
        },
        {
          title: "Attendances Certificate",
          path: "/app/attendances",
          icon: <ReceiptLongIcon fontSize="small" />,
          permissions: ["admin", "academic"],
        },
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
