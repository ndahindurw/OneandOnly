import React, { useState } from "react";
import "./Card.css";
import { IoLocationSharp } from 'react-icons/io5'
import { AiOutlineFundProjectionScreen, AiOutlineWifi } from 'react-icons/ai'
import { Link } from "react-router-dom";

const Card = ({
  title,
  description,
  facilities,
  address,
  imageSrc,
  status,
  bookedBy,
}) => {
  const [inputs, setInputs] = useState({
    timeInput: "",
    selectedDate: "",
    selectedTime: "",
    selectedOption: "",
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  return (
    <div className="cards">
      <div className="cardContainer">
        <img src={imageSrc} alt={title} className="card-image" />
        <div className="desc">
          <h3 className="card-title">{title}</h3>
          <p className="card-descr">{description}</p>
          <div className="card-content">
            <div>Facility: {facilities.map(facility => <span key={facility}>{facility}<AiOutlineWifi /> </span> )}</div>
            <div><IoLocationSharp />Address: <span>{address}</span></div>
          </div>
         
          <div className="info-mode">
              <label htmlFor="selectBox">Booked By:</label>
              <select
                id="selectBox"
                value={inputs.selectedOption}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="option1">Sotware Enginner</option>
                <option value="option2">Netwok Admins</option>
                <option value="option2">Tax Collector</option>
                <option value="option2">Staff Administrator</option>
                <option value="option2">Board Members</option>
              </select>
            </div>
          <div className="schedure">
          <div className="time-scheduled">
              <label htmlFor="timeInput">Selected Time:</label>
              <input
                type="time"
                id="timeInput"
                name="timeInput"
                value={inputs.selectedTime}
                onChange={handleChange}
              />
            </div>
            <div className="time-scheduled">
              <label htmlFor="timeInput">End Time:</label>
              <input
                type="time"
                id="timeInput"
                name="timeInput"
                value={inputs.selectedTime}
                onChange={handleChange}
              />
            </div>
            <div className="info-mode">
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
            </div>
            <div className="status">
            <label htmlFor="status-room">Status:</label>
            <span className="status-room">{status}</span>
          </div>
          <div >
            <Link to="/BookForm">
                <button className="book-btn">Book Here</button>
            </Link>           
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
