import { Paper, Typography, Button, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import EventIcon from '@mui/icons-material/Event';
import { Box } from '@mui/system';
import { getEvents, postJoinEvent } from '../../Services';
import Toastbox from '../Toastbox';
import InfoIcon from '@mui/icons-material/Info';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from 'react-router';

const EventList = ({ refresh, setRefresh , date,setDate, searchkey }) => {
  const token = localStorage.getItem('token');
  const [eventData, setEventData] = useState([]);


  const navigate = useNavigate();

  const getEventList = async () => {
    try {
      const res = await getEvents(token, date, searchkey);
      if (res.status === 200) {
        setEventData(res.data);
      }
    } catch (error) {
      let message = error.response?.data?.message || error.response?.data.error ;
      message = message.length > 0 ? message :  "An unexpected error occurred!"

      Toastbox("error", message);
    }
  };

  useEffect(() => {
    getEventList();
  }, [refresh,date]);

  const formatDate = (date) => {
    const eventDate = new Date(date);
    return eventDate.toLocaleDateString('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleJoinEvent = async(eventId) => {
    try {
      let res = await postJoinEvent(token,eventId)
      if(res.status == 200){
        Toastbox("success", res.data.message);
      }
    } catch (error) {
      const message = error.response?.data?.error || "An unexpected error occurred!";
      Toastbox("error", message);
    }

  };

  const handleViewDetails = (eventId) => {
    navigate('/feed/'+eventId);
  };

  const handleShareEvent = (eventId) => {
    console.log(`Paylaşılmak istenilen etkinlik ID: ${eventId}`);
  };

  return (
    <div>
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflowY: 'auto',
        }}
      >
        <EventIcon sx={{ fontSize: 50, color: 'primary.main' }} />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Events
        </Typography>

        <Box sx={{ marginTop: 2, maxHeight: '70vh', overflowY: 'scroll' }}>
          {eventData.length > 0 ? (
            eventData.map((item) => (
              <Box
                key={item.id}  
                sx={{
                  marginBottom: 2,
                  padding: 2,
                  border: '1px solid #ddd',
                  borderRadius: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Typography variant="body1">{item.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Date: {formatDate(item.date)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                  Organizer: {item.organizer}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
               
                <IconButton onClick={() => handleViewDetails(item._id)}>
                  <InfoIcon sx={{ color: 'primary.main' }} />
                </IconButton>

               
                <IconButton onClick={() => handleShareEvent(item._id)}>
                  <ShareIcon sx={{ color: 'primary.main' }} />
                </IconButton>

                
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleJoinEvent(item._id)}
                  sx={{ height: 'fit-content' }}
                >
                  Join
                </Button>
              </Box>


              </Box>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              There are no events yet.
            </Typography>
          )}
        </Box>
      </Paper>
    </div>
  );
};

export default EventList;
