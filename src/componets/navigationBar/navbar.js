import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../home/home.css';
import image0 from '../../assets/RRAImage.jpg';
import authService from '../Services/authService';

function Navbar() {
  const { isLoggedIn, logOut } = authService;
  const [isUserLogged, setIsUserLogged] = useState(isLoggedIn);

  const handleLogout = () => {
    logOut();
    setIsUserLogged(!isLoggedIn);
  };

  return (
    <div className="header">
      <div className='logoBg'>
        <img className="logo1" src={image0} alt="Logo" />
        <h1 className="logo">
          <span className="first">Rwanda</span>
          <span className="second"> Revenue</span> <span className="tertiary">Authority</span>
        </h1>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/ContactsPage">Contacts</Link>
          </li>
          {isUserLogged ? (
            <>
              <li>
                <Link to="/" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/Login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
