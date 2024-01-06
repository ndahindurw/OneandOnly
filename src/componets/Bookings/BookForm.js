import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Navbar from '../navigationBar/navbar';
import { HiCursorArrowRipple } from 'react-icons/hi2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

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
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Booking data submitted:', bookingData);
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center">Booking Form</h5>
                <form  className="row g-3" onSubmit={handleSubmit}>
                   <div class="col-md-4">
                    <label htmlFor="room">Room:</label>
                    <input
                      type="text"
                      name="room"
                      value={bookingData.room}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                   <div class="col-md-4">
                    <label htmlFor="user">User:</label>
                    <input
                      type="text"
                      name="user"
                      value={bookingData.user}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                   <div class="col-md-4">
                    <label htmlFor="startTime">Start Time:</label>
                    <input
                      type="time"
                      name="startTime"
                      value={bookingData.startTime}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                   <div class="col-md-4">
                    <label htmlFor="endTime">End Time:</label>
                    <input
                      type="time"
                      name="endTime"
                      value={bookingData.endTime}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                   <div class="col-md-4">
                    <label htmlFor="purpose">Purpose:</label>
                    <input
                      type="text"
                      name="purpose"
                      value={bookingData.purpose}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                   <div class="col-md-4">
                    <label htmlFor="status">Status:</label>
                    <select
                      value={bookingData.status}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="">Select an option</option>
                      <option value="option1">Occupied</option>
                      <option value="option2">Available</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
          
        </div>
        
      </div>
      <div class="container">
  <div class="row">
    <div class="col-12">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Day</th>
            <th scope="col">Article Name</th>
            <th scope="col">Author</th>
            <th scope="col">Shares</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Bootstrap 4 CDN and Starter Template</td>
            <td>Cristina</td>
            <td>2.846</td>
            <td>
              <button type="button" className="btn btn-primary">
                <FontAwesomeIcon icon={faEye} />
              </button>
              <button type="button" className="btn btn-success">
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button type="button" className="btn btn-danger">
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Bootstrap Grid 4 Tutorial and Examples</td>
            <td>Cristina</td>
            <td>3.417</td>
            <td>
              <button type="button" className="btn btn-primary">
                <FontAwesomeIcon icon={faEye} />
              </button>
              <button type="button" className="btn btn-success">
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button type="button" className="btn btn-danger">
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Bootstrap Flexbox Tutorial and Examples</td>
            <td>Cristina</td>
            <td>1.234</td>
            <td>
              <button type="button" className="btn btn-primary">
                <FontAwesomeIcon icon={faEye} />
              </button>
              <button type="button" className="btn btn-success">
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button type="button" className="btn btn-danger">
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
    </div>
  );
};

export default BookForm;
