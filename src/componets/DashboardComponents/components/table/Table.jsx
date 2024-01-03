import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './Table.scss';
import useFetch from '../../../../hooks/useFetch';
import EditPopup from '../../../signupFiles/EditPopup'; 
import axios from 'axios';

function Table({ title, data }) {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [editPopupVisible, setEditPopupVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditPopupVisible(true);
  };

  const handleDelete = () => {
    // Your delete logic
  };

  const responseData = data || [];

  useEffect(() => {
    switch (title) {
      case 'ListAllusers':
        setUrl(process.env.REACT_APP_FETCH_USER_DATA_URL);
        break;

      case 'Bookings Some Rooms Here':
      case 'ListBookings':
        setUrl(process.env.REACT_APP_FETCH_ROOMS);
        break;

      default:
        console.error('Invalid title:', title);
    }
  }, [title]);

  const { loading: fetchLoading, data: fetchedData } = useFetch({ url });

  const renderTable = () => {
    if (!fetchedData || fetchedData.length === 0) {
      return <p>No data available</p>;
    }
  
    const columns = Object.keys(fetchedData[0]);
    
    const dataLength = fetchedData.length;
  
    
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
          {fetchedData.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column}>{item[column]}</td>
              ))}
              <td className="button-cell">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => handleEdit(item)}
                >
                  <FontAwesomeIcon icon={faEdit} className="s-icons" />
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(item)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} className="s-icons" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="table-container">
      <h1 className="table-title">{title}</h1>
      {fetchLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-responsive">{renderTable()}</div>
      )}
      {editPopupVisible && (
        <EditPopup
          onClose={() => setEditPopupVisible(false)}
          onSave={async (editedData) => {
            try {
              const response = await axios.post(
                `${process.env.REACT_APP_SIGNUP}`,
                editedData,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
                  },
                }
              );

              if (response.status === 200) {
                setError(null);
                setSuccessMessage('Account successfully updated!');
                console.log(response.data, response.status);
              } else {
                if (response.data && response.data.msg) {
                  setError(response.data.msg);
                } else {
                  throw new Error('Could not Post Data');
                }
              }
            } catch (err) {
              console.error('Error during update:', err);
              setError(err.message);
            }
          }}
          data={selectedItem}
        />
      )}
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
}

export default Table;
