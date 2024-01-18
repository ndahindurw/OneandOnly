import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './Table.scss';
import useFetch from '../../../../hooks/useFetch';
import BookingEditPopup from './BookingEditPopup';
import axiosInstance from '../../../../Axios/axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Table({ title, data }) {
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
    switch (title) {
      case 'ListAllusers':
        setUrl(process.env.REACT_APP_FETCH_USER_DATA_URL);
        break;
      case 'Available Some Rooms':
        setUrl(process.env.REACT_APP_FETCH_ROOMS);
        break;
      default:
        console.error('Invalid title:', title);
    }
  }, [title]);

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

  const handleDelete = () => {
    // Implement delete functionality if needed
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

    return (
      <div className="table-container">
        <>
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                {filteredColumns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
                <th>
                  Actions           
                </th>
              </tr>
            </thead>
            <tbody>
              {allusers[page - 1]
                .filter((item) =>
                  userData.trim() === ''
                    ? true
                    : Object.values(item).some(
                        (value) => typeof value === 'string' && value.toLowerCase().includes(userData.toLowerCase())
                      )
                )
                .map((item, index) => (
                  <tr key={index}>
                    {filteredColumns.map((column) => (
                      <td key={column}>
                        {column === 'room'
                          ? item[column].roomLocation
                          : column === 'user'
                          ? item[column].fullnames
                          : typeof item[column] === 'object'
                          ? JSON.stringify(item[column])
                          : item[column]}
                      </td>
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

          <div className="pagination">
            <button className="prev" onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>
              Previous
            </button>
            <button className="next" onClick={() => setPage((prev) => prev + 1)} disabled={page === allusers.length}>
              Next
            </button>
          </div>
          
        </>
      </div>
    );
  };

  return (
    <div className="table-container">
      <h1 style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"30px"}}>{title}</h1>
      <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end",marginTop:"10px"}}>
        <button type="button" className='sort-btn' onClick={handleSort}>
          Sort by Date
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
            style={{ width: '600px', marginLeft: '20px' }}
          />
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
