import React, { useState } from 'react';
import SideBar from '../components/sidebarDash/SideBar';
import NavbarDash from '../components/navbarDash/NavbarDash';
import { FaFolderOpen } from 'react-icons/fa';
import './New.scss';
import axios from 'axios';
import axiosInstance from '../../../Axios/axios';
import { BookInputs, RoomInputs, UserInputs } from '../components/FormSource';

function New({ inputs, title }) {
  const [selectedImage, setSelectedImage] = useState(null); // Updated initial state
  const [formInputs, setFormInputs] = useState({});

  const handleChanges = (e) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };

  function handleChangesImage(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    } else {
      // Handle case where the user removed the selected file
      setSelectedImage(null); // or an empty string as appropriate
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(formInputs).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('roomImage', selectedImage);

    switch (title) {
      case 'Ad New user':
        try {
          const res = await axios.post(process.env.REACT_APP_API_ENDPOINT, formInputs);
          console.log(title, selectedImage, formInputs);
          console.log("User added successfully:", res.data);
        } catch (error) {
          console.error("Error adding user:", error);
        }
        break;

      case 'Add Some Rooms Here':
        try {
          const [imageRes, roomsRes] = await Promise.all([
            axios.post(process.env.REACT_APP_API_ENDPOINT_ADDROOM_IMAGE, selectedImage, {
              headers: {
                'Content-Type': 'application/json',
              },
            }),
            axios.post(process.env.REACT_APP_API_ENDPOINT_ADDROOMS, formData),
          ]);

          console.log("Image upload response:", imageRes.data);
          console.log("Rooms added successfully:", roomsRes.data);
        } catch (error) {
          console.error("Error adding rooms:", error);
        }
        break;

      default:
        console.error("Invalid title:", title);
    }
  };

  return (
    <div className="new">
      <SideBar />
      <div className="newcontainer">
        <NavbarDash />
        <div className="top">
          <h1 className="">{title}</h1>
        </div>

        <div className="bottom">
          <div className="left">
            <img
              src={selectedImage || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
              alt=""
            />
          </div>

          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">Image:<FaFolderOpen className="icon" /></label>
                <input
                  type="file"
                  id="file"
                  style={{ display: 'none' }}
                  name='roomImage'
                  className="inputRoom"
                  onChange={handleChangesImage}
                />
              </div>

              {inputs.map((i) => (
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
              <button type="submit">Approve</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default New;
