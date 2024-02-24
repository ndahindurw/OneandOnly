import React, { useState, useEffect } from "react";
import "./Card.css";
import { IoInformationCircleOutline } from "react-icons/io5";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import authService from "../Services/authService";

function DateScheduler(props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [bookingsData, setBookingsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = authService.getToken();

      if (!storedToken) {
        setError("User not authenticated.");
        return;
      }

      try {
        const response = await axios.get(process.env.REACT_APP_FETCH_EVENTS, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        });
        const data = response.data;
        setBookingsData(data);
      } catch (error) {
        console.error("Error fetching bookings data:", error);
      }
    };

    fetchData();
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (isModalOpen) {
    document.body.classList.add("cardContainer");
  } else {
    document.body.classList.remove("cardContainer");
  }

  console.log("My Bookinggdd", bookingsData);

  const events = bookingsData.map((booking) => {
    const roomLocation = booking.room ? booking.room.roomLocation : "";

    const statusClassName =
      booking.status === "canceled" ? "canceled-event" : "";

    return {
      title: roomLocation,
      start: booking.startTime,
      end: booking.endTime,
      description: booking.purpose,
      status: booking.status,
      className: statusClassName,
    };
  });

  return (
    <div className="Card">
 
    </div>
  );
}

export default DateScheduler;
