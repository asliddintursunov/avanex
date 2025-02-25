import RootLayout from "../layout/RootLayout";
import ProtectedRoute from "./ProtectedRoute";

// Pages
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import Dashboard from "../pages/Dashboard";
import SalesOrder from "../pages/SalesOrder";
import Sale from "../pages/Sale";
import ReturnedSales from "../pages/ReturnedSales";
import Debtors from "../pages/Debtors";
import TotalSales from "../pages/TotalSales";
import Warehouse from "../pages/Warehouse";
import ClientsList from "../pages/ClientsList";

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
          {
            path: "/sales-order",
            element: <SalesOrder />,
          },
          {
            path: "/sale",
            element: <Sale />,
          },
          {
            path: "/returned-sales",
            element: <ReturnedSales />,
          },
          {
            path: "/debtors",
            element: <Debtors />,
          },
          {
            path: "/total-sales",
            element: <TotalSales />,
          },
          {
            path: "/warehouse",
            element: <Warehouse />,
          },
          {
            path: "/clients-list",
            element: <ClientsList />,
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
