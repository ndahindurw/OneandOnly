import React, { useEffect } from 'react';
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
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { BsFillBookmarkPlusFill } from 'react-icons/bs';
import { FaLocationDot } from 'react-icons/fa6';

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


export default function RoomReviewCard({ roomData, bookedHours, inptform }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  useEffect(() => {
 
  }, [roomData]);
  return (
    <>
      {roomData.map((room, index) => (
        <Card key={index} sx={{ maxWidth: 420, margin: 2 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="rra">
                RRA
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={`Room ${index + 1}`}
            subheader={new Date().toLocaleDateString()}
          />
          <CardMedia>
            <img src={room.imagePath} alt={`Room ${index}`} style={{ width: '100%', height: '100%' }} />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {room.roomDescription}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, aspernatur!
              </Typography>
            </CardContent>
          </CardMedia>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <BsFillBookmarkPlusFill />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Location: {room.roomLocation || 'N/A'}
              </Typography>
              {room.bookings && room.bookings.length > 0 ? (
                <div>
                  <Typography variant="body2" color="text.secondary">
                    Bookings:
                  </Typography>
                  <ul>
                    {room.bookings.map((booking, bookingIndex) => (
                      <li key={bookingIndex}>
                        <Typography variant="body2" color="text.secondary">
                          Start: {booking.startTime ? new Date(booking.startTime).toLocaleString() : 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          End: {booking.endTime ? new Date(booking.endTime).toLocaleString() : 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ color: booking.status ? 'blue' : 'green' }}>
                          Status: {booking.status ? 'BOOKED' : 'READY TO BE BOOKED'}
                        </Typography>
                      </li>
                    ))}
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
    </>
  );
}