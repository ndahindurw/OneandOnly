import React from 'react';
import { Link } from 'react-router-dom';
import "../home/home.css";
import image0 from "../../assets/RRAImage.jpg";

function Navbar() {
        

    return (
    
                    <div className="header">
                    <img className="logo1" src={image0} alt="Logo" />
                    <h1 className="logo">
                        <span className="first">Rwanda</span>
                        <span className="second"> Revenue</span>{" "}
                        <span className="teritiary">Authority</span>
                    </h1>
                    <nav>
                        <ul>
                        <li><Link to="/Home" exact>Home</Link></li>
                        <li><Link to="/Contacts" exact>Contacts</Link></li>
                        <li><Link to="/availableRoom" exact>Bookings</Link></li>
                        <li><Link to="/Dashboard" exact>Dashboard</Link></li>
                        <li><Link to="/" exact>Login</Link></li>                      
                        </ul>
                    </nav>
                </div>

        
    );
}

export default Navbar;