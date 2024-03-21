import React, { useState, useEffect } from 'react';
import { FaFolderOpen } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Widget from '../widget/WidgetApp';
import { RoomInputs } from '../FormSource';
import axiosInstance from '../../../../Axios/axios';

function RoomEditPopup({ title, clickedRoom }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [messageTimeout, setMessageTimeout] = useState(null);
  const [formInputs, setFormInputs] = useState({
    roomLocation: '',
    capacity: 0,
    roomDescription: '',
  });

  useEffect(() => {
    if (clickedRoom) {
      console.log(clickedRoom,"Clicked Rooomm")
      setFormInputs({
        roomLocation: clickedRoom.roomLocation,
        capacity: clickedRoom.capacity,
        roomDescription: clickedRoom.roomDescription,
      });
      setSelectedImage(clickedRoom.imagePath); 
    }
  }, [clickedRoom]);

  const handleChanges = (e) => {
    setError(null);
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };
  
  const clearMessages = () => {
    setError(null);
    setSuccessMessage(null);
  };

  const handleChangesImage = (e) => {
    const file = e.target.files[0];
    
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formInputs.roomLocation || !formInputs.capacity || !formInputs.roomDescription ) {
      setError('Please fill in all the fields and upload an image.');
      setMessageTimeout(setTimeout(clearMessages, 5000));
      return;
    }

    try {
      const formData = new FormData();

      
      // formData.append('file', formInputs.file.get('file')); 
      formData.append('roomLocation', formInputs.roomLocation);
      formData.append('capacity', formInputs.capacity);
      formData.append('roomDescription', formInputs.roomDescription);

      console.log('Form Data:', formData);

      const responseData = await fetch(
        process.env.REACT_APP_API_ENDPOINT_UPDATE_ROOM + `?roomID=${clickedRoom.roomID}`,
        
        {
          method: 'put',
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`
          },
          body : formData,
        }

      );
      const resposeJSoo =await responseData.json()
      console.log(resposeJSoo,"REsssssss")

      setSuccessMessage('Rooms Updated successfully');

      setMessageTimeout(setTimeout(clearMessages, 5000));
      
    } catch (error) {
      setError('Failed to update rooms. Please try again.');
      setMessageTimeout(setTimeout(clearMessages, 5000));
    }
  };

  return (
    <div className="new">
      <div className="newcontainer">
        <div className="top">
          <h1 style={{ marginTop: '40px' }}>{title}</h1>
        </div>

        <div className="bottom">
          <div className="left">
            <img
              src={selectedImage || 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'}
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="formInput">
                <label htmlFor="file">Image:</label>
                <input
                  type="file"
                  id="file"
                  style={{display:'none'}}
                  name="file"
                  className="inputRoom"
                  onChange={handleChangesImage}
                />
                <FaFolderOpen className="icon" onClick={() => document.getElementById('file').click()} />
              </div>

              {RoomInputs.map((i) => (
                <div className="formInput" key={i.id}>
                  <label>{i.label}</label>
                  <input
                    type={i.type}
                    placeholder={i.placeholder}
                    name={i.name}
                    className="inputRoom"
                    value={formInputs[i.name]}
                    onChange={handleChanges}
                  />
                </div>
              ))}
              {successMessage && <div className="success-message">{successMessage}</div>}
              {error && <div className="error-message">{error}</div>}
              <button type="submit" onClick={handleSubmit}>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomEditPopup;
