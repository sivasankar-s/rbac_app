import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
// import ManageUser from "./pages/ManageUsers";
import ManageRoles from "./pages/ManageRoles";
import Layout from "./Layout";
import ManageUsers from "./pages/ManageUsers";


const router = createBrowserRouter([
    {path: '/', element: <Layout />,
        children: [
            {path: 'manageUsers', element: <ManageUsers />},
            {path: 'manageRoles', element: <ManageRoles />},
            {index: true, element: <ManageUsers />},
        ]
    },
    // {path: '/login', element: <Login />},
   

])

export default router;
