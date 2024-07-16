import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

function Navbar() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navItems = ["Home", "Uploads", "Converter", "Guides", "Contact"];

  const handleLogout = () => {
    setIsLoggedIn(false);
    console.log("Logout successful!");
  };

  return (
    <nav className="bg-gray-800 p-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-2xl">
          <Link to="/" className="flex items-center">
            <Logo className="w-10 h-10 mr-2" />
          </Link>
        </div>
        <ul className="hidden md:flex space-x-3">
          {navItems.map((item) => {
            const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
            const isActive = location.pathname === path;
            return (
              <li key={item}>
                <Link
                  to={path}
                  className={`px-4 py-3 rounded-md text-lg font-medium transition duration-300 ease-in-out hover:bg-gray-700 ${
                    isActive
                      ? "text-blue-500 hover:text-blue-400"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex space-x-2">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
