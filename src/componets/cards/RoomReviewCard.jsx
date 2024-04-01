import { useState, useEffect, useRef } from "react";
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
import { Dialog, DialogContent, Select, MenuItem } from "@mui/material";
import axiosInstance from "../../Axios/axios";
import { image0, image2, image3, image5, image4 } from "../images";
import CardForm from "./CardForm";
import './Card.css'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: expand ? "rotate(180deg)" : "rotate(0deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RoomReviewCard({ roomData }) {
  const [roomNames, setRoomNames] = useState([]);
  const [error, setError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [expandedRooms, setExpandedRooms] = useState({});
  const [clickedRoom, setClikedRoom] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState("");
  const [floors, setFloors] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]); 
  const cardRef = useRef(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          process.env.REACT_APP_GET_ROOMNAMES
        );
        setRoomNames(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsFormVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFormVisible]);

  const handleFloorChange = (event) => {
    setSelectedFloor(event.target.value);
  };

  const handleExpandClick = (roomID) => {
    setExpandedRooms((prevExpandedRooms) => ({
      ...prevExpandedRooms,
      [roomID]: !prevExpandedRooms[roomID],
    }));
  };

  const handleFormLoad = (roomID) => {
    setIsFormVisible(!isFormVisible);
    if (!isFormVisible) {
      scrollToBookingForm();
    }
    setClikedRoom(roomID);
  };

  const scrollToBookingForm = () => {
    document.getElementById("bookingForm").scrollIntoView({ behavior: "smooth" });
  };

  const getRoomStatus = (room) => {
    if (!room.roomID.bookings || room.roomID.bookings.length === 0) {
      return {
        status: "AVAILABLE",
        timeDifference: "0 days 0h:0min left to book",
      };
    }


    const nextBooking = room.roomID.bookings.reduce(
      (earliestBooking, currentBooking) => {
        const currentStartTime = new Date(currentBooking.startTime);
        const earliestStartTime = earliestBooking
          ? new Date(earliestBooking.startTime)
          : null; 
        return earliestBooking === null ||
          currentStartTime < earliestStartTime
          ? currentBooking
          : earliestBooking;
      },
      null
    ); 
    if (!nextBooking || isNaN(new Date(nextBooking.startTime).getTime())) {
      return {
        status: "UNKNOWN",
        timeDifference: "0 days 0h:0min left to book",
      }; 
    }

    const currentTime = new Date();
    const bookingStartTime = new Date(nextBooking.startTime);
    const bookingEndTime = new Date(nextBooking.endTime);

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
    else if (currentTime > bookingEndTime) {
      return {
        status: "AVAILABLE",
        timeDifference: "0 days 0h:0min left to book",
      };
    }
  
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

  useEffect(() => {
    const roomLocations = filteredRooms.map(room => room.roomID.roomLocation);
    setFloors(roomLocations);
  }, [filteredRooms]);
  
const filterRooms = () => {
  if (selectedFloor === "All") {
    return roomNames;
  } else {
    return roomNames.filter((room) => room.roomID.roomLocation === selectedFloor);
  }
};


  useEffect(() => {
    console.log("Room Names:", roomNames);
    setFilteredRooms(filterRooms());
  }, [roomNames, selectedFloor]);
  
  
  return (
    <>
      <div className="allContainerCard">
        <div style={{display:"flex",alignItems:'center',justifyContent:"start",flexDirection:'column'}}>
        <Typography variant="h6" style={{ marginBottom: '10px' ,display:"flex",alignItems:'start',justifyContent:"start" }}>Select Floor:</Typography>
      <Select value={selectedFloor} onChange={handleFloorChange} style={{ minWidth: '350px' }}>
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="floor 1">Floor 1</MenuItem>
        <MenuItem value="floor 2">Floor 2</MenuItem>
        <MenuItem value="floor 3">Floor 3</MenuItem>
        <MenuItem value="floor 4">Floor 4</MenuItem>
        <MenuItem value="floor 5">Floor 5</MenuItem>
      </Select>
        </div>

       <div className="displayCardMenu">
       {filteredRooms.map((room, index) => (
  <Card
    key={index}
    sx={{
      maxWidth: 500,
      margin: 2,
      flexBasis: "30%",
      flexGrow: 1,
    }}
    filteredRooms={filteredRooms}
  >
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

      <Typography variant="body2" color="text.secondary">
        Status: {getRoomStatus(room).status || "N/A"}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Next booked hours (hours):{" "}
        {getRoomStatus(room).timeDifference || "N/A"}
      </Typography>

      {roomData &&
        roomData.map((booking, index) =>
          booking.roomId === room.roomID ? (
            <div key={index}>
              <Typography variant="body2" color="text.secondary">
                Booking Purpose: {booking.booking.purpose}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Start Time:{" "}
                {new Date(booking.booking.startTime).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                End Time:{" "}
                {new Date(booking.booking.endTime).toLocaleString()}
              </Typography>
            </div>
          ) : null
        )}
    </CardContent>
    <CardActions disableSpacing>
      <IconButton
        aria-label="add to favorites"
        onClick={(e) => handleFormLoad(room.roomID)}
      >
        <BsFillBookmarkPlusFill />
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
    ></Collapse>
  </Card>
))}


      </div>

      <div className="foundCards">
          {filteredRooms.length === 0 && <Typography>No rooms found.</Typography>}
          {console.log(filterRooms.length,"filteredRooms")}
        </div>

     

      {isFormVisible && (
        <Dialog
          open={isFormVisible}
          onClose={() => setIsFormVisible(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogContent className="dialog-content">
            <CardForm
              ref={cardRef}
              closeRoom={() => setIsFormVisible(false)}
              roomNames={roomNames}
              clickedRoom={clickedRoom}
            />
          </DialogContent>
        </Dialog>
      )}
       </div>
    </>
  );
}
