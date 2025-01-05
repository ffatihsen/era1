import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { postJoinEvent, getEventById, postAddComment } from '../Services/';
import PrimarySearchAppBar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import CommentSection from '../components/CommentSection';
import Toastbox from '../components/Toastbox';

const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [comments, setComments] = useState([]);
  const [isJoined, setIsJoined] = useState(false);

  const token = localStorage.getItem('token');

  const fetchEventDetails = async () => {
    try {
      let res = await getEventById(token, eventId);
      if (res.status === 200) {
        setEvent(res.data);
        setComments(res.data.comments);
      }
    } catch (error) {
      Toastbox("error", "Etkinlik detayları yüklenirken bir hata oluştu.");
    }
  };

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const handleAddComment = async (comment) => {
    try {
      let res = await postAddComment(token, eventId, { comment });
      if (res.status === 200) {
        Toastbox("success", res.data.message);
        setComments([...comments, { comment, userName: "You", date: new Date().toISOString() }]);
      }
    } catch (error) {
      Toastbox("error", "An unexpected error occurred.");
    }
  };

  const handleJoinEvent = async () => {
    try {
      let res = await postJoinEvent(token, eventId);
      if (res.status === 200) {
        setIsJoined(true);
        Toastbox("success", "Etkinliğe katıldınız!");
      }
    } catch (error) {
        const message = error.response?.data?.error || "An unexpected error occurred!";
        Toastbox("error", message);
      }
  };

  return (
    <div>
      <PrimarySearchAppBar />
      {event && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
            gap: 4,
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 600 }}>
            <img
              src={event.photo || '/evenActivityPhoto.webp'}
              alt="Event"
              style={{ width: '100%', borderRadius: 8, objectFit: 'cover' }}
            />
          </Box>

          <Paper sx={{ width: '100%', maxWidth: 600, padding: 3 }}>
            <Typography variant="h5" gutterBottom>{event.title}</Typography>
            <Typography variant="body1" paragraph>{event.description}</Typography>
            <Typography variant="h6" paragraph>Katılımcılar: {event.attendeeCount}</Typography>
            <Button
              variant="contained"
              color={isJoined ? 'secondary' : 'primary'}
              onClick={handleJoinEvent}
              fullWidth
            >
              {isJoined ? 'Katıldınız' : 'Katıl'}
            </Button>
          </Paper>

          {/* Comment Section */}
          <CommentSection comments={comments} onAddComment={handleAddComment} />
        </Box>
      )}
    </div>
  );
};

export default EventDetail;
