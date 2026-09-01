import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth/AuthContext.jsx";

import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Create as CreateIcon,
  Login as JoinIcon,
  EmojiEvents as TrophyIcon,
  Info as InfoIcon,
  ContactMail as ContactIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, user, logout } = useAuth();

  // Mobile menu state
  const [isOpen, setIsOpen] = useState(false);

  // Profile dropdown state
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Reference for the complete navbar
  const navbarRef = useRef(null);

  /*
   * Logout
   */
  const logouthandler = () => {
    logout();

    // Close both menus
    setIsOpen(false);
    setIsProfileOpen(false);

    navigate("/");
  };

  /*
   * Close menus when route changes
   */
  useEffect(() => {
    setIsOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  /*
   * Close hamburger/profile dropdown when clicking outside navbar
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /*
   * Navigation items
   */
  const menuItems = [
    {
      label: "Home",
      path: "/",
      icon: <HomeIcon fontSize="small" />,
    },

    {
      label: "About Us",
      path: "/about",
      icon: <InfoIcon fontSize="small" />,
    },

    {
      label: "Play Quiz",
      path: isAuthenticated ? "/quiz" : "/login",
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

  /*
   * Toggle mobile hamburger
   */
  const handleMenuToggle = () => {
    setIsOpen((prev) => !prev);

    // Close profile when hamburger is opened
    setIsProfileOpen(false);
  };

  /*
   * Toggle profile dropdown
   */
  const handleProfileToggle = () => {
    setIsProfileOpen((prev) => !prev);

    // Close hamburger when profile is opened
    setIsOpen(false);
  };

  return (
    <nav
      ref={navbarRef}
      className="bg-gray-900 text-white fixed top-0 left-0 w-full z-50 shadow"
    >
      {/* =========================
          MAIN NAVBAR
      ========================== */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* =========================
            LOGO
        ========================== */}
        <Link
          to="/"
          className="text-xl font-bold hover:text-red-500 transition"
          onClick={() => {
            setIsOpen(false);
            setIsProfileOpen(false);
          }}
        >
          Quizzy
        </Link>

        {/* =========================
            DESKTOP NAVIGATION
        ========================== */}
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

        {/* =========================
            RIGHT SIDE
        ========================== */}
        <div className="flex items-center gap-3">
          {/* =========================
              MOBILE HAMBURGER
          ========================== */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={handleMenuToggle}
              className="focus:outline-none text-white hover:text-red-400 transition"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              <MenuIcon fontSize="large" />
            </button>
          </div>

          {/* =========================
              USER PROFILE
          ========================== */}
          {isAuthenticated && (
            <div className="relative">
              {/* Avatar Button */}
              <button
                type="button"
                onClick={handleProfileToggle}
                className="focus:outline-none hover:text-red-400 transition flex items-center justify-center"
                aria-label="User profile"
                aria-expanded={isProfileOpen}
              >
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="User profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-500 hover:border-red-400 transition"
                  />
                ) : (
                  <AccountCircleIcon
                    style={{ fontSize: 40 }}
                    className="text-gray-300 hover:text-red-400 transition"
                  />
                )}
              </button>

              {/* =========================
                  PROFILE DROPDOWN
              ========================== */}
              {isProfileOpen && (
                <div
                  className="
                    absolute
                    right-0
                    mt-3
                    w-64
                    bg-white
                    text-black
                    shadow-2xl
                    rounded-2xl
                    p-5
                    z-[100]
                  "
                >
                  {/* Profile Image */}
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="User profile"
                      className="
                        w-20
                        h-20
                        rounded-full
                        mx-auto
                        mb-4
                        object-cover
                        border-2
                        border-gray-200
                      "
                    />
                  ) : (
                    <AccountCircleIcon
                      className="text-gray-400 mx-auto mb-4"
                      style={{ fontSize: 80 }}
                    />
                  )}

                  {/* Username */}
                  <p className="font-semibold text-gray-800 text-center">
                    {user?.name || "Username"}
                  </p>

                  {/* Email */}
                  <p className="text-sm text-gray-500 text-center break-words mt-1">
                    {user?.email || "example@example.com"}
                  </p>

                  {/* Logout */}
                  <button
                    type="button"
                    onClick={logouthandler}
                    className="
                      mt-4
                      bg-indigo-500
                      text-white
                      py-2
                      px-6
                      rounded-2xl
                      hover:bg-red-600
                      hover:scale-105
                      cursor-pointer
                      transition-all
                      duration-300
                      flex
                      items-center
                      justify-center
                      mx-auto
                    "
                  >
                    <LogoutIcon className="mr-1" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* =========================
          MOBILE MENU
      ========================== */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 shadow-lg">
          <ul className="flex flex-col space-y-2 p-4">
            {menuItems.map(({ label, path, icon }) => (
              <li key={`${label}-${path}`}>
                <Link
                  to={path}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition duration-200 ${
                    location.pathname === path
                      ? "text-red-400 bg-gray-700 font-semibold"
                      : "text-gray-300 hover:text-red-400 hover:bg-gray-700"
                  }`}
                  onClick={() => {
                    setIsOpen(false);
                    setIsProfileOpen(false);
                  }}
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
