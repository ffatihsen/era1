import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, Button, Paper, Stack } from '@mui/material';
import { getJoinedEvents, postRemoveJoined } from '../../Services';
import Toastbox from '../Toastbox';
import { useNavigate } from 'react-router';

const JoinedEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchJoinedEvents = useCallback(async () => {
    try {
      const res = await getJoinedEvents(token);
      if (res.status === 200) {
        setEvents(res.data);
      }
    } catch (error) {
        setEvents(false)
      const message = error.response?.data?.error || 'An unexpected error occurred!';
      Toastbox('error', message);
    }
  }, [token]);

  const handleRemoveJoined = async (eventId) => {
    try {
      const res = await postRemoveJoined(token, eventId);
      if (res.status === 200) {
        Toastbox('success', res.data.message);
        fetchJoinedEvents();
      }
    } catch (error) {
      const message = error.response?.data?.error || 'An unexpected error occurred!';
      Toastbox('error', message);
    }
  };

  useEffect(() => {
    fetchJoinedEvents();
  }, [fetchJoinedEvents]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '60vh',
      }}
    >
      <Stack spacing={3} sx={{ width: '100%', maxWidth: 500 }}>
        {events.length > 0 ? (
          events.map((event) => (
            <Paper
              key={event._id}
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 2,
                textAlign: 'center',
                backgroundColor: '#f5f5f5',
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                onClick={() => navigate(`/feed/${event._id}`)}
                sx={{
                  cursor: 'pointer',
                  color: 'primary.main',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {event.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Date: {event.date}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Organizer: {event.organizer}
              </Typography>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleRemoveJoined(event._id)}
              >
                Cancel Participation
              </Button>
            </Paper>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary" textAlign="center">
            There are no events you have attended.
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default JoinedEvents;
