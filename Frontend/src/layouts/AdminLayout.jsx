import React,{ useContext } from "react";
import { AuthContext } from "../contexts/auth.context";
import logo from "/SEsoftware.png"
import { GiAbstract005 } from "react-icons/gi";
import { TbDashboardFilled } from "react-icons/tb";
import { IoMdAddCircle } from "react-icons/io";
import { GiAfterburn } from "react-icons/gi";
import { GiExecutionerHood } from "react-icons/gi";
import { GiLockedChest } from "react-icons/gi";
import { GiMedievalBarracks } from "react-icons/gi";
import { GiNunFace } from "react-icons/gi";
import { GiSkullInJar } from "react-icons/gi";
import { Outlet } from "react-router";
import Swal from "sweetalert2";
const AdminLayout = () => {
  const isAdmin = true;
  const { logout, user } = useContext(AuthContext);
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    })
  }
  return (
    <>
      {isAdmin ? (
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}
            <Outlet />
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <li>
                <a href="/dashboard" className="flex justify-start mb-3">
                  <img src={logo} className="w-20" />
                  <p className="ml-2 border-spacing-6 font-bold badge-success rounded-md p-2">{user.displayName}</p>
                  <div className="badge badge-primary">Admin</div>
                </a>
              </li>
              <li>
  <button
    onClick={() => handleLogout(logout)}
    className="flex items-center justify-start w-full px-4 py-2 text-red-500 bg-red-100 border border-red-500 rounded-md shadow-sm hover:bg-red-500 hover:text-white transition duration-300"
  >
    {/* Icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 mr-2"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm9 8a1 1 0 100 2h4a1 1 0 000-2h-4z"
        clipRule="evenodd"
      />
    </svg>
    {/* Text */}
    Logout
  </button>
</li>
              <div class="relative flex py-5 items-center">
                <div class="flex-grow border-t border-gray-400"></div>
                <span class="flex-shrink mx-4 text-gray-400">Menu</span>
                <div class="flex-grow border-t border-gray-400"></div>
              </div>
              <li>
                <a>
                <TbDashboardFilled />
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/dashboard/manage-orders">
                  <GiAbstract005 />
                  Manage Orders
                </a>
              </li>
              <li>
                <a href="/dashboard/add-product">
                <IoMdAddCircle />
                  Add Product
                </a>
              </li>
              <li>
                <a href="/dashboard/manage-items">
                  <GiAfterburn />
                  Manage Items
                </a>
              </li>
              <li>
                <a href="/dashboard/all-users">
                  <GiExecutionerHood />
                  All Users
                </a>
              </li>

              <div class="relative flex py-5 items-center">
                <div class="flex-grow border-t border-gray-400"></div>
                <span class="flex-shrink mx-4 text-gray-400">Menu</span>
                <div class="flex-grow border-t border-gray-400"></div>
              </div>

              <li>
                <a href="/">
                  <GiLockedChest />
                  home
                </a>
              </li>
              <li>
                <a>
                  <GiMedievalBarracks />
                  Product
                </a>
              </li>
              <li>
                <a>
                  <GiNunFace />
                  Oders tracking
                </a>
              </li>
              <li>
                <a>
                  <GiSkullInJar />
                  Customer Support
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div>you are not admin</div>
      )}
    </>
  );
};

export default AdminLayout;