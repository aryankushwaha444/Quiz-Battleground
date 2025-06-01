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

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Home", icon: <HomeIcon fontSize="small" /> },
    { label: "About Us", icon: <InfoIcon fontSize="small" /> },
    { label: "Join Quiz", icon: <CreateIcon fontSize="small" /> },
    { label: "Leaderboard", icon: <TrophyIcon fontSize="small" /> },
    { label: "Contact Us", icon: <ContactIcon fontSize="small" /> },
    { label: "Login", icon: <JoinIcon fontSize="small" /> }
  ];

  return (
    <nav className="bg-gray-900 text-white fixed top-0 left-0 w-full z-50 shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-lg font-bold"><a href="#" className="hover:text-red-500">QuizApp</a></div>

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
          className={`md:flex md:items-center md:space-x-6 absolute md:static bg-gray-900 w-full md:w-auto left-0 md:left-auto top-full md:top-auto transition-all duration-300 ${
            isOpen ? "block" : "hidden"
          } md:block`}
        >
          {menuItems.map(({ label, icon }) => (
            <li>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 hover:text-pink-400 active:text-red-700"
              >
                {icon}
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
