import React from "react";
import SideBar from "../components/sidebarDash/SideBar";
import NavbarDash from "../components/navbarDash/NavbarDash";
import Booking from "../components/bookingtable/Booking";
import "./List.scss";
function AllList(props) {
  return (
    <div className="list">
      <SideBar />

      <div className="listcontainer">
        <NavbarDash />
        <Booking />
      </div>
    </div>
  );
}

export default AllList;
