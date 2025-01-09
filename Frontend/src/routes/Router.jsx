import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/Main";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/index";
import Home from "../pages/Home/index";
import Cart from "../pages/Cart/index";
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
        element: <Cart />,
      },
    ],
  },
]);
export default router;
