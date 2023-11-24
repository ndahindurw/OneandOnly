import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './signup.css';
import Navbar from '../navigationBar/navbar';

function Signup() {
  const [credentials, setCredentials] = useState({
    fullnames: '',
    email: '',
    password: '',
    empNo: '',
    mobileNo: '',
    position: '',
  });

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = 'http://localhost:8080/rra/v1/auth/signup';

      const response = await axios.post(url, credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setError(null);
        console.log("succesfully saved")
        console.log(response.data,response.status);
      } else {
        if (response.data && response.data.msg) {
          setError(response.data.msg);
        } else {
          throw new Error('Could not Post Data',error);
          
        }
      }

    } catch (err) {
      console.error('Error during signup:', err);
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
  
    <div className="signup-container">
      <Navbar/>
      <div className="signup-form-container">
        
        
        <div className="right">
          <form action="" className="form-container" onSubmit={handleSubmit}>
            <h2>Create Account</h2>
            <input
              type="text"
              placeholder="Enter Full Names"
              name="fullnames"
              value={credentials.fullnames}
              required
              className="input"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              value={credentials.email}
              required
              className="input"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={credentials.password}
              required
              className="input"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Enter Employee Number"
              name="empNo"
              value={credentials.empNo}
              required
              className="input"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Enter Your Mobile Number"
              name="mobileNo"
              value={credentials.mobileNo}
              required
              className="input"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Enter Position"
              name="position"
              value={credentials.position}
              required
              className="input"
              onChange={handleChange}
            />
            <button type="submit" className="green-btn">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
