import CreateAdmin from "../pages/admin/userManagement/CreateAdmin";
import FacultyDashboard from "../pages/admin/FacultyDashboard";

export const facultyPath = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard />,
  },
  {
    name: "Fac Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
    ],
  },
];
