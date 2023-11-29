import React, { useState } from "react";
import "./Card.css";
import { IoLocationSharp } from 'react-icons/io5'
import { AiOutlineFundProjectionScreen, AiOutlineWifi } from 'react-icons/ai'

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
      <div className="card">
        <img src={imageSrc} alt={title} className="card-image" />
        <div className="desc">
          <h3 className="card-title">{title}</h3>
          <p className="card-descr">{description}</p>
          <div className="card-content">
            <div>Facility: {facilities.map(facility => <span key={facility}>{facility} <AiOutlineWifi /> <AiOutlineFundProjectionScreen/> </span> )}</div>
            <div><IoLocationSharp />Address: <span>{address}</span></div>
          </div>
         
          <div className="booked-by">
            <label htmlFor="booked">Booked By:</label>
            <span id="booked">{bookedBy}</span>
          </div>
          <div className="schedure">
            <div className="date-scheduled">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="dateInput"
                value={inputs.selectedDate}
                onChange={handleChange}
              />
            </div>
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
            <div className="info-mode">
              <label htmlFor="selectBox">Informed Via:</label>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
