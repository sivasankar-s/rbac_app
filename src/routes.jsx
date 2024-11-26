import { createBrowserRouter } from "react-router-dom";
import ManageRoles from "./pages/ManageRoles";
import Layout from "./Layout";
import ManageUsers from "./pages/ManageUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "manageUsers", element: <ManageUsers /> },
      { path: "manageRoles", element: <ManageRoles /> },
      { index: true, element: <ManageUsers /> },
    ],
  },
]);

export default router;
