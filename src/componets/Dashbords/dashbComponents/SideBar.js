
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

function SideBar(props) {
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
              <Link to="/" className="text">
                <BsGrid1X2Fill className="icon_header" /> Dashbord
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link to="/" className="text">
                <BsList className="icon_header" /> Rooms Available
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link to="/" className="text">
                <BsFillBellFill className="icon_header" /> Notifications
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link to="/" className="text">
                <BsFillPersonFill className="icon_header" /> Profile
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link to="/" className="text">
              <TbUserEdit  className="icon_header" /> Action
              </Link>
            </li>
            <li className="sidebar-list-item">
              <Link to="/" className="text">
                <BsOutlet className="icon_header" /> Logout
              </Link>
            </li>
          </ul>
  
        </aside>
      </div>
    </div>
  );
}

export default SideBar;