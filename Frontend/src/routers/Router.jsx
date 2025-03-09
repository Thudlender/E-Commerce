import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/Main";
import AdminLayout from "../layouts/AdminLayout"
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/index";
import Cart from "../pages/Cart/index";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import AdminPage from "../pages/Admin";
import ProductAdd from "../pages/Admin/ProductAdd";
import ManageItems from "../pages/ManageItems/index";
import ProtectPage from "../pages/ProtectPage";
import Protect from "../pages/ProtectPage/Protect"
import AdminRoute from "../ProtectedRoutes/AdminRoute";
import Alluser from "../pages/Admin/Alluser";
import CheckoutSuccess from "../pages/CheckoutSuccess";
import ManageOrders from "../pages/ManageOrders/index";
import ProfileInfo from "../pages/ProfileInfo";
import Settings from "../pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/",
        element: <Shop />,
      },
      {
        path: "/",
        element: (
          <ProtectPage>
            <Cart />
          </ProtectPage>
        ),
      },
      {
        path: "/signup",
        element:(
        <Protect>
           <SignUp />
        </Protect>
        ),
      },
      {
        path: "/signin",
        element:(
         <Protect>
             <SignIn />     
          </Protect>     
          ),
      },
      {
        path: "/profile",
        element: (
          <ProtectPage>
            <ProfileInfo />
          </ProtectPage>
        ),
      },
      {
        path: "/settings",
        element: (
          <ProtectPage>
            <Settings />
          </ProtectPage>
        ),
      },
      {
        path: "/checkout-success",
        element:(
          <CheckoutSuccess/>
        ),
      },
    ],
  },

  {
    path: "dashboard",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),

    children: [
      { path: "", element: <AdminPage /> },
      { path: "add-product", element: <ProductAdd /> },
      {
        path: "manage-orders",
        element: <ManageOrders />,
      },
      {
        path: "manage-items",
        element: <ManageItems />,
      },
      {
        path: "all-users",
        element: <Alluser />,
      },
    ],
  },
]);
export default router;
