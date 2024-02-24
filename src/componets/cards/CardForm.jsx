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

const CardForm = ({ roomNames, closeRoom }) => {
  const [error, setError] = useState(null);
  const [selectedView, setSelectedView] = useState('dayGridMonth');
  const [selectedRoom, setSelectedRoom] = useState({
    roomNameID: "",
    userID: "",
    startTime: "",
    endTime: "",
    purpose: "",
    roomID: "" // Initialize roomID here
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
        console.log("room Data", roomData)
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

        console.log("My Stored Token", storedToken);

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

  useEffect(() => {
    const userId = authService.getUserInfo().userId;
    setSelectedRoom((prevSelectedRoom) => ({
      ...prevSelectedRoom,
      userID: userId,
    }));
  }, []);

  const handleChanges = (e) => {
    const value = e.target.name === 'roomID' ? parseInt(e.target.value, 10) : e.target.value;
    if (e.target.name === 'roomNameID') {
      const selectedRoomData = roomNames.find(room => room.roomName === e.target.value);
      if (selectedRoomData) {
        setSelectedRoom(prevState => ({
          ...prevState,
          roomNameID: e.target.value,
          roomID: selectedRoomData.roomID 
        }));
        setSelectedRoomImage(selectedRoomData.imagePath);
      }
    } else {
      setSelectedRoom({ ...selectedRoom, [e.target.name]: value });
    }
  };
  
  const handleBooking = async () => {
    setIsBookingDisabled(true);
    try {
      const storedToken = authService.getToken();
      
      if (!storedToken) {
        setError("User not authenticated.");
        setTimeout(() => setIsBookingDisabled(false), 2000);
        return;
      }
  
      const userAuthorities = authService.getUserRole();
  
      if (!userAuthorities || !userAuthorities.includes("user")) {
        setError("You do not have the authority to book.");
        setMessageTimeout(setTimeout(clearMessages, 3000));
        setTimeout(() => setIsBookingDisabled(false), 2000);
        return;
      }
  
      const selectedStartTime = new Date(selectedRoom.startTime);
      const currentDate = new Date();
  
      if (selectedStartTime <= currentDate) {
        setError("Please select a start time after the current date and time.");
        setMessageTimeout(setTimeout(clearMessages, 5000));
        setTimeout(() => setIsBookingDisabled(false), 2000);
        return;
      }
  
      if (!selectedRoom.roomNameID || !selectedRoom.userID || !selectedRoom.startTime || !selectedRoom.endTime || !selectedRoom.purpose) {
        setError("Please fill in all required fields.");
        setMessageTimeout(setTimeout(clearMessages, 5000));
        setTimeout(() => setIsBookingDisabled(false), 2000);
        return;
      }
  
      // Find the room ID based on the selected room name
      const selectedRoomData = roomNames.find(room => room.roomName === selectedRoom.roomNameID);
      if (!selectedRoomData) {
        setError("Invalid room selected.");
        setMessageTimeout(setTimeout(clearMessages, 5000));
        setTimeout(() => setIsBookingDisabled(false), 2000);
        return;
      }
  
      const bookingPayload = {
        room: {
          roomID: selectedRoomData.roomNameID // Use the room ID here
        },
        user: {
          staffID: parseInt(selectedRoom.userID)
        },
        startTime: selectedRoom.startTime,
        endTime: selectedRoom.endTime,
        purpose: selectedRoom.purpose
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
  
        setTimeout(() => setIsBookingDisabled(false), 2000);
        setInptForm(updatedResponse.data);
        setTimeout(() => closeRoom(), 2000);
      } else {
        setError("Booking failed. Please try again later.");
        setMessageTimeout(setTimeout(clearMessages, 5000));
        setTimeout(() => setIsBookingDisabled(false), 2000);
      }
    } catch (error) {
      if (error.response) {
        setError(`Server Error: ${error.response.data}`);
      } else if (error.request) {
        setError("No response from the server. It can be another issue.");
      } else {
        setError(`Error: ${error.message}`);
      }
      setTimeout(() => setIsBookingDisabled(false), 2000);
      setMessageTimeout(setTimeout(clearMessages, 5000));
    }
  };
  
  useEffect(() => {
    const overlappingBookingsForSameUser = inptform.filter((booking) => {
      const existingStartTime = new Date(booking.startTime);
      const existingEndTime = new Date(booking.endTime);
      const newStartTime = new Date(selectedRoom.startTime);
      const newEndTime = new Date(selectedRoom.endTime);

      const isOverlap = existingStartTime < newEndTime && existingEndTime > newStartTime;
  
      return isOverlap;
    });
  
  }, [selectedRoom.startTime, selectedRoom.endTime, inptform, selectedRoom.userID]);
  
  const scrollToBookingForm = () => {
    document.getElementById('bookingForm').scrollIntoView({ behavior: 'smooth' });
  };

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
  console.log("room", roomNames);

  return (
    <div className="cardContainer row">
      <h3 style={{display:'flex', justifyContent:"center" ,marginBottom:40}}>Room Request</h3>
      <div className="desc col-md-10">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">      
                <label htmlFor="roomID" className="form-label">Select Room:</label>
                <select
                  id="roomID"
                  onChange={handleChanges}
                  name="roomNameID"
                  value={selectedRoom.roomNameID}
                  className="form-select"
                >
                  <option>Select Room</option>
                  {roomNames && roomNames.map((room) => (
                    <option key={room.roomNameID} value={room.roomNameID}>
                      {room.roomName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">         
                <label htmlFor="userID" className="form-label">Logged User:</label>
                <input
                  id="userID"
                  name="userID"
                  onChange={handleChanges}
                  placeholder={userInfo.sub}
                  readOnly
                  className="form-control"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="startTime" className="form-label">Start Time</label>
                <input
                  type="datetime-local"
                  id="startTime"
                  name="startTime"
                  value={selectedRoom.startTime}
                  onChange={handleChanges}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="endTime" className="form-label">End Time</label>
                <input
                  type="datetime-local"
                  id="endTime"
                  name="endTime"
                  value={selectedRoom.endTime}
                  onChange={handleChanges}
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <label htmlFor="purpose" className="form-label">Purpose</label>
                <textarea
                  id="purpose"
                  name="purpose"
                  value={selectedRoom.purpose}
                  onChange={handleChanges}
                  className="form-control"
                  rows="2"
                />
              </div>
            </div>
          </div>
          <div>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {error && <div className="error-message">{error}</div>}
            <button className="green-btn" onClick={handleBooking} disabled={isBookingDisabled}>
              Book the Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardForm;
