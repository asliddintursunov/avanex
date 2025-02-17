import RootLayout from "../layout/RootLayout";
import ProtectedRoute from "./ProtectedRoute";

// Pages
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import Dashboard from "../pages/Dashboard";

export const Routes = [
  {
    path: "/",
    element: <ProtectedRoute allowedRoles={[""]} />,
    children: [
      {
        path: "/",
        element: <RootLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
