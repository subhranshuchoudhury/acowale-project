import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user] = useState({
    role: "guest",
  });

  const guestLinks = [
    { name: "Home", path: "/" },
    { name: "News", path: "/news" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav>
        <div className="logo">
          <Link to="/">AcoNews</Link>
        </div>
        {/* Mobile Menu Icon */}
        <div className="menu-icon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </div>
        {/* Links */}
        <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          {user &&
            guestLinks.map((link, index) => (
              <li key={index} onClick={closeMobileMenu}>
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
        </ul>
      </nav>

      {/* Mobile Menu Animation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.ul
            className="nav-links active"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
          >
            {guestLinks.map((link, index) => (
              <li key={index} onClick={closeMobileMenu}>
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
