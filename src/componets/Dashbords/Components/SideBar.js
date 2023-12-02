
import React from "react";
import '../../Dashbords/Dashboard.css'
import { TbUserEdit } from "react-icons/tb";
import {
  BsCart,
  BsCarts3,
  BsFillArchiveFill,
  BsFillBellFill,
  BsFillPersonFill,
  BsGrid1X2Fill,
  BsList,
  BsListCheck,
  BsOutlet,
} from "react-icons/bs";
import Headers from "./Headers";
import { Link } from "react-router-dom";
import Navbar from "../../navigationBar/navbar";
import authService from "../../Services/authService";
import DashboardHome from "./DashboardHome";
import ClientDash from "../ClientsPages/Clients";

function SideBar(props) {

  const logoutclick = ()=>{
      authService.logOut()
  }
  return (
    <div>
      <Navbar/>
        <div className="grid-container">
        
        <Headers />
        <aside className="sidebar">
          <div className="sidebar-title">
            <div className="sidebar-brand">
              <BsListCheck className="icon_header" /> Book
            </div>
            <span className="icon close_icon">x</span>
          </div>
          <ul className="sidebar-list">
            <li className="sidebar-list-item">
            <Link to="/Dashboard/Home" className="text">
            <BsGrid1X2Fill className="icon_header" /> Dashboard
          </Link>
            </li>
            <li className="sidebar-list-item">
              <Link to="/Dashboard/" className="text">
                <BsList className="icon_header" /> Rooms Available
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link to="/Dashboard/" className="text">
                <BsFillBellFill className="icon_header" /> Notifications
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link to="/Dashboard/" className="text">
                <BsFillPersonFill className="icon_header" /> Profile
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link to="/Dashboard/" className="text">
              <TbUserEdit  className="icon_header" /> Action
              </Link>
            </li>
            <li className="sidebar-list-item">
             <button onClick={logoutclick}>
             <Link to="/Dashboard/" className="text">
                <BsOutlet className="icon_header" /> Logout
              </Link>
             </button>
            </li>
          </ul>
  
        </aside>
        <div className="user-tables">
          <DashboardHome/>
          <ClientDash/>
        </div>
      </div>
    </div>
  );
}

export default SideBar;