import React, { useState } from "react";
import "./Card.css";
import Images from "../images";


const Card = ({ title, description, facilties, address }) => {

    const [inputs, setInputs] = useState({
        timeInput: "",
        selectedDate: "",
        selectedTime:"",
        selectedOption: "",
       
      });
      
    const handleChange =(e)=>{
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

  return (
    <div className="card">
      <h3>{title}</h3>
      <img src={Images} alt={title} className="card-image" />
      <p>{description}</p>
      <div className="card-content">
        {facilties}
        {address}
      </div>
      <div className="status">
        <label htmlFor="status">Status</label>
        <span className="status"></span>
      </div>
      <div className="booked-by">
        <label htmlFor="status">Booked By:</label>
        <span id="status"></span>
      </div>
      <div className="schedure">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          name="dateInput"
          value={inputs.selectedDate}
          onChange={handleChange}
        />
        <label htmlFor="timeInput">Select Time:</label>
        <input
          type="time"
          id="timeInput"
          name="timeInput"
          value={inputs.selectedTime}
          onChange={handleChange}
        />
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
    </div>
  );
};

export default Card;
