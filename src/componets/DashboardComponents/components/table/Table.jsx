import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './Table.scss';
import useFetch from '../../../../hooks/useFetch';

function Table({ title, data }) {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');

  const handleEdit = () => {
    // Your edit logic
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
    const dataLenght = fetchedData.length
    console.log("number of user",dataLenght)
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
                {/* <button type="button" className="btn btn-primary">
                  <FontAwesomeIcon icon={faEye} className="s-icons" />
                </button> */}
                <button type="button" className="btn btn-success">
                  <FontAwesomeIcon icon={faEdit} className="s-icons" />
                </button>
                <button type="button" className="btn btn-danger">
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
      <h1 className='table-title'>{title}</h1>
      {fetchLoading ? <p>Loading...</p> : <div className="table-responsive">{renderTable()}</div>}
    </div>
  );
}

export default Table;
