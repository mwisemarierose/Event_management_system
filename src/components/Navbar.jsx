import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [navToggle, setNavToggle] = useState(false);
  const token = localStorage.getItem("token");
  const user  = localStorage.getItem("userData");
  const dt = JSON.parse(user)
  const navHandler = () => {
    setNavToggle((prevData) => !prevData);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/");
    window.location.reload();
  }
  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white">
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex items-center justify-between py-4">
          <Link
            to="/"
            className="text-black text-2xl font-bold flex items-center"
          >
            EventM.
          </Link>
          <div className="md:hidden">
            <button
              type="button"
              className={`hamburger-menu flex flex-col justify-between h-6 w-8 ${
                navToggle ? "hamburger-menu-change" : ""
              }`}
              onClick={navHandler}
            >
              <span className="block h-1 bg-black transition-transform duration-300"></span>
              <span className="block h-1 bg-black transition-transform duration-300"></span>
              <span className="block h-1 bg-black transition-transform duration-300"></span>
            </button>
          </div>
        </div>
        <div
          className={`md:flex md:items-center md:justify-between md:bg-transparent md:shadow-none md:static ${
            navToggle
              ? "block bg-dark shadow-md fixed top-0 left-0 h-full w-full"
              : "hidden"
          }`}
        >
          <div className="md:flex md:items-center md:justify-center md:w-full">
            <ul className="md:flex md:items-center md:ml-auto md:space-x-8">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-4 text-black hover:text-gray-400 md:hover:text-black md:py-0"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="block py-2 px-4 text-black hover:text-gray-400 md:hover:text-black md:py-0"
                >
                  Contacts
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="block py-2 px-4 text-black hover:text-gray-400 md:hover:text-black md:py-0"
                >
                  Events
                </Link>
              </li>
              {token ? (
                <>
                <li>
                  <Link
                    to="/login"
                    className="block py-2 px-4 text-black font-bold hover:text-gray-400 md:hover:text-black md:py-0"
                  >
                    Welcome {dt && dt.fullName}
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handleLogout}
                    className="block py-2 px-4 text-black hover:text-gray-400 md:hover:text-black md:py-0"
                  >
                    Logout
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="block py-2 px-4 text-black hover:text-gray-400 md:hover:text-black md:py-0"
                  >
                    Dashboard
                  </Link>
                </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="block py-2 px-4 text-black hover:text-gray-400 md:hover:text-black md:py-0"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="block py-2 px-4 text-black hover:text-gray-400 md:hover:text-black md:py-0"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
