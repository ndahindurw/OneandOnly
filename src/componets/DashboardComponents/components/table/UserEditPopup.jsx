import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../../../hooks/useFetch';
import axios from 'axios';

const BookingEditPopup = ({ title}) => {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [credentials, setCredentials] = useState({
    fullnames: "",
    email: "",
    password: "",
    empNo: "",
    mobileNo: "",
    position: "",
    unit: "",
    department: "",
  });

  const { data: units } = useFetch({
    url: process.env.REACT_APP_FETCH_UNITS,
  });
  const { data: departments } = useFetch({
    url: process.env.REACT_APP_FETCH_DEPARTMENT,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SIGNUP}`,
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        }
      );

      if (response.status === 200) {
        setError(null);
        setSuccessMessage("Account successfully created!");
        console.log("successfully saved");
        console.log(response.data, response.status);
      } else {
        if (response.data && response.data.msg) {
          setError(response.data.msg);
        } else {
          throw new Error("Could not Post Data", error);
        }
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

 const  handleUpdate=()=>{

 }
 
  const renderUserForm=()=>{
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form
            action=""
            className="user-form p-3 border"
            onSubmit={handleSubmit}
          >
            <h2 className="text-center mb-4">Create Account</h2>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="fullnames" className="form-label">
                  Full Names
                </label>
                <input
                  type="text"
                  placeholder="Enter Full Names"
                  name="fullnames"
                  value={credentials.fullnames}
                  required
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  name="email"
                  value={credentials.email}
                  required
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="position" className="form-label">
                  Position
                </label>
                <input
                  type="text"
                  placeholder="Enter Position"
                  name="position"
                  value={credentials.position}
                  required
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="empNo" className="form-label">
                  Employee Number
                </label>
                <input
                  type="text"
                  placeholder="Enter Employee Number"
                  name="empNo"
                  value={credentials.empNo}
                  required
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="mobileNo" className="form-label">
                  Mobile Number
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Mobile Number"
                  name="mobileNo"
                  value={credentials.mobileNo}
                  required
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="unitID" className="form-label">
                  Unit
                </label>
                <select
  id="selectBox"
  onChange={handleChange}
  name="unitID" 
  value={credentials.unitID}
  className="form-select"
>
  <option value="">Select a Unit</option>
  {units &&
    units.map((unit) => (
      <option key={unit.unitID} value={unit.unitID}>
        {unit.unitName}
      </option>
    ))}
</select>

              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                value={credentials.password}
                required
                className="form-control"
                onChange={handleChange}
              />
            </div>
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="green-btn btn-success ">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

  const renderBookingForm = () => {
    return (
      <div className="popup">
        <label>Booking ID:</label>
        <input
          type="text"
          value={credentials.room.bookingID}
          onChange={(e) => handleChange('room', { ...credentials.room, bookingID: e.target.value })}
        />
        <label>Room ID:</label>
        <input
          type="text"
          value={credentials.room.roomID}
          onChange={(e) => handleChange('room', { ...credentials.room, roomID: e.target.value })}
        />
        <label>User Staff ID:</label>
        <input
          type="text"
          value={credentials.user.staffID}
          onChange={(e) => handleChange('user', { ...credentials.user, staffID: e.target.value })}
        />
        <label>Start Time:</label>
        <input
          type="datetime-local"
          value={credentials.startTime}
          onChange={(e) => handleChange('startTime', e.target.value)}
        />
        <label>End Time:</label>
        <input
          type="datetime-local"
          value={credentials.endTime}
          onChange={(e) => handleChange('endTime', e.target.value)}
        />
        <label>Purpose:</label>
        <input
          type="text"
          value={credentials.purpose}
          onChange={(e) => handleChange('purpose', e.target.value)}
        />
        <button onClick={handleUpdate}>Update</button>
        
      </div>
    );
  };
  
  return (title == 'ListAllusers') ? <renderUserForm /> : <renderBookingForm />;
};

export default BookingEditPopup;
