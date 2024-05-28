import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "./report.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import SideBar from "../DashboardComponents/components/sidebarDash/SideBar";
import Widget from "../DashboardComponents/components/widget/WidgetApp";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Report() {
  const [bookEvents, setBookEvents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_FETCH_EVENTS, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setBookEvents(response.data))
      .catch((error) => setError(error.message));

    axios
      .get(process.env.REACT_APP_GET_ROOMNAMES, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setRooms(response.data))
      .catch((error) => setError(error.message));
  }, []);
  console.log("Rooms", rooms);
  if (error) return <div>Error: {error}</div>;

  const findRoomName = (roomID) => {
    if (!rooms || rooms.length === 0) {
      return "Unknown Room";
    }
    const room = rooms.find((r) => r.roomID.roomID === roomID);
    return room ? room.roomName : "Unknown Room";
  };

  const findMostFrequentRoom = (bookings) => {
    const roomBookings = {};
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDay);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    bookings.forEach(({ booking }) => {
      const roomID = booking.room ? booking.room.roomID : undefined;

      if (roomID === undefined) {
        console.error(
          "RoomID is undefined. Check if the property name is correct and if the data is loaded correctly."
        );
        return;
      }

      const bookingDate = new Date(booking.startTime);
      if (bookingDate >= startOfWeek && bookingDate <= endOfWeek) {
        // Only include bookings within the current week
        const roomName = findRoomName(roomID);
        const dayOfWeek = bookingDate.getDay();

        if (!roomBookings[roomName]) {
          roomBookings[roomName] = Array(7).fill(0);
        }

        roomBookings[roomName][dayOfWeek]++;
      }
    });

    return roomBookings;
  };

  const aggregateBookings = (bookings) => {
    const monthCounts = Array(12).fill(0);
    bookings.forEach(({ booking }) => {
      const month = new Date(booking.startTime).getMonth();
      monthCounts[month]++;
    });
    return monthCounts;
  };

  const aggregatedData = aggregateBookings(bookEvents);
  const aggregatedDataweek = findMostFrequentRoom(bookEvents);

  // Extract room names and their corresponding booking data
  const roomNames = Object.keys(aggregatedDataweek);
  const roomBookingCounts = roomNames.map(
    (roomName) => aggregatedDataweek[roomName]
  );

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Rooms Booked",
        data: aggregatedData,
        borderColor: "#EF4444",
        backgroundColor: "#EF4444",
        fill: false,
        lineTension: 0.4,
      },
    ],
  };

  const weeklyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: roomBookingCounts.map((data, index) => ({
      label: `Bookings for ${roomNames[index]}`,
      data,
      borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      fill: false,
      lineTension: 0.4,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Room Booking Insights Per Month",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Rooms Booked",
        },
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            if (Number.isInteger(value)) {
              return value;
            }
          },
        },
      },
    },
  };

  const weekOption = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Most Booked Rooms Per Week",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Rooms",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Bookings",
        },
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            if (Number.isInteger(value)) {
              return value;
            }
          },
        },
      },
    },
  };

  const [showSignup, setShowSignup] = useState(false);
  const [showRoom, setShowRoom] = useState(false);

  const handleSignupClick = () => {
    setShowSignup(true);
    setShowRoom(false);
  };

  const handleRoomClick = () => {
    setShowRoom(!showRoom);
    setShowSignup(false);
  };

  const handleReport = () => {
    setShowSignup(false);
    setShowRoom(false);
  };

  return (
    <div className="reportContainer">
      <div>
        <SideBar
          className="sidebar"
          onSignupClick={handleSignupClick}
          onRoomClick={handleRoomClick}
          handleReport={handleReport}
        />
      </div>
      <div className="rreport">
        <div className="headerReport">
          <h1>Room Report</h1>
        </div>
        <div className="widgetReport">
          <Widget type="User" />
          <Widget type="ARoom" />
        </div>
        <div className="containerLiner">
          <div className="linecard">
            <Line data={data} options={options} />
          </div>
          <div className="linecard">
            <Line data={weeklyData} options={weekOption} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
