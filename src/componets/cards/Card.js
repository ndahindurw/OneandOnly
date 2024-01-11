import React, { useEffect, useState } from "react";
import axios from "axios";
import authService from "../Services/authService";
import axiosInstance from "../../Axios/axios";
import "./Card.css";
import { Calendar, TimeGrid, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import Booking from "../DashboardComponents/components/bookingtable/Booking";




const Card = ({ title, description, handleChange }) => {
  
  const [error, setError] = useState(null);
  const [selectedView, setSelectedView] = useState('dayGridMonth');
  const [selectedRoom, setSelectedRoom] = useState({
    roomID: "",
    userID: "",
    startTime: "",
    endTime: "",
    purpose: "",
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [roomData, setRoomData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [inptform, setInptForm] = useState([]);
  const userInfo = authService.getUserInfo();
  const [selectedRoomImage, setSelectedRoomImage] = useState('');
  const [messageTimeout, setMessageTimeout] = useState(null);


  // Function to clear messages after a certain duration
  const clearMessages = () => {
    setError(null);
    setSuccessMessage(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = authService.getToken();

        if (!storedToken) {
          setError("User not authenticated.");
          return;
        }

        const roomResponse = await axiosInstance.get(
          process.env.REACT_APP_FETCH_ROOMS
        );

        const userResponse = await axiosInstance.get(
          process.env.REACT_APP_FETCH_USER_DATA_URL
        );

        const roomData = roomResponse.data;
        const userData = userResponse.data;

        setRoomData(roomData);
        console.log("room DAta", roomData)
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data.");
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
        const response = await axiosInstance.get(
          process.env.REACT_APP_FETCH_EVENTS
        );

        setInptForm(response.data);
        console.log("Booked Room", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data.");
      }
    };

    fetchData();
  }, []);

  const handleChanges = (e) => {
    const value = e.target.name === 'roomID' ? parseInt(e.target.value, 10) : e.target.value;
    setSelectedRoom({ ...selectedRoom, [e.target.name]: value });
  
    const room = roomData.find((room) => room.roomID === value);
    if (room) {
      setSelectedRoomImage(room.imagePath);
    }
  };
  



  useEffect(() => {

    const userId = authService.getUserInfo().userId;
    setSelectedRoom((prevSelectedRoom) => ({
      ...prevSelectedRoom,
      userID: userId,
    }));
  }, []);

  const handleBooking = async () => {
    console.log("Room ID before booking:", selectedRoom.roomID);
    try {
      const storedToken = authService.getToken();
  
      if (!storedToken) {
        setError("User not authenticated.");
        return;
      }
  
      const userAuthorities = authService.getUserRole();
      console.log(userAuthorities);
  
      if (!userAuthorities || !userAuthorities.includes("user")) {
        setError("You do not have the authority to book.");
        return;
      }
  
      const selectedStartTime = new Date(selectedRoom.startTime);
      const currentDate = new Date();
  
      if (selectedStartTime <= currentDate) {
        setError("Please select a start time after the current date and time.");
        setMessageTimeout(setTimeout(clearMessages, 2000));
        return;
      }
  
      const overlappingBookings = inptform.filter((booking) => {
        const existingStartTime = new Date(booking.startTime);
        const existingEndTime = new Date(booking.endTime);
        const newStartTime = new Date(selectedRoom.startTime);
        const newEndTime = new Date(selectedRoom.endTime);
  
        return existingStartTime < newEndTime && existingEndTime > newStartTime;
      });
  
      if (overlappingBookings.length > 0) {
        setError("Selected time range overlaps with existing booking.");
        setMessageTimeout(setTimeout(clearMessages, 4000));
        return;
      }
  
      const bookingPayload = {
        room: {
          roomID: selectedRoom.roomID,
        },
        user: {
          staffID: selectedRoom.userID,
        },
        startTime: selectedRoom.startTime,
        endTime: selectedRoom.endTime,
        purpose: selectedRoom.purpose,
      };
  
  
      const response = await axios.post(
        process.env.REACT_APP_BOOK_ENDPOINT,
        bookingPayload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
  
      if (response.status === 200) {
        setSuccessMessage("Booking successful!");
        setMessageTimeout(setTimeout(clearMessages, 4000));
        
        const updatedResponse = await axiosInstance.get(
          process.env.REACT_APP_FETCH_EVENTS
        );

        setInptForm(updatedResponse.data);
      }
    } catch (error) {
      setError("Error in the request:", error);
      setMessageTimeout(setTimeout(clearMessages, 4000));
    }
  };
  







  const bookedEvents = inptform.map((booking) => ({
    id: booking.bookingID,
    title: `Room: ${booking.startTime} - ${booking.endTime}`,
    start: booking.startTime,
    end: booking.endTime,
  }));

  
  console.log("My mage", roomData[0]?.imagePath);


  

  return (
    <div className="card">
      <p className="bookRooms">Book Your Room</p>
      <div className="cardContainer">
      <img
        src={selectedRoomImage || 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'}
        alt="Room"
        className="card-image"
      />

        <div className="desc">
          <div className="selection-box">
            <label htmlFor="roomID">Select Room:</label>
            <select
              id="roomID"
              onChange={handleChanges}
              name="roomID"
              value={selectedRoom.roomID}
            >
              <option>Select Room</option>
              {roomData.map((room) => (
                <option key={room.roomID} value={room.roomID}>
                  {room.roomLocation}
                </option>
              ))}
            </select>


          </div>

          <div className="selection-box">
            <label htmlFor="userID">Logged User:</label>
            <input
              id="userID"
              name="userID"
              onChange={handleChanges}

              placeholder={userInfo.sub}
              readOnly
            />
          </div>

          <div className="time-scheduled">
            <label htmlFor="startTime">Start Time</label>
            <input
              type="datetime-local"
              id="startTime"
              name="startTime"
              value={selectedRoom.startTime}
              onChange={handleChanges}
            />
          </div>

          <div className="time-scheduled">
            <label htmlFor="endTime">End Time</label>
            <input
              type="datetime-local"
              id="endTime"
              name="endTime"
              value={selectedRoom.endTime}
              onChange={handleChanges}
            />
          </div>

          <div className="time-scheduled">
            <label htmlFor="purpose">Purpose</label>
            <input
              type="text"
              id="purpose"
              name="purpose"
              value={selectedRoom.purpose}
              onChange={handleChanges}
            />
          </div>
          <div>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {error && <div className="error-message">{error}</div>}
            <button className="book-btn" onClick={handleBooking}>
              Book Now
            </button>
          </div>
        </div>
      </div>

      <div style={{ borderRadius:"none", width: "80%", height: "500px", marginTop: "20px" }} className="cardContainer">
      <FullCalendar
  className="custom-full-calendar"
  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
  events={bookedEvents}
  headerToolbar={{
    start: "today prev,next",
    center: "title",
    end: "dayGridMonth,timeGridWeek,timeGridDay"
  }}
  initialView="dayGridMonth"
  dayCellContent={(arg) => {
    return (
      <div className="custom-day-content">
        {arg.dayNumberText}
      </div>
    );
  }}
/>
      </div>
    </div>
  );
};

export default Card;
