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
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap';
import RoomReviewCard from "./RoomReviewCard";







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
  const [isBookingDisabled, setIsBookingDisabled] = useState(false);
  const [previousRoomID, setPreviousRoomID] = useState(null);


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

  

  useEffect(() => {
    const overlappingBookingsForSameUser = inptform.filter((booking) => {
      const existingStartTime = new Date(booking.startTime);
      const existingEndTime = new Date(booking.endTime);
      const newStartTime = new Date(selectedRoom.startTime);
      const newEndTime = new Date(selectedRoom.endTime);
  
      // Check for overlaps (removed the condition for the same room and user)
      const isOverlap = existingStartTime < newEndTime && existingEndTime > newStartTime;
  
      // Remove the condition for exact match
      return isOverlap;
    });
  
   
  }, [selectedRoom.startTime, selectedRoom.endTime, inptform, selectedRoom.userID]);
  
  
  const handleBooking = async () => {
    console.log("Room ID before booking:", selectedRoom.roomID);
    try {
      const storedToken = authService.getToken();
  
      if (!storedToken) {
        setError("User not authenticated.");
        return;
      }
  
      const userAuthorities = authService.getUserRole();
      console.log("Token", storedToken);
  
      if (!userAuthorities || !userAuthorities.includes("user")) {
        setError("You do not have the authority to book.");
        return;
      }
  
      const selectedStartTime = new Date(selectedRoom.startTime);
      const currentDate = new Date();
  
      if (selectedStartTime <= currentDate) {
        setError("Please select a start time after the current date and time.");
        setMessageTimeout(setTimeout(clearMessages, 5000));
        return;
      }
  
      // Check for overlapping bookings
      const overlappingBookings = inptform.filter((booking) => {
        const existingStartTime = new Date(booking.startTime);
        const existingEndTime = new Date(booking.endTime);
        const newStartTime = new Date(selectedRoom.startTime);
        const newEndTime = new Date(selectedRoom.endTime);
  
        return existingStartTime < newEndTime && existingEndTime > newStartTime;
      });
  
      // Check if there is an overlapping booking for the same user
      const overlappingBookingForSameUser = overlappingBookings.find(
        (booking) => booking.user.staffID === selectedRoom.userID
      );
  
      if (overlappingBookingForSameUser) {
        setError("You already have a booking at this time, but you can book another room.");
        setMessageTimeout(setTimeout(clearMessages, 5000));
        return;
      }
  
      if (overlappingBookings.length > 0) {
        setError("Selected time range overlaps with existing booking.");
        setMessageTimeout(setTimeout(clearMessages, 5000));
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
        setMessageTimeout(setTimeout(clearMessages, 5000));
  
        const updatedResponse = await axiosInstance.get(
          process.env.REACT_APP_FETCH_EVENTS
        );
  
        setInptForm(updatedResponse.data);
      }
    } catch (error) {
      setError("Error in the request:", error);
      setMessageTimeout(setTimeout(clearMessages, 5000));
    }
  };
  

  const scrollToBookingForm = () => {
    document.getElementById('bookingForm').scrollIntoView({ behavior: 'smooth' });
  };

  
const calculateBookedHours = (bookings) => {
  const bookedHours = {};

  bookings.forEach((booking) => {
    const { roomID, startTime, endTime } = booking;
    const startFormatted = new Date(startTime).toISOString();
    const endFormatted = new Date(endTime).toISOString();

    if (!bookedHours[roomID]) {
      bookedHours[roomID] = [];
    }

    bookedHours[roomID].push({ startTime: startFormatted, endTime: endFormatted });
  });

  return bookedHours;
};


const bookedHours = calculateBookedHours(inptform);




const bookedEvents = roomData.reduce((events, room) => {
  const roomLocation = room.roomLocation || 'Unknown Room';

  if (room.bookings && room.bookings.length > 0) {
    const roomEvents = room.bookings.map((booking) => {
      const start = booking.startTime ? new Date(booking.startTime) : undefined;
      const end = booking.endTime ? new Date(booking.endTime) : undefined;

      return {
        title: roomLocation,
        start: start,
        end: end,
      };
    });

    return events.concat(roomEvents);
  } else {
    return events;
  }
}, []);

console.log("bookedEvents", bookedEvents);
console.log("roooooooooom", roomData);




  return (
    <div className="card" id="bookingForm">
      <p className="bookRooms">Book Your Room</p>
      
      <div className="cardss" >
      <RoomReviewCard roomData={roomData} bookedHours={bookedHours} inptform={inptform} />
      </div>
      
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
              rows="6"
            />
          </div>
          {/* <div className="time-scheduled">
            <label htmlFor="purpose">Status:</label>
            <div
              type="text"
              id="purpose"
              name="purpose"
              value={selectedRoom.status}
              onChange={handleChanges}

            />
          </div> */}
          <div>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {error && <div className="error-message">{error}</div>}
            <button className="book-btn" onClick={handleBooking} disabled={isBookingDisabled}>
  Book Now
</button>
          </div>
        </div>
      </div>

      <div style={{ borderRadius: "none", width: "80%", height: "500px", marginTop: "20px" }} className="cardContainer">
        <FullCalendar
          className="custom-full-calendar"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          events={bookedEvents}
          headerToolbar={{
            start: "today prev,next",
            center: "title",
            end: "dayGridMonth,timeGridWeek"
          }}
          initialView="dayGridMonth"
          dayCellContent={(arg) => {
            return (
              <div className="custom-day-content">
                {arg.dayNumberText}
              </div>
            );
          }}

          eventDidMount={(info)=>{
            
            return new bootstrap.Popover(info.el,{
              title: info.event.title,
              placement: "auto",
              trigger: "hover",
              customClass:"popoverStyle",
              content: `
      <p>Start Time: ${info.event.start}</p>
      <p>End Time: ${info.event.end}</p>
      <p>Status: Booked</p>
    `,
              html:true,
            }
            

  )}}
        />
      </div>
    </div>
  );
};

export default Card;