import React, {useState} from "react";
import {Link} from "react-router-dom";
import "../home/home.css";
import image0 from "../../assets/RRAImage.jpg";
import authService from "../Services/authService";
import {image7, logo} from "../images";

function Navbar() {
  const {isLoggedIn, logOut} = authService;
  const [isUserLogged, setIsUserLogged] = useState(isLoggedIn);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut();
    setIsUserLogged(!isLoggedIn);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <img className="logo-image" src={logo} alt="Logo" />
          <h1 className="logo-text">
            <span className="primary">One&Only</span>
            <span className="secondary">Hotel</span>
            <span className="tertiary">booking Room</span>
          </h1>
        </div>
        <button className="menu-toggle" onClick={toggleMobileMenu}>
          ☰
        </button>
        <nav className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/ContactsPage" onClick={() => setIsMobileMenuOpen(false)}>
                Contacts
              </Link>
            </li>
            {isUserLogged ? (
              <li>
                <Link to="/" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/Login" onClick={() => setIsMobileMenuOpen(false)}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
