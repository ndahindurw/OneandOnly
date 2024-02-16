import React, { useEffect, useState } from "react";
import authService from "../Services/authService";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BsFillBookmarkPlusFill } from 'react-icons/bs';
import CardForm from "./CardForm";
import { Dialog, DialogContent } from "@mui/material";
import "./Card.css"
import axios from "axios";
import axiosInstance from "../../Axios/axios";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
const today = new Date();

export default function RoomReviewCard({ roomData }) {
  const  [roomNames,setRoomNames ]= useState();
  const [error,setError]= useState(null)
  const userInfo = authService.getUserInfo();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(process.env.REACT_APP_GET_ROOMNAMES);
        const roomName = response.data;
        setRoomNames(roomName);
        console.log("Room Names inside useEffect: ", roomName);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    };
  
    fetchData();
  }, []);
  

  console.log("AllNames ", roomNames)
  

 

 
 
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [expandedRooms, setExpandedRooms] = useState({});


  const handleExpandClick = (roomID) => {
    setExpandedRooms((prevExpandedRooms) => {
      const newExpandedRooms = {};
      Object.keys(prevExpandedRooms).forEach((prevRoomID) => {
        newExpandedRooms[prevRoomID] = false;
      });
      newExpandedRooms[roomID] = !prevExpandedRooms[roomID];
  
      return newExpandedRooms;
    });
  };


  const handleFormLoad = () => {
    setIsFormVisible(!isFormVisible);
    if (!isFormVisible) {
      scrollToBookingForm();
    }
  };
  
  

 
  const scrollToBookingForm = () => {
    document.getElementById('bookingForm').scrollIntoView();
  };

  const getRoomStatus = (room) => {
    const currUserID = authService.getUserInfo()?.userId;
    const booking = room.bookings.find(bookin => {
      if (bookin.user.staffID == currUserID) {
        return true
      } else return false
    });
    if (room.bookings.length === 0 || !booking || booking?.status === "CANCELED") return 0;
    return booking.status ;
  }

  return (
    <>
      { roomNames && roomNames.map((room, index)  => (
         <Card key={index} sx={{ maxWidth: 500, margin: 2, flexBasis: '30%', flexGrow: 1 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="rra">
                RRA
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
               
              </IconButton>
            }
            title={`Room ${room.roomName}`}
            subheader={new Date().toLocaleDateString()}
          />
          <CardMedia>
            <img src={room.roomID.imagePath} alt={`Room ${index}`} style={{ width: '100%', height: '35vh', objectFit: "cover" }} />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
  
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi odit vitae quaerat, nulla, aut mollitia assumenda asperiores at unde architecto minima consequatur officiis sint? Eius, sed perferendis! Ut, fugit expedita.
              </Typography>
              <Typography variant="body2" color="text.secondary">
            
              </Typography>
            </CardContent>
          </CardMedia>
          <CardActions disableSpacing>
            <IconButton
              aria-label="add to favorites"
              onClick={() => handleFormLoad()}
            >
              <BsFillBookmarkPlusFill />
            </IconButton>
            <ExpandMore
              expand={expandedRooms[room.roomID.roomID]}
              onClick={() => handleExpandClick(room.roomID.roomID)}
              aria-expanded={expandedRooms[room.roomID.roomID]}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse
            in={expandedRooms[room.roomID.roomID]}
            timeout="auto"
            unmountOnExit
            sx={{ flexShrink: 0 }}
          >
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Location: {room.roomID.roomLocation || 'N/A'}
              </Typography>
              <Typography style={{flexWrap:"wrap"}}>
               Description: {room.roomID.roomDescription || "N/A"}
              </Typography>
              {room.roomID.bookings && room.roomID.bookings.length > 0 ? (
                <div>
                  <Typography variant="body2" color="text.secondary">
                    Bookings for {today.toLocaleDateString()}:
                  </Typography>
                  <ul>
                        <li>
                          <Typography variant="body2" color="text.secondary">
                            Start: {new Date(room.roomID.startTime).toLocaleTimeString()}
                          </Typography>
                          </li><li>
                          <Typography variant="body2" color="text.secondary">
                            End: {new Date(room.roomID.endTime).toLocaleTimeString()}
                          </Typography>
                          </li><li>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ color: getRoomStatus(room.roomID) !== 1 ? 'blue' : 'green' }}
                          >
                            Status: { getRoomStatus(room.roomID) !== 1 ? 'READY FOR BOOKING' : 'BOOKED' }
                          </Typography>
                        </li>
                  </ul>
                </div>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ color: 'green' }}>
                  Status: Ready to be booked...
                </Typography>
              )}
            </CardContent>
          </Collapse>
        </Card>
      ))}
      

{isFormVisible && (
        <Dialog open={isFormVisible} onClose={handleFormLoad} maxWidth="md" 
        fullWidth>
          <DialogContent>
            <CardForm closeRoom={() => setIsFormVisible(false)} roomNames={roomNames} />
          </DialogContent  >
        </Dialog>
      )}
    </>
  );
  
  
}
