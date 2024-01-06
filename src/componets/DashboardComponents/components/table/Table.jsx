import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './Table.scss';
import useFetch from '../../../../hooks/useFetch';
import EditPopup from '../../../signupFiles/EditPopup';
import axios from 'axios';
import BookingEditPopup from './BookingEditPopup';
import authService from '../../../Services/authService';

function Table({ title, data }) {
  console.log('Title:', title);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [editPopupVisible, setEditPopupVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [userData, setUserData] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const { loading: fetchLoading, data: fetchedData } = useFetch({url});
  
  const handleEditPopupUpdate = async (updatedData) => {
    try {
      const storedToken = authService.getToken();
  
      if (!storedToken) {
        setError('User not authenticated.');
        return;
      }
  
      const response = await axios.post(
        process.env.REACT_APP_BOOK_ROOM,
        updatedData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedToken}`,
          },
        }
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


  useEffect(() => {
    console.log('Title:', title);
    console.log('URL (before):', url);
    switch (title) {
      case 'ListAllusers':
        setUrl(process.env.REACT_APP_FETCH_USER_DATA_URL);
        break;
      case 'BookingsSomeRooms':
        setUrl(process.env.REACT_APP_FETCH_PENDING_ROOMS);
        break;
      case 'BookingsSomeRoomsHere': // Add this case
        setUrl(/* Your corresponding URL for BookingsSomeRoomsHere */);
        break;
      default:
        console.error('Invalid title:', title);
    }
    console.log('URL (after):', url);
    console.log('Fetched Data:', fetchedData);
  }, [title, url]);
  

   const handleEdit = (item) => {
    setSelectedItem(item);
    setEditPopupVisible(true);
  };

  const handleDelete = () => {
    // Your delete logic
  };

  const renderTable = () => {
    if (!fetchedData || fetchedData.length === 0) {
      return <p>No data available</p>;
    }

    const columns = Object.keys(fetchedData[0]);
    

    return (
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
<tbody>
  {fetchedData
    .filter((item) =>
    userData.trim() === '' ? true : 
    Object.values(item).some((value) => 
      typeof value === 'string' && value.toLowerCase().includes(userData.toLowerCase())
    )
  )
  
    .map((item, index) => (
      <tr key={index}>
      {columns.map((column) => (
  <td key={column}>{typeof item[column] === 'object' ? JSON.stringify(item[column]) : item[column]}</td>
))}
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
    );
  };

  
  
  {editPopupVisible && (
    <BookingEditPopup
      bookingData={selectedItem}
      onClose={() => setEditPopupVisible(false)}
      onUpdate={handleEditPopupUpdate}
    />
  )}
  return (
    <div className="table-container">
      <h1 className="table-title">{title}</h1>
      {fetchLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="table-responsive">
          <input type="search" name="Search" value={userData} onChange={(e) => setUserData(e.target.value)} />
          {renderTable()}
        </div>
      )}

      {editPopupVisible && (
        <BookingEditPopup
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
