import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./Auth/AuthContext";

// MUI Icons
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Create as CreateIcon,
  Login as JoinIcon,
  EmojiEvents as TrophyIcon,
  Info as InfoIcon,
  ContactMail as ContactIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth(); // ⬅️ access auth state and logout function

  const menuItems = [
    { label: "Home", path: "/", icon: <HomeIcon fontSize="small" /> },
    { label: "About Us", path: "/about", icon: <InfoIcon fontSize="small" /> },
    { label: "Play Quiz", path: "/join-quiz", icon: <CreateIcon fontSize="small" /> },
    ...(isAuthenticated
      ? [
          {
            label: "Leaderboard",
            path: "/leaderboard",
            icon: <TrophyIcon fontSize="small" />,
          },
        ]
      : []),
    { label: "Contact Us", path: "/contact", icon: <ContactIcon fontSize="small" /> },
    ...(!isAuthenticated
      ? [
          {
            label: "Login lobby",
            path: "/login",
            icon: <JoinIcon fontSize="small" />,
          },
        ]
      : []),
  ];

  return (
    <nav className="bg-gray-900 text-white fixed top-0 left-0 w-full z-50 shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-lg font-bold">
          <Link to="/" className="hover:text-red-500">Quizzy</Link>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <MenuIcon />
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`md:flex md:items-center md:space-x-1 absolute md:static bg-gray-900 w-full md:w-auto left-0 md:left-auto top-full md:top-auto transition-all duration-300 ${
            isOpen ? "block" : "hidden"
          } md:block`}
        >
          {menuItems.map(({ label, path, icon }) => (
            <li key={label}>
              <Link
                to={path}
                className={`flex items-center gap-2 px-4 py-2 transition-all duration-200 ${
                  location.pathname === path ? "text-red-400 font-semibold" : ""
                }`}
              >
                {icon}
                {label}
              </Link>
            </li>
          ))}

          {/* Logout Button (only when authenticated) */}
          {isAuthenticated && (
            <li>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-indigo-400 font-semibold hover:text-red-600 cursor-alias transition"
              >
                <LogoutIcon fontSize="small" />
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
