import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./Auth/AuthContext";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Create as CreateIcon,
  Login as JoinIcon,
  EmojiEvents as TrophyIcon,
  Info as InfoIcon,
  ContactMail as ContactIcon,
  AccountCircle as AccountIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const menuItems = [
    { label: "Home", path: "/", icon: <HomeIcon fontSize="small" /> },
    { label: "About Us", path: "/about", icon: <InfoIcon fontSize="small" /> },
    {
      label: "Play Quiz",
      path: "/join-quiz",
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
        <div className="text-xl font-bold">
          <Link to="/" className="hover:text-red-500">
            Quizzy
          </Link>
        </div>

        {/* Hamburger for mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <MenuIcon />
          </button>
        </div>

        {/* Nav links */}
        <ul
          className={`md:flex md:items-center md:space-x-4 absolute md:static bg-gray-900 w-full md:w-auto left-0 md:left-auto top-full md:top-auto transition-all duration-300 ${
            isOpen ? "block" : "hidden"
          } md:block`}
        >
          {menuItems.map(({ label, path, icon }) => (
            <li key={path}>
              <Link
                to={path}
                className={`flex items-center gap-2 px-4 py-2 transition duration-200 ${
                  location.pathname === path
                    ? "text-red-400 font-semibold"
                    : "text-gray-300 hover:text-red-400"
                }`}
              >
                {icon}
                <span className="ml-2">{label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {isAuthenticated && (
          <div className="relative ml-4 group" ref={dropdownRef}>
            <button
              className="focus:outline-none hover:text-red-400"
              type="button"
            >
              <PersonIcon fontSize="large" />
            </button>

            <div className=" group-hover:block hidden absolute right-0 mt-2 w-64 bg-white text-black shadow-lg rounded-2xl p-4 z-50 flex-col items-center">
              <img
                src={user?.profilePicture || "https://via.placeholder.com/80"}
                alt="User"
                className="w-20 h-20  ml-20 rounded-full object-fill mb-4 items-center"
              />

              <div className="mb-4 text-center">
                <p className="font-semibold text-gray-800">
                  {user?.name || "Username"}
                </p>
                <p className="text-sm text-gray-500">
                  {user?.email || "user@example.com"}
                </p>
              </div>

              <button
                onClick={logout}
                className="bg-indigo-400 text-white py-2 px-6 ml-12 rounded-2xl hover:bg-red-600 hover:scale-105 transition-transform duration-300 flex items-center justify-center"
                type="button"
              >
                <LogoutIcon className="mr-1" /> Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
