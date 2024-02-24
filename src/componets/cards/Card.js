import React, { useEffect, useState } from "react";
import axios from "axios";
import authService from "../Services/authService";
import axiosInstance from "../../Axios/axios";
import "./Card.css";
import { IoInformationCircleOutline } from "react-icons/io5";
import RoomReviewCard from "./RoomReviewCard";

const Card = ({ bookedHours }) => {
  const [error, setError] = useState(null);
  const [roomData, setRoomData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [inptform, setInptForm] = useState([]);
  const [bookingsData, setBookingsData] = useState([]);
  const [clickedRoom, setClickedRoom] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = authService.getToken();

      if (!storedToken) {
        setError("User not authenticated.");
        return;
      }

      try {
        const response = await axios.get(
          process.env.REACT_APP_FETCH_EVENTS,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        const data = response.data;
        setBookingsData(data);
      } catch (error) {
        console.error("Error fetching bookings data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = authService.getToken();

        if (!storedToken) {
          setError("User not authenticated.");
          return;
        }

        const roomResponse = await axiosInstance.get(
          process.env.REACT_APP_FETCH_EVENTS
        );

        const userResponse = await axiosInstance.get(
          process.env.REACT_APP_FETCH_USER_DATA_URL
        );

        const roomData = roomResponse.data;
        const userData = userResponse.data;

        setRoomData(roomData);
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data.");
      }
    };

    fetchData();
  }, []);

  console.log("Room Booking Information", roomData);

  return (
    <div className="card" id="bookingForm">
      <div className="room-review-card-container">
        <RoomReviewCard
          roomData={roomData}
          bookedHours={bookedHours}
          clickedRoom={clickedRoom}
          inptform={inptform}
        />
      </div>
      <div className="cardContainer">
        {roomData.map((room) => (
           <div key={room.bookingID} className="cardContainer" onClick={() => setClickedRoom(room)}>
            <div className="all-info">
              <h2>{room.name}</h2>
              <p>Location: {room.location}</p>
              <p>Booking Info:</p>
              <ul>
                <li>Booking ID: {room.bookingID}</li>
                <li>Start Time: {room.startTime}</li>
                <li>End Time: {room.endTime}</li>
                <li>Purpose: {room.purpose}</li>
                <li>Status: {room.status}</li>
              </ul>
              <p>User who Booked Info:</p>
              <ul>
                {/* <li>Email: {room.user.username || ""}</li> */}
                {/* <li>Full Name: {room.user.fullnames}</li> */}
                {/* Add more user details as needed */}
              </ul>
              {/* Conditional rendering to display a message if the room is booked */}
              {room.status === "CONFIRMED" && (
                <p style={{ color: "green" }}>This room is currently booked.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
