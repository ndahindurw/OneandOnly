import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './Table.scss';
import useFetch from '../../../../hooks/useFetch';

function Table({ title, data }) {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');

  const handleEdit = () => {
    
  };

  const handleDelete = () => {
    
  };

  
  const responseData = data || [];

  
  switch (title) {
    case 'Fetch users':
      setUrl(process.env.REACT_APP_FETCH_USER_DATA_URL);
      break;

    case 'Fetch Some Rooms Here':
      setUrl(process.env.REACT_APP_FETCH_ROOMS);
      break;

    case 'ListBookings':
      setUrl(process.env.REACT_APP_FETCH_ROOMS);
      break;

    default:
      console.error("Invalid title:", title);
  }


  const { loading: fetchLoading, data: fetchedData } = useFetch({ url });

  return (
    <div className='table-container'>
      <h1>{title}</h1>
      {fetchLoading ? (
        <p>Loading...</p>
      ) : (
        <div className='table-responsive'>
          <table className='table'>
            <thead>
              <tr>
                <th>Emp No</th>
                <th>FullNames</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fetchedData &&
                fetchedData.map((item) => (
                  <tr key={item.user.userNo}>
                    <td>{item.user.empNo}</td>
                    <td>{item.user.updatedAt}</td>
                    <td>{item.user.status}</td>
                    <td className='button-cell'>
                      <button type='button' className='btn btn-primary'>
                        <FontAwesomeIcon icon={faEye} className='s-icons' />
                      </button>
                      <button type='button' className='btn btn-success'>
                        <FontAwesomeIcon icon={faEdit} className='s-icons' />
                      </button>
                      <button type='button' className='btn btn-danger'>
                        <FontAwesomeIcon icon={faTrashAlt} className='s-icons' />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Table;
