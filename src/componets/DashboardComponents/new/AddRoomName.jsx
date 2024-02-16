import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../Axios/axios';
import { TbError404 } from 'react-icons/tb';
import "./New.scss"


function AddRoomName({ title }) {
  const [RoomNames, setRoomName] = useState([]);
  const [data, setData] = useState({ roomName: "", roomID: "" });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    axiosInstance.get(process.env.REACT_APP_FETCH_ROOMS)
      .then((res) => {
        if (res && Array.isArray(res.data)) {
          setRoomName(res.data);
          console.log("These are my data", res.data);
        }
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = (name === "roomID" || name === "staffID") ? parseInt(value) : value;
    setData({ ...data, [name]: parsedValue });
  }
  
  const handleClickEve = (e) => {
    e.preventDefault();
  
    const isDuplicate = RoomNames.some(
      (room) =>
        room.roomID === data.roomID &&
        room.roomName &&
        room.roomName.toLowerCase() === data.roomName.toLowerCase()
    );
  
    if (isDuplicate) {
      setError("Error: Room name already exists for the selected ID");
      return;
    }
  
    console.log("Data to be sent:", data);
  
    axiosInstance
      .post(process.env.REACT_APP_ROOM_NAME, data)
      .then((res) => {
        if (res && Array.isArray(res.data)) {
          setRoomName(res.data);
          console.log("res", successMessage);
          setSuccessMessage("Submission successful!");
          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
        }
      })
      .catch((error) => {
        setError(error);
      });
  };
  
   

  if (RoomNames.length === 0) {
    return <p>Loading...</p>;
  }

  console.log("Room Names",RoomNames)

  return (
    <div>

      <form className='' onSubmit={handleClickEve}>
        <select name="roomID" id="" className="form-select" aria-label="Default select example" onChange={handleChange}>
          <option value="">select a Room Location</option>
          {
            RoomNames.map((room) => (
              <option key={room.roomID} value={room.roomID}>{room.roomID}</option>
            ))
          }
        </select>
        <input type="text" placeholder='Enter the Room Name' onChange={handleChange} name="roomName" />
        {successMessage && <div className="success-message">{successMessage}</div>}
            {error && <div className="error-message">{error}</div>}
        <button className='green-btn'>Submit</button>
      </form>
    </div>
  );
}

export default AddRoomName;
