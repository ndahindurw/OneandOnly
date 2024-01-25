import React, { useEffect, useState } from "react";
import axios from "axios";
import "./signup.scss";
import Navbar from "../navigationBar/navbar";
import image0 from "../../assets/RRAImage.jpg";
import { Link } from "react-router-dom";
import axiosInstance from "../../Axios/axios";
import useFetch from "../../hooks/useFetch";

function Signup() {
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
  

  const { data: units } = useFetch({ url: process.env.REACT_APP_FETCH_UNITS });
  const { data: departments } = useFetch({ url: process.env.REACT_APP_FETCH_DEPARTMENT });
  
  console.log("ertyuiytt",units, departments);
  



console.log(units,departments);

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
        console.log("succesfully saved");
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
  

  return (
    <div className="Homesignup">
      <div className="left-container">
        <img className="rra-image" src={image0} alt="Logo" />
        <h1 className="head-text">
          <span className="first">Rwanda</span>
          <span className="second"> Revenue</span>{" "}
          <span className="teritiary">Authority</span>
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
                value={credentials.fullnames}
                required
                className="input"
                onChange={handleChange}
              />
            </div>
            <div className="user-inp">
              <input
                type="email"
                placeholder="Your Email"
                name="email"
                value={credentials.email}
                required
                className="input"
                onChange={handleChange}
              />
            </div>
            <div className="user-inp">
              <input
                type="text"
                placeholder="Enter Position"
                name="position"
                value={credentials.position}
                required
                className="input"
                onChange={handleChange}
              />
            </div>
            <div className="user-inp">
              <input
                type="text"
                placeholder="Enter Employee Number"
                name="empNo"
                value={credentials.empNo}
                required
                className="input"
                onChange={handleChange}
              />
            </div>
            <div className="user-inp">
              <input
                type="text"
                placeholder="Enter Your Mobile Number"
                name="mobileNo"
                value={credentials.mobileNo}
                required
                className="input"
                onChange={handleChange}
              />
            </div>
            <div className="user-inp">
              <div className="info-mode">
                <select id="selectBox" onChange={handleChange} name="unit">
                  <option value="">Select a Unit</option>
                  {units &&
                    units.map((unit) => (
                      <option key={unit.unitID} value={unit.unitName}>
                        {unit.unitName}
                      </option>
                    ))}
                </select>
              </div>
              {/* <div className="info-mode">
                <select
                  id="selectBox"
                  onChange={handleChange}
                  name="department"
                >
                  
                </select>
              </div> */}
            </div>
            <div className="user-inp">
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                value={credentials.password}
                required
                className="input"
                onChange={handleChange}
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
}

export default Signup;
