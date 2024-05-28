import React, { useEffect, useState } from "react";
import "./Widget.scss";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosPerson } from "react-icons/io";
import { MdRoomPreferences } from "react-icons/md";
import { MdNoMeetingRoom } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";

function Widget({ type, dataLength }) {
  let data;

  const [bookEvents, setBookEvents] = useState([]);
  const [usernum, setusernum] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_FETCH_ROOMS, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setBookEvents(response.data))
      .catch((error) => setError(error.message));

    axios
      .get(process.env.REACT_APP_FETCH_USER_DATA_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setusernum(response.data))
      .catch((error) => setError(error.message));
  }, []);

  console.log(usernum.length, "usernum");
  console.log(bookEvents.length, "Booking Eve");

  switch (type) {
    case "User":
      data = {
        title: "List-users",
        isMoney: false,
        link: "/users/ListAllusers",
        Number: `${usernum.length}`,
        icon: (
          <IoIosPerson
            className="icon"
            style={{ background: "rgba(0,128,0,0.2)", color: "green" }}
          />
        ),
      };
      break;

    case "ARoom":
      data = {
        title: "Available Room",
        isMoney: false,
        Number: `${bookEvents.length}`,
        link: "/Rooms/List-Availble-Rooms",
        icon: (
          <MdRoomPreferences
            className="icon"
            style={{ background: "rgba(0,128,0,0.2)", color: "purple" }}
          />
        ),
      };
      break;

    case "BRoom":
      data = {
        title: "List-Booked-Room",
        isMoney: false,
        link: "/Rooms/List-Booked-Rooms",
        icon: (
          <MdNoMeetingRoom
            className="icon"
            style={{ background: "rgba(128,0,128,0.2)", color: "purple " }}
          />
        ),
      };
      break;

    default:
      data = {
        title: "Unknown Type",
        isMoney: false,
        link: "Unknown Link",
        icon: <div className="icon">?</div>,
      };
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney}
          {dataLength}
        </span>
        <div className=" widgetbut">
          <span className="right">{data.icon}</span>
          <span className="left">{data.Number}</span>
        </div>
      </div>
      <div className="link">
        <Link to={data.link} className="link-title">
          List All
        </Link>
      </div>
    </div>
  );
}

export default Widget;
