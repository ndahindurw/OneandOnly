import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import authService from "../Services/authService";
import axiosInstance from "../../Axios/axios";
import "./Card.css";
import { IoInformationCircleOutline } from "react-icons/io5";
import RoomReviewCard from "./RoomReviewCard";
import { Dialog, DialogContent } from "@mui/material";

const Card = ({ bookedHours }) => {
  const [error, setError] = useState(null);
  const [roomData, setRoomData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [inptform, setInptForm] = useState([]);
  const [bookingsData, setBookingsData] = useState([]);
  const [canceledRoom, setCanceledRoom] = useState([])
  const [roomNames, setRoomNames] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clickedRoom, setClickedRoom] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [credentials, setCredentials] = useState({
    bookingID: "",
    purpose: ""
  })
  const [isExpanded, setIsExpanded] = useState(false);

  const cardContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = authService.getToken();

      if (!storedToken) {
        setError("User not authenticated.");
        return;
      }
      try {
        const response = await axios.get(
          process.env.REACT_APP_FETCH_EVENTS,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        const data = response.data;
        setBookingsData(data);
      } catch (error) {
        console.error("Error fetching bookings data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          process.env.REACT_APP_GET_ROOMNAMES
        );
        setRoomNames(response.data);
        console.log("Room Names inside useEffect: ", response.data);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    };

    fetchData();
  }, []);


  const HandleChanges = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials, 
      [name]: value
    }));
  };
  

  const storedToken = authService.getToken();
  useEffect(() => {
    const fetchData = async () => {
      try {

        if (!storedToken) {
          setError("User not authenticated.");
          return;
        }

        const roomResponse = await axiosInstance.get(
          process.env.REACT_APP_FETCH_EVENTS
        );

        const userResponse = await axiosInstance.get(
          process.env.REACT_APP_FETCH_USER_DATA_URL
        );

        const roomData = roomResponse.data;
        const userData = userResponse.data;

        setRoomData(roomData);
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data.");
      }
    };

    fetchData();
  }, [successMessage]);

  console.log("Room Booking Information", roomData);
  const openDeleteDialog = (room) => {
    
    if (room && room.booking && room.booking.bookingID) {
      
      setCredentials(prevCredentials => ({
        ...prevCredentials,
        bookingID: room.booking.bookingID 
        
      }));
    }
    setDeleteDialogOpen(true);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardContainerRef.current && !cardContainerRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedRoom(null);
  };



  const openDialogframe = async () => {
    if (!storedToken) {
      setError("User not authenticated.");
      return;
    }
  
    try {
      const response = await axios.delete(
        process.env.REACT_APP_CLIENT_CANCEL_BOOKING,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          data: {
            bookingID: credentials.bookingID,
            purpose: credentials.purpose
          }
        }
      );
      const data = response.data;
      setCanceledRoom(data);
      setSuccessMessage("Room Successfully Released");
    } catch (error) {
      setError(error.response.data.message);
      setSuccessMessage(null);
      console.error("Error fetching bookings data:", error);
    }
  };
  
  
  
  
  const foundRoom = roomNames.find(room => room.roomNameID);
  const roomName = foundRoom ? foundRoom.roomName : "Not Found";


  return (
    <div className="card" id="bookingForm">
      <div className="room-review-card-container">
        <RoomReviewCard
          roomData={roomData}
          bookedHours={bookedHours}
          clickedRoom={clickedRoom}
          inptform={inptform}
        />
      </div>
      <div className="cardContainer-main"  >
        {roomNames.length > 0 && roomData.map((romm, index) => (
          <div key={index}>
            <div
              key={romm.roomId}
              className="cardContainersz"
              onClick={() => setClickedRoom(romm)}
              ref={cardContainerRef}
            >
              <div className="all-info" >
                <h1>{romm.name}</h1>

                {clickedRoom && clickedRoom.roomId === romm.roomId ? (
                  <>
                    <div>

                  


                      {console.log(romm.booking.bookingID, "Debuggss RoomName")}

                      <p>Room ID: {clickedRoom.roomId}</p>
                      <p>Start Time: {clickedRoom.booking.startTime}</p>
                      <p>End Time: {clickedRoom.booking.endTime}</p>
                      <p>Status: {romm.booking.status}</p>
                      <button onClick={() => openDeleteDialog(romm)}>Release Room</button>

                      <hr />
                    </div>
                    <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
                      <DialogContent>
                        <div>Are you sure you want to delete this Room?</div>
                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                          <label for="exampleFormControlInput1" class="form-label">Booking ID</label>

                          <input
                            type="text"
                            className="form-control"
                            placeholder="Booking ID"
                            name="bookingID"
                            value={credentials.bookingID}
                            onChange={(e) => HandleChanges()}
                          />
                        </div>
                        <div class="mb-3">
                          <label for="exampleFormControlTextarea1" class="form-label" >Enter Reason</label>
                          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name='purpose'  onChange={(e)=>HandleChanges(e)}></textarea>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {error && <div className="error-message">{error.message}</div>}
                          {successMessage && <div className="success-message">{successMessage}</div>}
                          {console.log(roomNames.find(room=>room.roomId  && room.roomId === romm.roomId)?.rom.roomName,"gddfffffffffff")}
                          <button onClick={() => openDialogframe(romm.roomId)}>Free</button>
                          <button onClick={closeDeleteDialog} style={{ marginLeft: '10px' }}>Cancel</button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </>
                ) : (
                  <p className="parag-intro"> Booking information for Room Name : <span className="RoomName">{romm.booking.bookingID}</span></p>
                  
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
