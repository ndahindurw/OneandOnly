import React, { useEffect, useState } from "react";
import axios from "axios";
import authService from "../Services/authService";
import axiosInstance from "../../Axios/axios";
import "./Card.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Carousel } from "flowbite-react";


const localizer = momentLocalizer(moment);

const Card = ({ title, description, handleChange }) => {
  const [error, setError] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState({
    roomID: "",
    userID: "",
    startTime: "",
    endTime: "",
    purpose: "Staff Meeting",
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [roomData, setRoomData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [inptform, setInptForm] = useState([]);
  const userInfo = authService.getUserInfo();
  const currentDateTime = new Date().toISOString()

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
    const { name, value } = e.target;

    setSelectedRoom((prevSelectedRoom) => ({
      ...prevSelectedRoom,
      [name]: value,
    }));
  };

  const getStatusText = (status) => {
    return status === "1" ? "Booked" : "Available";
  };

  const handleBooking = async () => {
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
      

      const overlappingBookings = inptform.filter((booking) => {
        const existingStartTime = new Date(booking.startTime);
        const existingEndTime = new Date(booking.endTime);
        const newStartTime = new Date(selectedRoom.startTime);
        const newEndTime = new Date(selectedRoom.endTime);

        return (
          existingStartTime < newEndTime && existingEndTime > newStartTime
        );
      });

      if (overlappingBookings.length > 0) {
        setError("Selected time range overlaps with existing booking.");
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

      console.log("Room ID:", bookingPayload.room.roomID);

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

        // Fetch the updated list of events or bookings
        const updatedResponse = await axiosInstance.get(
          process.env.REACT_APP_FETCH_EVENTS
        );

        // Update the state with the new data
        setInptForm(updatedResponse.data);
      }
    } catch (error) {
      setError("Error in the request:", error);
    }
  };


  
  
  
  

  const bookedEvents = inptform.map((booking) => ({
    id: booking.bookingID,
    title: `Room: ${booking.room.roomLocation} - ${booking.purpose}`,
    start: new Date(booking.startTime),
    end: new Date(booking.endTime),
  }));

  return (
    <div className="card">
      <div className="cardContainer">
      <img src={ 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'} alt="Room" className="card-image" />
      <div className="desc">
        
      <div className="selection-box">
            <label htmlFor="roomID">Select Room:</label>
            <select
              id="roomID"
              onChange={handleChanges}
              value={selectedRoom.roomID}
            >
              <option value="">Select Room</option>
              {roomData.map((room) => (
                <option key={room.roomID} name={room.roomID} value={room.roomID}>
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
              value={selectedRoom.userID}
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
            <label htmlFor="purpose">Purpose </label>
            <input
              type="text"
              id="purpose"
              name="purpose"
              value={selectedRoom.purpose}
              onChange={handleChanges}
            />
          </div>
          <div>
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
            {error && <div className="error-message">{error}</div>}
            <button className="book-btn" onClick={handleBooking}>
              Book Now
            </button>
          </div>
      </div>
      </div>


      <div style={{ height: "500px", marginTop: "20px" }} className="cardContainer">
        <Calendar
          localizer={localizer}
          events={bookedEvents}
          startAccessor="start"
          endAccessor="end"
          views={["month", "week", "day"]}
          // eventPropGetter={eventStyleGetter}
        />
      </div>
    </div>
  );
};

export default Card;