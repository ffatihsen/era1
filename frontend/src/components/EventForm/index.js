import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { postCreateEvent } from '../../Services';
import Toastbox from '../Toastbox';

const EventForm = ({ formData, setFormData , refresh , setRefresh }) => {
    const token = localStorage.getItem('token');
    const [photo, setPhoto] = useState(null);

    const validateForm = () => {
        const { title, description, location, organizer, date } = formData;
        return (
            title.length > 3 &&
            description.length > 3 &&
            location.length > 3 &&
            organizer.length > 3 &&
            date.length > 3
        );
    };

    const handleCreateEvent = async () => {
        if (!validateForm()) {
            return Toastbox("warning", "Please fill in all fields!");
        }
   
        if (photo && !validatePhoto(photo)) {
            return Toastbox("warning", "Please upload a valid image (.png or .jpg) under 2MB.");
        }
   
        try {
            const formDataWithPhoto = new FormData();
            formDataWithPhoto.append('title', formData.title);
            formDataWithPhoto.append('description', formData.description);
            formDataWithPhoto.append('date', formData.date);
            formDataWithPhoto.append('location', formData.location);
            formDataWithPhoto.append('organizer', formData.organizer);
            if (photo) {
                formDataWithPhoto.append('photo', photo);
            }
   
            const res = await postCreateEvent(token, formDataWithPhoto);
   
            if (res.status === 201) {
                Toastbox("success", "Event created successfully!");
                setRefresh(Math.floor(Math.random() * 1000000))
                resetForm();
            }
        } catch (error) {
            handleError(error);
        }
    };

    const validatePhoto = (photo) => {
        const validTypes = ['image/png', 'image/jpeg'];
        const maxSize = 2 * 1024 * 1024; // 2MB in bytes

        return validTypes.includes(photo.type) && photo.size <= maxSize;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            location: '',
            organizer: '',
            date: '',
        });
        setPhoto(null); // Clear the photo state
    };

    const handleError = (error) => {
        if (error.response?.data?.details) {
            error.response.data.details.forEach(item => {
                Toastbox("error", item.message);
            });
        } else {
            Toastbox("error", "An unexpected error occurred!");
        }
    };

    return (
        <div>
            <Typography variant="h6" sx={{ marginTop: 3, backgroundColor: 'rgba(151,202,209,.08)' }}>
                Create New Event
            </Typography>
            <Box sx={{ marginTop: 2, backgroundColor: 'rgba(151,202,209,.08)' }}>
                <TextField
                    fullWidth
                    label="Title"
                    variant="outlined"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    fullWidth
                    label="Explanation"
                    variant="outlined"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    fullWidth
                    label="Location"
                    variant="outlined"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    fullWidth
                    label="Organizer"
                    variant="outlined"
                    name="organizer"
                    value={formData.organizer}
                    onChange={handleInputChange}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    fullWidth
                    label="Date"
                    variant="outlined"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    sx={{ marginBottom: 2 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                
                {/* Photo input */}
                <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={handlePhotoChange}
                    style={{ marginBottom: '16px' }}
                />

                <Button
                    variant="contained"
                    sx={{
                        marginTop: 2,
                        width: '100%',
                        backgroundColor: 'primary.main',
                        '&:hover': {
                            backgroundColor: 'primary.dark',
                        },
                    }}
                    onClick={handleCreateEvent}
                >
                    Create Event
                </Button>
            </Box>
        </div>
    );
};

export default EventForm;
