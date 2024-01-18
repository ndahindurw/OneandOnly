import React, { useState } from 'react';
import SideBar from '../components/sidebarDash/SideBar';
import NavbarDash from '../components/navbarDash/NavbarDash';
import { FaFolderOpen } from 'react-icons/fa';
import './New.scss';
import axios from 'axios';
import axiosInstance from '../../../Axios/axios';
import { RoomInputs } from '../components/FormSource';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function New({ title }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [formInputs, setFormInputs] = useState({
    roomLocation: '',
    capacity: 0,
    roomDescription: '',
  });

  const handleChanges = (e) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.name === 'capacity' ? parseInt(e.target.value, 10) : e.target.value });
};


const handleChangesImage = (e) => {
  const file = e.target.files[0];

  if (file) {
      const newFormData = new FormData();

      newFormData.append('file', file);
      newFormData.append('roomDescription', formInputs.roomDescription);
      newFormData.append('roomLocation', formInputs.roomLocation);
      newFormData.append('capacity', formInputs.capacity);

      setFormInputs({
          ...formInputs,
          file: newFormData,
          roomLocation: formInputs.roomLocation,
          capacity: formInputs.capacity,
          roomDescription: formInputs.roomDescription,
      });

      setSelectedImage(URL.createObjectURL(file));
  } else {
      setSelectedImage(null);
  }
};



  const notify = () => {
    toast.success('Success', { position: toast.POSITION.TOP_CENTER });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formInputs.roomLocation || !formInputs.capacity || !formInputs.roomDescription || !selectedImage) {
      setError('Please fill in all the fields and upload an image.');
      return;
    }
  
    try {
      const formData = new FormData();
  
      // Append formInputs values to formData
      formData.append('file', formInputs.file.get('file')); // Assuming 'file' is the key used in the FormData
      formData.append('roomLocation', formInputs.roomLocation);
      formData.append('capacity', formInputs.capacity);
      formData.append('roomDescription', formInputs.roomDescription);
  
      // Log the formData for debugging
      console.log('Form Data:', formData);
  
      const responseData = await axios.post(
        process.env.REACT_APP_API_ENDPOINT_ADDROOMS,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`
          },
        }
      );
  
      console.log('Rooms added successfully:', responseData.data);
      console.log(title, selectedImage, formInputs);
      setSuccessMessage('Rooms added successfully');
    } catch (error) {
      console.error('Error adding rooms:', error);
      setError('Failed to add rooms. Please try again.');
    }
  };
  


  return (
    <div className="new">
      <SideBar />
      <div className="newcontainer">
        <div className="top">
          <h1 style={{marginTop:"40px"}}>{title}</h1>
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
                <label htmlFor="file">Image:<FaFolderOpen className="icon" /></label>
                <input
                  type="file"
                  id="file"
                  style={{ display: 'none' }}
                  name="file"
                  className="inputRoom"
                  onChange={handleChangesImage}
                />
              </div>
              

              {RoomInputs.map((i) => (
                <div className="formInput" key={i.id}>
                  <label>{i.label}</label>
                  <input
                    type={i.type}
                    placeholder={i.placeholder}
                    name={i.name}
                    className="inputRoom"
                    onChange={handleChanges}
                  />
                </div>
              ))}
              {successMessage && <div className="success-message">{successMessage}</div>}
              {error && <div className="error-message">{error}</div>}
              <button type="submit" onClick={notify}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default New;
