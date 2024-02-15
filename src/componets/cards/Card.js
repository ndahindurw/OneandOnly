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

const Card = ({bookedHours}) => {
  const [error, setError] = useState(null);
  const [roomData, setRoomData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [inptform, setInptForm] = useState([]);

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

      <div  className="card">
      <div className="room-review-card-container">
      <RoomReviewCard roomData={roomData} bookedHours={bookedHours} inptform={inptform} />
    </div>
      </div>
      <div style={{ borderRadius: "none", width: "85%", height: "500px", marginTop: "20px" }} className="cardContainer">
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
          eventDidMount={(info) => {
            return new bootstrap.Popover(info.el, {
              title: info.event.title,
              placement: "auto",
              trigger: "hover",
              customClass: "popoverStyle",
              content: `
                <p>Start Time: ${info.event.start}</p>
                <p>End Time: ${info.event.end}</p>
                <p>Status: Booked</p>
              `,
              html: true,
            });
          }}
        />
      </div>
    </div>
  );
};

export default Card;
