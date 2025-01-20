import CreateAdmin from "../pages/admin/CreateAdmin";
import StudentDashboard from "../pages/admin/StudentDashboard";

export const studentPath = [
    {
      name: 'Dashboard',
      path: 'dashboard',
      element: <StudentDashboard />,
    },
    {
      name: 'Student Management',
      children: [
        {
          name: 'Create Admin',
          path: 'create-admin',
          element: <CreateAdmin />,
        },
        
      ],
    },
  ];