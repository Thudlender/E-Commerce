import Profile from "./Profile";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";
import useCart from "../hooks/useCart";
import Modal from "./Modal";
import UserIcon from "./icons/UserIcon";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const navItems = (
    <>
      <li>
        <a href="/">Home</a>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Category</summary>
          <ul>
            <li>
              <a href="/shop">All</a>
            </li>
            <li>
              <a href="/shop?category=clothing">Clothing</a>
            </li>
            <li>
              <a href="/shop?category=accessories">Accessories</a>
            </li>
            <li>
              <a href="/shop?category=gadget">Gadgets</a>
            </li>
            <li>
              <a href="/shop?category=swag">Swag</a>
            </li>
          </ul>
        </details>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Service</summary>
          <ul>
            <li>
              <a href="">Order online</a>
            </li>
            <li>
              <a href="">Order tracking</a>
            </li>
          </ul>
        </details>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Promotions</summary>
          <ul>
            <li>
              <a href="">All</a>
            </li>
            <li>
              <a href="">Clothing</a>
            </li>
            <li>
              <a href="">Accessories</a>
            </li>
            <li>
              <a href="">Gadgets</a>
            </li>
            <li>
              <a href="">Swag</a>
            </li>
          </ul>
        </details>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl" href="/">
            <img
              src="/SEsoftware.png"
              alt="Logo"
              className="h-6 lg:h-12 pr-1 mx-auto"
            />
            SE Software Shop
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              <Profile />
            </>
          ) : (
            <>
              <button
                className="btn btn-link"
                onClick={() => document.getElementById("login").showModal()}
              >
                <UserIcon className="w-6 h-6" />
                Login
              </button>
            </>
          )}
        </div>
        <Modal name="login" />
      </div>
    </div>
  );
};

export default Navbar;
