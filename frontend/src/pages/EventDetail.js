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
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const token = localStorage.getItem('token');

  const fetchEventDetails = async (isScroll = false) => {
    if (isScroll) setIsLoading(true);
    try {
      const res = await getEventById(token, eventId, page );
      if (res.status === 200) {
        setEvent(res.data)
        const newComments = res.data.comments;
        setComments((prev) => (isScroll ? [...prev, ...newComments] : newComments));
        if (isScroll) setIsLoading(false);
      }
    } catch (error) {
      Toastbox('error', 'An error occurred while loading event details.');
      if (isScroll) setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const handleAddComment = async (comment) => {
    try {
      const res = await postAddComment(token, eventId, { comment });
      if (res.status === 200) {
        Toastbox('success', res.data.message);
        setComments([...comments, { comment, userName: 'You', date: new Date().toISOString() }]);
      }
    } catch (error) {
      Toastbox('error', 'An unexpected error occurred.');
    }
  };



  const handleJoinEvent = async () => {
    try {
      const res = await postJoinEvent(token, eventId);
      if (res.status === 200) {
        setIsJoined(true);
        Toastbox('success', 'You have joined the event!');
        
        setEvent((prevEvent) => ({
          ...prevEvent,
          attendeeCount: prevEvent.attendeeCount + 1
        }));
      }
    } catch (error) {
      const message = error.response?.data?.error || 'An unexpected error occurred!';
      Toastbox('error', message);
    }
  };


  const loadMoreComments = async (newPage) => {
    try {
      const res = await getEventById(token, eventId, newPage);
      if (res.status === 200) {
        if (res.data.comments.length === 0) {
          setHasMore(false);
        } else {
          setComments(prevComments => [...prevComments, ...res.data.comments]);
          setPage(newPage);
        }
      }
    } catch (error) {
      Toastbox("error", "An error occurred while loading comments.");
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
          src={event.photo ? `data:image/jpeg;base64,${event.photo}` : '/evenActivityPhoto.webp'}
          alt="Event"
          style={{ width: '100%', borderRadius: 8, objectFit: 'cover' }}
        />
          </Box>

          <Paper sx={{ width: '100%', maxWidth: 600, padding: 3 }}>
            <Typography variant="h5" gutterBottom>{event.title}</Typography>
            <Typography variant="body1" paragraph>{event.description}</Typography>
            <Typography variant="h6" paragraph>Participants: {event.attendeeCount}</Typography>
            <Button
              variant="contained"
              color={isJoined ? 'secondary' : 'primary'}
              onClick={handleJoinEvent}
              fullWidth
            >
              {isJoined ? 'You have joined' : 'Join'}
            </Button>
          </Paper>

          <CommentSection comments={comments} onAddComment={handleAddComment}  loadMoreComments={loadMoreComments}  hasMore={hasMore}  />
        </Box>
      )}
    </div>
  );
};

export default EventDetail;
