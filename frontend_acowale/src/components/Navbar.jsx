import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "../styles/navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [user, setuser] = useState({
    role: "guest",
  });

  const guestLinks = [
    { name: "Home", path: "/" },
    { name: "News", path: "/news" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav>
        <div className="logo">
          <Link to="/">Acowale GNews</Link>
        </div>
        <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          {user &&
            guestLinks.map((link, index) => (
              <li key={index} onClick={closeMobileMenu}>
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
        </ul>
        <div className="menu-icon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
