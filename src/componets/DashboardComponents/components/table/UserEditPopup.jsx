import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BookingEditPopup = ({ title, bookingData, onClose, onUpdate, handleSubmit, units, departments, image0, successMessage, error }) => {
  const [editedBookingData, setEditedBookingData] = useState({ ...bookingData });

  const handleChange = (field, value) => {
    setEditedBookingData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleUpdate = () => {
    onUpdate(editedBookingData);
    onClose();
  };

  console.log("Myy data ", bookingData)
  const renderUserForm = () => {
    return (
      <div className="Homesignup">
        <div className="left-container">
          <img className="rra-image" src={image0} alt="Logo" />
          <h1 className="head-text">
            <span className="first">Rwanda</span>
            <span className="second"> Revenue</span>{" "}
            <span className="tertiary">Authority</span>
          </h1>
          <div className="return">
            <ul>
              <Link to="/Dashboard">Return to Dashboard</Link>
            </ul>
          </div>
        </div>
        <div className="right-container">
          <div className="right">
            <form action="" className="user-form" onSubmit={handleSubmit}>
              <h2>Create Account</h2>
              <div className="user-inp">
                <input
                  type="text"
                  placeholder="Enter Full Names"
                  name="fullnames"
                  value={bookingData.fullnames}
                  required
                  className="input"
                  onChange={(e) => handleChange('fullnames', e.target.value)}
                />
              </div>
              <div className="user-inp">
                <input
                  type="email"
                  placeholder="Your Email"
                  name="email"
                  value={bookingData.email}
                  required
                  className="input"
                  onChange={(e) => handleChange('email', e.target.value)}
                />
              </div>
              <div className="user-inp">
                <input
                  type="text"
                  placeholder="Enter Position"
                  name="position"
                  value={bookingData.position}
                  required
                  className="input"
                  onChange={(e) => handleChange('position', e.target.value)}
                />
              </div>
              <div className="user-inp">
                <input
                  type="text"
                  placeholder="Enter Employee Number"
                  name="empNo"
                  value={bookingData.empNo}
                  required
                  className="input"
                  onChange={(e) => handleChange('empNo', e.target.value)}
                />
              </div>
              <div className="user-inp">
                <input
                  type="text"
                  placeholder="Enter Your Mobile Number"
                  name="mobileNo"
                  value={bookingData.mobileNo}
                  required
                  className="input"
                  onChange={(e) => handleChange('mobileNo', e.target.value)}
                />
              </div>
              <div className="user-inp">
                <div className="info-mode">
                  <select id="selectBox" onChange={(e) => handleChange('unit', e.target.value)} name="unit">
                    <option value="">Select a Unit</option>
                    {units &&
                      units.map((unit) => (
                        <option key={unit.unitID} value={unit.unitName}>
                          {unit.unitName}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="info-mode">
                  <select
                    id="selectBox"
                    onChange={(e) => handleChange('department', e.target.value)}
                    name="department"
                  >
                    <option value="">Select a Department</option>
                    {departments &&
                      departments.map((department) => (
                        <option
                          key={department.departmentID}
                          value={department.departmentName}
                        >
                          {department.departmentName}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="user-inp">
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={bookingData.password}
                  required
                  className="input"
                  onChange={(e) => handleChange('password', e.target.value)}
                />
              </div>
              {successMessage && <div className="success-message">{successMessage}</div>}
              {error && <div className="error-message">{error}</div>}
              <button type="submit" className="green-btn">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const renderBookingForm = () => {
    return (
      <div className="popup-container">
        <label>Booking ID:</label>
        <input
          type="text"
          value={editedBookingData.room.bookingID}
          onChange={(e) => handleChange('room', { ...editedBookingData.room, bookingID: e.target.value })}
        />
        <label>Room ID:</label>
        <input
          type="text"
          value={editedBookingData.room.roomID}
          onChange={(e) => handleChange('room', { ...editedBookingData.room, roomID: e.target.value })}
        />
        <label>User Staff ID:</label>
        <input
          type="text"
          value={editedBookingData.user.staffID}
          onChange={(e) => handleChange('user', { ...editedBookingData.user, staffID: e.target.value })}
        />
        <label>Start Time:</label>
        <input
          type="datetime-local"
          value={editedBookingData.startTime}
          onChange={(e) => handleChange('startTime', e.target.value)}
        />
        <label>End Time:</label>
        <input
          type="datetime-local"
          value={editedBookingData.endTime}
          onChange={(e) => handleChange('endTime', e.target.value)}
        />
        <label>Purpose:</label>
        <input
          type="text"
          value={editedBookingData.purpose}
          onChange={(e) => handleChange('purpose', e.target.value)}
        />
        <button onClick={handleUpdate}>Update</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    );
  };

  switch (title) {
    case 'ListAllusers':
      return renderUserForm();

    case 'BookingSomeRooms':
      return renderBookingForm();

    // Add more cases as needed for different forms based on the title prop

    default:
      console.error('Invalid title:', title);
      return null;
  }
};

export default BookingEditPopup;
