import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css'
import Navbar from '../navigationBar/navbar';

function Login({image0}) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const url = 'http://localhost:8080/rra/v1/auth/signin';

      const response = await axios.post(url, credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        // Successful login
        console.log('Login successful');
        console.log(response.data);
        setError(null);
      } else {
        throw new Error('Login failed');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('Invalid email or password');
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-container">
      <Navbar image0={image0}/>
      <div className="login-form-container">
        <div className="right">
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
          </form>
          <Link to = "/Signup" className='accountLink'>Already Has An Account</Link>
        </div>
        
      </div>
    </div>
  );
}

export default Login;
