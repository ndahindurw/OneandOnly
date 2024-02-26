import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import { Dialog, DialogContent } from "@mui/material";
import axiosInstance from "../../Axios/axios";
import { image0, image2, image3, image5, image4 } from "../images";
import CardForm from "./CardForm";
import { set } from "date-fns";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const today = new Date();

export default function RoomReviewCard({ roomData }) {
  const [roomNames, setRoomNames] = useState([]);
  const [error, setError] = useState(null);
  const [photoos, setPhotoos] = useState({
    image0,
    image2,
    image3,
    image5,
    image4,
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [expandedRooms, setExpandedRooms] = useState({});
  const [clickedRoom,setClikedRoom]= useState([])

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

  const handleExpandClick = (roomID) => {
    setExpandedRooms((prevExpandedRooms) => ({
      ...Object.fromEntries(
        Object.entries(prevExpandedRooms).map(([key, value]) => [
          key,
          key === roomID ? !value : false,
        ])
      ),
    }));
  };

  const handleFormLoad = ({roomID,e}) => {
    setIsFormVisible(!isFormVisible);
    if (!isFormVisible) {
      scrollToBookingForm();
    }
  setClikedRoom(roomID)
  };

  const scrollToBookingForm = () => {
    document.getElementById("bookingForm").scrollIntoView({ behavior: "smooth" });
  };

  const getRoomStatus = (room) => {
    if (!room.roomID.bookings || room.roomID.bookings.length === 0) {
      console.log("rooiddd test ", room.roomID);
      return {
        status: "AVAILABLE",
        timeDifference: "0 days 0h:0min left to book",
      }; // Return 'AVAILABLE' when there are no bookings
    }

    // Find the earliest booking after the current time
    const nextBooking = room.roomID.bookings.reduce(
      (earliestBooking, currentBooking) => {
        const currentStartTime = new Date(currentBooking.startTime);
        const earliestStartTime = earliestBooking
          ? new Date(earliestBooking.startTime)
          : null; // Use null as initial value
        return earliestBooking === null ||
          currentStartTime < earliestStartTime
          ? currentBooking
          : earliestBooking;
      },
      null
    ); // Provide null as initial value

    // Check if nextBooking is defined and startTime is a valid time value
    if (!nextBooking || isNaN(new Date(nextBooking.startTime).getTime())) {
      return {
        status: "UNKNOWN",
        timeDifference: "0 days 0h:0min left to book",
      }; // Handle invalid time value
    }

    // Calculate the time difference between now and the next booking's start time
    const currentTime = new Date();
    const bookingStartTime = new Date(nextBooking.startTime);
    const bookingEndTime = new Date(nextBooking.endTime);

    // If the current time is before the booking start time, room is AVAILABLE
    if (currentTime < bookingStartTime) {
      const timeDiffInMs = bookingStartTime - currentTime;
      const days = Math.floor(timeDiffInMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDiffInMs % (1000 * 60 * 60)) / (1000 * 60));
      return {
        status: `AVAILABLE from now`,
        timeDifference: `${days} days ${hours}h:${minutes}min`,
      };
    }
    // If the current time is after the booking end time, room is AVAILABLE
    else if (currentTime > bookingEndTime) {
      return {
        status: "AVAILABLE",
        timeDifference: "0 days 0h:0min left to book",
      };
    }
    // If the current time is between booking start and end time, room is BOOKED
    else {
      const timeDiffInMs = bookingEndTime - currentTime;
      const days = Math.floor(timeDiffInMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDiffInMs % (1000 * 60 * 60)) / (1000 * 60));
      return {
        status: `BOOKED until ${days} days ${hours}h:${minutes}min`,
        timeDifference: `${days} days ${hours}h:${minutes}min`,
      };
    }
  };

  return (
    <>
      {roomNames &&
        roomNames.map((room, index) => (
          <Card
            key={index}
            sx={{ maxWidth: 500, margin: 2, flexBasis: "30%", flexGrow: 1 }}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="rra">
                  RRA
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  {/* Placeholder for settings */}
                </IconButton>
              }
              title={` ${room.roomName ? room.roomName : room.roomID.roomName}`}
              subheader={new Date().toLocaleDateString()}
            />
            <CardContent>
              <Typography>
                <CardMedia>
                  <img
                    src={room.roomID.imagePath}
                    alt={`Room ${index}`}
                    style={{
                      width: "100%",
                      height: "35vh",
                      objectFit: "cover",
                    }}
                  />
                </CardMedia>
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Description: {room.roomID.roomDescription || "N/A"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Location: {room.roomID.roomLocation || "N/A"}
              </Typography>
              {/* Display room status and time difference */}
              <Typography variant="body2" color="text.secondary">
                Status: {getRoomStatus(room).status || "N/A"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Next booked hours (hours): {getRoomStatus(room).timeDifference || "N/A"}
              </Typography>
              {/* Display booking information */}
              {roomData &&
                roomData.map((booking, index) => (
                  booking.roomId === room.roomID && (
                    <div key={index}>
                      <Typography variant="body2" color="text.secondary">
                        Booking Purpose: {booking.booking.purpose}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Start Time: {new Date(booking.booking.startTime).toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        End Time: {new Date(booking.booking.endTime).toLocaleString()}
                      </Typography>
                    </div>
                  )
                ))}
            </CardContent>
            <CardActions disableSpacing>
              <IconButton
                aria-label="add to favorites"
                onClick={(e) => handleFormLoad(room.roomID)}
              >
                <BsFillBookmarkPlusFill  />
              </IconButton>
              <ExpandMore
                expand={expandedRooms[room.roomID]}
                onClick={() => handleExpandClick(room.roomID)}
                aria-expanded={expandedRooms[room.roomID]}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse
              in={expandedRooms[room.roomID]}
              timeout="auto"
              unmountOnExit
              sx={{ flexShrink: 0 }}
            >
              <CardContent>
                {/* Additional information you want to display when expanded */}
              </CardContent>
            </Collapse>
          </Card>
        ))}
        
         { isFormVisible && (
            <Dialog
              open={isFormVisible}
              onClose={() => setIsFormVisible(false)}
              maxWidth="md"
              fullWidth
            >
              <DialogContent>
                <CardForm
                  closeRoom={() => setIsFormVisible(false)}
                  roomNames={roomNames}
                  clickedRoom={clickedRoom}
                />
              </DialogContent>
            </Dialog>
          )}
       
    </>
  );
}
