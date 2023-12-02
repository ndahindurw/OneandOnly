import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import authService from '../Services/authService';
import Navbar from '../navigationBar/navbar';
import { jwtDecode as jwt_decode } from 'jwt-decode';

const Signin = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    

    try {
      const response = await authService.login(credentials);
      console.log(response?.data);

      if (response?.data.accessToken) {
        authService.setToken(response?.data?.accessToken);
        console.log('setted Token ', authService.setToken())
      
        const payLoad = jwt_decode(response?.data?.accessToken);        
        payLoad?.authorities==='admin' ? navigate('/availableRoom'): navigate('/Home');
        
    }
    

      setError(null);
    } catch (err) {
      console.error('Error during login:', err);
      const errorMessage = err.response?.data?.message || 'Bad Credentials';
      setError(errorMessage);
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-container">
      <Navbar />
      <div className="login-form-container">
        <form className="form-container" onSubmit={handleLogin}>
          <h2>Login</h2>
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
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="green-btn">
            Login
          </button>
          <div className="signup-link">
          <Link to="/signupPage" className="account-link">
            Don't have an account? Sign up here.
          </Link>
        </div>
        </form>
        
      </div>
    </div>
  );
};

export default Signin;
