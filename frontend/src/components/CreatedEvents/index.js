import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, Stack, Modal, TextField } from '@mui/material';
import { getCreatedEvents, deleteEvent, updateEvent } from '../../Services';
import Toastbox from '../Toastbox';
import { useNavigate } from 'react-router';

const CreatedEvents = () => {
  const [createdEvents, setCreatedEvents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchCreatedEvents = async () => {
    try {
      const response = await getCreatedEvents(token);
      if (response.status === 200) {
        setCreatedEvents(response.data);
      } else {
        Toastbox('error', 'Events could not be loaded!');
      }
    } catch (error) {
      setCreatedEvents([]);
      const message = error.response?.data?.error || 'An unexpected error occurred!';
      Toastbox('error', message);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await deleteEvent(token, eventId);
      if (response.status === 200) {
        Toastbox('success', response.data.message);
        setCreatedEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
      } else {
        Toastbox('error', 'The event could not be deleted!');
      }
    } catch (error) {
      const message = error.response?.data?.error || 'An error occurred while deleting the event!';
      Toastbox('error', message);
    }
  };


  const handleEditClick = (event) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };


  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedEvent(null);
  };


  const handleSaveEvent = async (updatedEvent) => {
    try {
      const response = await updateEvent(token, updatedEvent._id,updatedEvent);
      if (response.status === 200) {
        Toastbox('success', 'Event updated successfully!');
        setCreatedEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === updatedEvent._id ? { ...event, ...updatedEvent } : event
          )
        );
        handleCloseModal();
      } else {
        Toastbox('error', 'The event could not be updated!');
      }
    } catch (error) {
      const message = error.response?.data?.error || 'An error occurred while updating the event!';
      Toastbox('error', message);
    }
  };

  useEffect(() => {
    fetchCreatedEvents();
  }, []);

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
      {createdEvents.length > 0 ? (
        <Stack spacing={3} sx={{ width: '100%', maxWidth: 500 }}>
          {createdEvents.map((event) => (
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
                Date: {new Date(event.date).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Organizer: {event.organizer}
              </Typography>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditClick(event)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteEvent(event._id)}
                >
                  Delete
                </Button>
              </Stack>
            </Paper>
          ))}
        </Stack>
      ) : (
        <Typography variant="body1" color="textSecondary">
          You haven't created any events yet.
        </Typography>
      )}

      {selectedEvent && (
        <EditEventModal
          open={openModal}
          handleClose={handleCloseModal}
          selectedEvent={selectedEvent}
          handleSave={handleSaveEvent}
        />
      )}
    </Box>
  );
};


const EditEventModal = ({ open, handleClose, selectedEvent, handleSave }) => {
  const [formData, setFormData] = useState({
    title: selectedEvent?.title || '',
    description: selectedEvent?.description || '',
    date: selectedEvent?.date ? formatDate(selectedEvent.date) : '',
    location: selectedEvent?.location || '',
    organizer: selectedEvent?.organizer || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = () => {
    handleSave({ ...formData, _id: selectedEvent._id });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 600,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
          Edit Event
        </Typography>
        <Stack spacing={3}>
          <TextField
            name="title"
            label="Title"
            variant="outlined"
            value={formData.title}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="description"
            label="Description"
            variant="outlined"
            value={formData.description}
            onChange={handleInputChange}
            multiline
            rows={3}
            fullWidth
          />
          <TextField
            name="date"
            label="Date"
            type="date"
            variant="outlined"
            value={formData.date}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            name="location"
            label="Location"
            variant="outlined"
            value={formData.location}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="organizer"
            label="Organizer"
            variant="outlined"
            value={formData.organizer}
            onChange={handleInputChange}
            fullWidth
          />
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleFormSubmit}>
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};


const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toISOString().split('T')[0];
};

export default CreatedEvents;
