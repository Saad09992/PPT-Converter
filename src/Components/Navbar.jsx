import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

function Navbar() {
  const location = useLocation();

  const handleSignUp = (e) => {
    e.preventDefault();
    alert("SignUp Not available yet");
  };

  const navItems = ["Home", "Converter", "Contact"];

  return (
    <nav className="bg-gray-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
        </div>
        <ul className="hidden md:flex space-x-1">
          {navItems.map((item) => {
            const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
            const isActive = location.pathname === path;
            return (
              <li key={item}>
                <Link
                  to={path}
                  className={`px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out hover:bg-gray-700 ${
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
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleSignUp}
        >
          Sign In
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
