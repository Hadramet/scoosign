import {
  DocumentText as DocumentTextIcon,
  Calendar as CalendarIcon,
  ChartBar as ChartBarIcon,
  Home as HomeIcon,
  UserCircle as UserCircleIcon,
  Users as UsersIcon,
} from "../icons";
import ClassIcon from "@mui/icons-material/Class";

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
        {
          title: "Analytics",
          path: "/app/analytics",
          icon: <ChartBarIcon fontSize="small" />,
          permissions: ["all"],
        },
        {
          title: "Calendar",
          path: "/app/calendar",
          icon: <CalendarIcon fontSize="small" />,
          permissions: ["all"],
        },
        {
          title: "Documents",
          path: "/app/documents",
          icon: <DocumentTextIcon fontSize="small" />,
          permissions: ["all"],
        },
        {
          title: "Account",
          path: "/app/account",
          icon: <UserCircleIcon fontSize="small" />,
          permissions: ["all"],
        },
      ],
    },
    {
      title: "Management",
      permissions: ["admin"],
      items: [
        {
          title: "Users",
          path: "/app/users",
          icon: <UsersIcon fontSize="small" />,
          permissions: ["admin"],
          children: [
            {
              title: "Browse users",
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
        {
          title: "Class",
          path: "/app/class",
          icon: <ClassIcon fontSize="small" />,
          permissions: ["admin"],
          children: [
            {
              title: "Browse",
              path: "/app/class",
              permissions: ["admin"],
            },
            {
              title: "Create",
              path: "/app/class/new",
              permissions: ["admin"],
            },
          ],
        },
      ],
    },
  ];
}
