import React from "react";
import Card from "./Card";
import Navbar from "../navigationBar/navbar";
import { image2, image4, image5 } from "../images";
import DateSchuderer from "./DateSchuderer";

const RoomContainer = () => {
  const room1 = {
    title: "Meeting Room 1",
    description: "A spacious meeting room for collaboration.",
    facilities: ["Wi-Fi", "Projector"],
    address: "Floor 1",
    imageSrc: image4,
    status: "Available",
    bookedBy: "Sales Department",
  };

  const room2 = {
    title: "Conference Room",
    description: "A conference room with advanced audiovisual equipment.",
    facilities: ["Wi-Fi", "Video Conferencing"],
    address: "Floor 2",
    imageSrc: image2,
    status: "Occupied",
    bookedBy: "Marketing Department",
  };
  const room3 = {
    title: "Meeting Room",
    description: "A conference room with advanced audiovisual equipment.",
    facilities: ["Wi-Fi", "Video Conferencing"],
    address: "Floor 2",
    imageSrc: image5,
    status: "Occupied",
    bookedBy: "Marketing Department",
    purpose:'...purpose'
  };

  return (
    <div>
        <Navbar/>
        <div className="header-room">
            <h1>
                All You Preference Chose Your Room Here
            </h1>
            
        </div>
        
        <DateSchuderer/>
      <Card {...room1} />


    </div>
  );
};

export default RoomContainer;
