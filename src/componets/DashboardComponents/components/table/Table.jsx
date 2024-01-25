import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './Table.scss';
import useFetch from '../../../../hooks/useFetch';
import UserEditPopup from './UserEditPopup';
import axiosInstance from '../../../../Axios/axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../../Services/authService';
import { jwtDecode as jwt_decode } from 'jwt-decode';

function Table({ title, data,tokenPayLoad }) {
  const [url, setUrl] = useState('');
  const { loading: fetchLoading, data: allData } = useFetch({ url });
  const [loading, setLoading] = useState(false);
  const [editPopupVisible, setEditPopupVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [userData, setUserData] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [page, setPage] = useState(1);
  const [allusers, setAllusers] = useState([]);
  const [storedToken, setStoredToken] = useState(null);
  
  

  const navigate = useNavigate();

  useEffect(() => {
    if (allData) {
      const chunks = HandleList(allData);
      setAllusers(chunks);
    }
  }, [allData]);

  const HandleList = (array) => {
    const list = [];
    const chunkSize = 10;
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      list.push(chunk);
    }
    return list;
  };

  useEffect(() => {
    const token = authService.getToken();
    setStoredToken(token); 

    switch (title) {
      case 'ListAllusers':
        setUrl(process.env.REACT_APP_FETCH_USER_DATA_URL);
        break;
      case 'Booking Rooms':
        setUrl(process.env.REACT_APP_FETCH_EVENTS);
        break;
      case 'Available Some Rooms':
        setUrl(process.env.REACT_APP_FETCH_ROOMS);
        break;
      default:
        console.error('Invalid title:', title);
    }
  }, [title]);
  
  const HandleReturn = () => {
    try {

      const  storedToken =  authService.getToken()

      if (!storedToken) {
        console.error('Token is null or undefined');
        return; 
      }

      

      const payLoad = jwt_decode(storedToken);

      if (payLoad) {
        payLoad?.authorities === 'admin' ? navigate('/Dashboard') : navigate('/RequestRom');
      } else {
        console.error('Token is null');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };
   

  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditPopupVisible(true);
  };

  const handleEditPopupUpdate = async (updatedData) => {
    try {
      const response = await axiosInstance.put(
        process.env.REACT_APP_BOOK_ROOM,
        updatedData
      );

      if (response.status === 200) {
        setError(null);
        setSuccessMessage('Booking successfully updated!');
      } else {
        setError('Failed to update booking.');
      }
    } catch (error) {
      console.error('Error updating booking:', error);
      setError('Error updating booking.');
    }
  };

  const handleDelete = async (item) => {
    try {
      const url = item.staffID
        ? `${process.env.REACT_APP_DELETE_USER}?staffID=${item.staffID}`
        : item.roomID
        ? `${process.env.REACT_APP_DELETE_ROOM}?roomID=${item.roomID}`
        : '';
  
      if (!url) {
        console.error('Invalid item for deletion:', item);
        return;
      }
  
      const response = await axiosInstance.delete(url);
      console.log("deleting on ", response);
  
      if (response.status === 200) {
        setError(null);
  
        setAllusers((prevAllUsers) => {
          const updatedAllUsers = prevAllUsers.map((chunk) =>
            chunk.filter((user) => user.staffID !== item.staffID)
          );
          return updatedAllUsers;
        });
  
        setSuccessMessage(item.staffID ? 'User deleted successfully!' : 'Room deleted successfully!');
      } else {
        setError(item.staffID ? 'Failed to delete user.' : 'Failed to delete room.');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      setError('Error deleting item.');
    }
  };
  
  
  

  const handleSort = () => {
    const sortedData = [...allusers[page - 1]];
    sortedData.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });
    setAllusers((prev) => {
      const newAllusers = [...prev];
      newAllusers[page - 1] = sortedData;
      return newAllusers;
    });
  };

  const renderTable = () => {
    if (!allusers[page - 1] || allusers[page - 1].length === 0) {
      return <p>No data available</p>;
    }
  
    const columns = Object.keys(allusers[page - 1][0]);
    const filteredColumns = columns.filter((column) => column.toLowerCase() !== 'password');
    const newData = filteredColumns.filter((booking) => booking.toLowerCase() !== 'bookings');
  
    console.log('colums data', columns);
    console.log('filtered Data', filteredColumns);
    console.log('new Data', newData);
  
    return (
      <div className="table-container">
        <>
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                {newData.map((column) => (
                  <th key={column}>{column}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allusers[page - 1]
                .filter((item) => !item.isDeleted) 
                .filter((item) =>
                  userData.trim() === ''
                    ? true
                    : Object.values(item).some(
                        (value) =>
                          typeof value === 'string' && value.toLowerCase().includes(userData.toLowerCase())
                      )
                )
                .map((item, index) => (
                  <tr key={index}>
                    {newData.map((column) => (
                      <td key={column}>
                        {column === 'room'
                          ? item[column]?.roomLocation
                          : column === 'user'
                          ? item[column]?.fullnames
                          : column === 'units' && item[column]
                          ? item[column].unitName
                          : column === 'departments' && item[column]
                          ? item[column].departmentName
                          : typeof item[column] === 'object'
                          ? JSON.stringify(item[column])
                          : item[column]}
                      </td>
                      
                    ))}
                    {/* <td>
                      {item.booking && item.booking.length > 0 ? 'Available' : 'Booked'}
                    </td> */}
                    
                    <td className="button-cell">
                      <button type="button" className="btn btn-success" onClick={() => handleEdit(item)}>
                        <FontAwesomeIcon icon={faEdit} className="s-icons" />
                      </button>
                      <button type="button" className="btn btn-danger" onClick={() => handleDelete(item)}>
                        <FontAwesomeIcon icon={faTrashAlt} className="s-icons" />
                      </button>
                    </td>
                    
                  </tr>
                ))}
            </tbody>
          </table>
  
          <div className="pagination">
            <button
              className="prev"
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              className="next"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === allusers.length}
            >
              Next
            </button>
          </div>
        </>
      </div>
    );
  };
  

  return (
    <div className="card">
      <h1 style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"5px"}}>{title}</h1>
      <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
        <button type="button" className='sort-btn' onClick={handleSort}>
          Sort by Date
        </button>
        <button type="button" className='sort-btn' onClick={HandleReturn}>
         Return  Home
        </button>
      </div>
      {fetchLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="table-responsive">
          <input
            type="search"
            name="Search"
            value={userData}
            onChange={(e) => setUserData(e.target.value)}
            placeholder="Type to search..."
            className="form-control form-control-sm mb-2"
            style={{ width: '800px', marginLeft: '20px', padding:10,borderRadius:20, marginTop:10}}
          />
          {renderTable()}
        </div>
      )}

      {editPopupVisible && (
        <UserEditPopup
          title={title}  
          bookingData={selectedItem}
          onClose={() => setEditPopupVisible(false)}
          onUpdate={handleEditPopupUpdate}
        />
      )}

      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
}

export default Table;