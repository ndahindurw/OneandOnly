import React, { useState } from 'react';
import './BookForm.css';
import Navbar from '../navigationBar/navbar';
import { HiCursorArrowRipple } from 'react-icons/hi2';

const BookForm = () => {
  const [bookingData, setBookingData] = useState({
    bookingID: '',
    room: '',
    user: '',
    startTime: '',
    endTime: '',
    purpose: '',
    status: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Booking data submitted:', bookingData);
  };

  return (
    <div>
        <Navbar/>
        <div className="content-Book">
      
      <div className="booking-container">
        <div>
          <strong>Booking Form</strong>
        </div>
        <form onSubmit={handleSubmit} className="booking-form">
          <label className="my-label">
            Room:
            <input
              type="text"
              name="room"
              value={bookingData.room}
              onChange={handleChange}
              className='hero'
            />
          </label>

          <label className="my-label">
            User:
            <input
            className='hero'
              type="text"
              name="user"
              value={bookingData.user}
              onChange={handleChange}
            />
          </label>

          <label className="my-label">
            Start Time:
            <input
            className='hero'
            type="time"
              name="startTime"
              value={bookingData.startTime}
              onChange={handleChange}
            />
          </label>

          <label className="my-label">
            End Time:
            <input
            className='hero'
            type="time"
              name="endTime"
              value={bookingData.endTime}
              onChange={handleChange}
            />
          </label>

          <label className="my-label">
            Purpose:
            <input
            className='hero'
              type="text"
              name="purpose"
              value={bookingData.purpose}
              onChange={handleChange}
            />
          </label>

          <label className="my-label">Status:</label>
          <select value={bookingData.status} onChange={handleChange} className='hero'>
            <option value="">Select an option</option>
            <option value="option1">Occupied</option>
            <option value="option2">Available</option>
          </select>

          <button type="submit" className='btn-book'>Submit</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default BookForm;
