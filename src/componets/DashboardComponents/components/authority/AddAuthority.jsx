import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AddAuthority.scss'; 
import axiosInstance from '../../../../Axios/axios';
import useFetch from '../../../../hooks/useFetch';
import authService from '../../../Services/authService';

const AddAuthority = ({data ,url}) => {
  const [credentials, setCredentials] = useState({
    authority: '',
    user: ''
  });
const [successMessage,setSuccessMessage]=useState(null)
  const [error, setError] = useState(null);
  const navigate = useNavigate();

    const {data:userAuthority }  =  useFetch({url:process.env.REACT_APP_AUTHORITY_LIST})
    const {data:UserList}  =  useFetch({url:process.env.REACT_APP_FETCH_USER_DATA_URL})

    const handleAuthority = async (e) => {
      e.preventDefault();
    
      try {
        const response = await axiosInstance.post(
          process.env.REACT_APP_ADD_ROLE,
          credentials
        );
    
        if (response.status === 200) {
          setError(null);
          setSuccessMessage('Successfully saved');
        } else {
          // Handle other response status codes or errors
          console.error('Unexpected response:', response);
        }
      } catch (err) {
        console.error('Error during login:', err);
        const errorMessage = err.response?.data?.message || 'Bad Credentials';
        setError(errorMessage);
      }
    };
    

  const handleChange = (e) => {
    console.log('Handling change:', e.target.name, e.target.value);
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  

  return (
    <div className="auth-container">
      <div className="Auth-form-container">
        <form className="form-container" onSubmit={handleAuthority}>
          <h2>Map Auth to users</h2>
          <select name='authority' onChange={handleChange}>
            <option>Select Authority</option>
            {userAuthority && userAuthority.map(item => (
              <option key={item.authority} value={item.authorityNo}> {item.authorityName}</option>
            ))}
          </select>
          <select name="user" onChange={handleChange}>
            <option>Select user</option>
            {UserList && UserList.map(user => (
              <option key={user.userNo} value={user.staffID}> {user.fullnames}</option>
            ))}
          </select>
          {successMessage && <div className="success-message">{successMessage}</div>}
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="green-btn">
            Add Authority
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAuthority;
