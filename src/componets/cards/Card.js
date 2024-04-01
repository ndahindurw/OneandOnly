//Previous Card

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import authService from "../Services/authService";
import axiosInstance from "../../Axios/axios";
import "./Card.css";
import { IoInformationCircleOutline } from "react-icons/io5";
import RoomReviewCard from "./RoomReviewCard";
import { Dialog, DialogContent } from "@mui/material";

const Card = ({filteredRooms}) => {
  const [error, setError] = useState(null);
  const [roomData, setRoomData] = useState([]);
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
        const roomData = roomResponse.data;

        setRoomData(roomData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data bgfghgf.");
      }
    };

    fetchData();
  }, []);

  console.log("Room Booking Information", roomData);
  const openDeleteDialog = (room) => {
    if (room && room.booking && room.booking.bookingID) {
      setClickedRoom(room); 
      setCredentials(prevCredentials => ({
        ...prevCredentials,
        bookingID: room.booking.bookingID 
      }));
      setDeleteDialogOpen(true); 
    } else {
      console.error("Booking information not found for the selected room.");
    }
  };
  
 

  const closeDeleteDialog = () => {
    console.log("Closing delete dialog");
    setDeleteDialogOpen(false);
    setSelectedRoom(null);
  };


  const collapseDisplay = () => {
    setIsExpanded(false);
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



  console.log(clickedRoom, "sdfsdfClickedRoom")



  const foundRoom = roomNames.find(room => room.roomNameID);
  const roomName = foundRoom ? foundRoom.roomName : "Not Found";


  return (
    <div className="card" id="bookingForm">
      <div className="room-review-card-container">
        <RoomReviewCard
          roomData={roomData}
        />
      </div>
      {console.log("filtered rooms",roomData)}
      <div className="cardContainer-main"  >
        {roomNames.length > 0 && roomData.map((romm, index) => (
          <div key={index +1}>
            <div
              key={romm.roomId}
              className="cardContainersz"
              onClick={() => setClickedRoom(romm)}
              ref={cardContainerRef}
            >
              <div className="all-info" id="allInfo" onClick={() => setIsExpanded(!isExpanded)}>
                <h1>{romm.name}</h1>

                {isExpanded && clickedRoom && clickedRoom.roomId === romm.roomId ? (
                  <>
                    <div >

                      {console.log(romm.booking.user.fullNames, "Debuggss RoomName")}

                      <p>Room ID: {clickedRoom.roomId}</p>
                      <p>Start Time: {clickedRoom.booking.startTime}</p>
                      <p>End Time: {clickedRoom.booking.endTime}</p>
                      <p>Status: {romm.booking.status}</p>
                      <p>User Booked: {romm.booking.user.fullnames}</p>
                      <button onClick={() => openDeleteDialog(romm)}>Release Room</button>

                      <hr />
                    </div>
                                      

                  </>
                ) : (
                  <p className="parag-intro" id="para-header">
                    Booking information for Room Name:{" "}
                    <span className="RoomName">
                      {roomNames.map((room, index) => {
                        const bookingsForRoom = bookingsData.filter(booking => booking.roomId === room.roomID.roomID);
                        if (bookingsForRoom.length > 0) {
                          const roomId = room.roomID.roomID;
                          const roomName = room.roomName;
                          return (
                            <span key={index}>
                              <div> (Room ID: {roomId}) </div>

                            </span>
                          );
                        }
                        return null;
                      })}
                    </span>
                  </p>

                )}
              </div>

              <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
                      <DialogContent>
                      {console.log("Rendering delete dialog")}
                        <div>Are you sure you want to Release this Room?</div>
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
                          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name='purpose' onChange={(e) => HandleChanges(e)}></textarea>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {error && <div className="error-message">{error.message}</div>}
                          {successMessage && <div className="success-message">{successMessage}</div>}
                          <button onClick={() => openDialogframe(romm.roomId)}>Free</button>
                          <button onClick={closeDeleteDialog} style={{ marginLeft: '10px' }}>Cancel</button>
                        </div>

                      </DialogContent>
                    </Dialog>
            </div>
          </div>

          
        ))}
      </div>
    </div>
  );
};

export default Card;
