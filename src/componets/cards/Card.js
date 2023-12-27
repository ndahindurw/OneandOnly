import React, { useState } from "react";
import "./Card.css";
import { IoLocationSharp } from 'react-icons/io5';
import { AiOutlineWifi } from 'react-icons/ai';
import { Link } from "react-router-dom";
import axiosInstance from "../../Axios/axios";

const Card = ({
  title,
  description,
  facilities,
  address,
  imageSrc,
  status,
  purpose
}) => {
  const [inputs, setInputs] = useState({
    roomID: "",
    user: "",
    startTime: "",
    endTime: "",
    purpose: "",
    selectedOption: "",
  });

  const handleChange = async (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    const response = await axiosInstance.post({
      
    })
  };

  return (
    <div className="cards">
      <div className="cardContainer">
        <img src={imageSrc} alt={title} className="card-image" />
        <div className="desc">
          <h3 className="card-title">{title}</h3>
          <p className="card-descr">{description}</p>
          <div className="card-content">
            <div>Facility: {facilities.map(facility => <span key={facility}>{facility}<AiOutlineWifi /></span>)}</div>
            <div><IoLocationSharp />Address: <span>{address}</span></div>
          </div>

          <div className="info-mode">
            <div className="time-scheduled">
              {/* <label htmlFor="roomID">Room ID:</label> */}
              <input
                type="text"
                id="roomID"
                name="roomID"
                placeholder="Room ID :"
                value={inputs.roomID}
                onChange={handleChange}
              />
            </div>
            <div className="time-scheduled">
              {/* <label htmlFor="user">Employee ID:</label> */}
              <input
                type="text"
                id="user"
                name="user"
                placeholder="Employee ID:"
                value={inputs.user}
                onChange={handleChange}
              />
            </div>

            <div className="time-scheduled">
              {/* <label htmlFor="startTime">Selected Time:</label> */}
              <input
                type="time"
                id="startTime"
                name="startTime"
                placeholder="selected time"
                value={inputs.startTime}
                onChange={handleChange}
              />
            </div>
            <div className="time-scheduled">
              {/* <label htmlFor="endTime">End Time:</label> */}
              <input
                type="time"
                id="endTime"
                placeholder="End Time"
                name="endTime"
                value={inputs.endTime}
                onChange={handleChange}
              />
            </div>
            <div className="time-scheduled">
              {/* <label htmlFor="purpose">Purpose:</label> */}
              <input
                type="text"
                id="purpose"
                name="purpose"
                placeholder="Purpose"
                value={inputs.purpose}
                onChange={handleChange}
              />
            </div>

            {/* <div className="info-mode">
              <label htmlFor="selectBox">Inform Via:</label>
              <select
                id="selectBox"
                value={inputs.selectedOption}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="option1">Email</option>
                <option value="option2">Slack</option>
              </select>
            </div> */}
            <div className="status">
              <label htmlFor="status-room">Status:</label>
              <span className="status-room">{status}</span>
            </div>
            <div>
              <Link to="/BookForm">
                <button className="book-btn">Book Now</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
