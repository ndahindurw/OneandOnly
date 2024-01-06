// BookingEditPopup.jsx

import React, { useState } from 'react';

const BookingEditPopup = ({ bookingData, onClose, onUpdate }) => {
  const [editedBookingData, setEditedBookingData] = useState({ ...bookingData });

  const handleUpdate = () => {
    // Perform validation if needed

    // Send the updated data to the parent component
    onUpdate(editedBookingData);
    onClose();
  };

  const handleChange = (field, value) => {
    setEditedBookingData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

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

export default BookingEditPopup;
