import { useState } from "react";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Create as CreateIcon,
  Login as JoinIcon,
  EmojiEvents as TrophyIcon,
  Info as InfoIcon,
  ContactMail as ContactIcon,
} from "@mui/icons-material";
import Footer from "./footer";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Home", path: "/", icon: <HomeIcon fontSize="small" /> },
    { label: "About Us", path: "/about", icon: <InfoIcon fontSize="small" /> },
    {
      label: "Join Quiz",
      path: "/join-qui",
      icon: <CreateIcon fontSize="small" />,
    },
    {
      label: "Leaderboard",
      path: "/leaderboard",
      icon: <TrophyIcon fontSize="small" />,
    },
    {
      label: "Contact Us",
      path: "/contact",
      icon: <ContactIcon fontSize="small" />,
    },
    { label: "Login", path: "/login", icon: <JoinIcon fontSize="small" /> },
  ];

  return (
    <nav className="bg-gray-900 text-white fixed top-0 left-0 w-full z-50 shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-lg font-bold">
          <Link to="/" className="hover:text-red-500">
            QuizApp
          </Link>
        </div>

        {/* Hamburger Icon for small screens */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <MenuIcon />
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`md:flex lg:items-center md:space-x-1 absolute md:static bg-gray-900 w-full md:w-auto left-0 md:left-auto top-full md:top-auto transition-all duration-300 ${
            isOpen ? "block" : "hidden"
          } md:block`}
        >
          {menuItems.map(({ label, path, icon }) => (
            <li key={label}>
              <Link
                to={path}
                className="flex items-center gap-2 px-4 py-2 hover:text-pink-400 active:text-red-700"
              >
                {icon}
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
