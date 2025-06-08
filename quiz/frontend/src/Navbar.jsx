import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./Auth/AuthContext.jsx";

import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Create as CreateIcon,
  Login as JoinIcon,
  EmojiEvents as TrophyIcon,
  Info as InfoIcon,
  ContactMail as ContactIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const dropdownRef = useRef();

  useEffect(() => {
    setIsOpen(false); // Close menu when route changes
  }, [location.pathname]);

  const menuItems = [
    { label: "Home", path: "/", icon: <HomeIcon fontSize="small" /> },
    { label: "About Us", path: "/about", icon: <InfoIcon fontSize="small" /> },
    {
      label: "Play Quiz",
      path: isAuthenticated ? "/join-quiz" : "/login",
      icon: <CreateIcon fontSize="small" />,
    },

    ...(isAuthenticated
      ? [
          {
            label: "Leaderboard",
            path: "/leaderboard",
            icon: <TrophyIcon fontSize="small" />,
          },
        ]
      : []),
    {
      label: "Contact Us",
      path: "/contact",
      icon: <ContactIcon fontSize="small" />,
    },
    ...(!isAuthenticated
      ? [
          {
            label: "Login",
            path: "/login",
            icon: <JoinIcon fontSize="small" />,
          },
        ]
      : []),
  ];

  return (
    <nav className="bg-gray-900 text-white fixed top-0 left-0 w-full z-50 shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold hover:text-red-500">
          Quizzy
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex md:items-center md:space-x-2">
          {menuItems.map(({ label, path, icon }) => (
            <li key={`${label}-${path}`}>
            <Link
                to={path}
                className={`flex items-center gap-2 px-4 py-2 transition duration-200 ${
                  location.pathname === path
                    ? "text-red-400 font-semibold"
                    : "text-gray-300 hover:text-red-400"
                }`}
              >
                {icon}
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>


              {/* Menu Icon - Mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none"
        >
          <MenuIcon fontSize="large" />
        </button>
      </div>

        {/* User Avatar */}
        {isAuthenticated && (
          <div className="relative ml-4 group md:block" ref={dropdownRef}>
            <button className="focus:outline-none hover:text-red-400">
              <PersonIcon fontSize="large" />
            </button>

            <div className="group-hover:block hidden absolute right-0 mt-2 w-64 bg-white text-black shadow-lg rounded-2xl p-4 z-50 text-center">
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="User"
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
              ) : (
                <AccountCircleIcon
                  className="text-gray-400 mx-auto mb-4"
                  style={{ fontSize: 80 }}
                />
              )}

              <p className="font-semibold text-gray-800">
                {user?.name || "Username"}
              </p>
              <p className="text-sm text-gray-500">
                {user?.email || "example@example.com"}
              </p>

              <button
                onClick={logout}
                className="mt-4 bg-indigo-400 text-white py-2 px-6 rounded-2xl hover:bg-red-600 hover:scale-105 cursor-alias transition-transform duration-300 flex items-center justify-center mx-auto"
              >

                <LogoutIcon className="mr-1" /> Logout
              </button>
            </div>
          </div>
        )}
      </div>



      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <ul className="flex flex-col space-y-2 p-4">
            {menuItems.map(({ label, path, icon }) => (
            <li key={path}>
                <Link
                  to={path}
                  className={`flex items-center gap-2 px-2 py-2 transition duration-200 ${
                    location.pathname === path
                      ? "text-red-400 font-semibold"
                      : "text-gray-300 hover:text-red-400"
                  }`}
                  onClick={() => setIsOpen(false)} // Close after click
                >
                  {icon}
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
