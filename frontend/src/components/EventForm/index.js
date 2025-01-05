import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { postCreateEvent } from '../../Services';
import Toastbox from '../Toastbox';

const EventForm = ({ formData, setFormData }) => {
    const token = localStorage.getItem('token');

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

        try {
            const res = await postCreateEvent(token, formData);

            if (res.status === 201) {
                Toastbox("success", "Event created successfully!");

               
                resetForm();
            }
        } catch (error) {
            handleError(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            location: '',
            organizer: '',
            date: '',
        });
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
                Yeni Etkinlik Oluştur
            </Typography>
            <Box sx={{ marginTop: 2, backgroundColor: 'rgba(151,202,209,.08)' }}>
                <TextField
                    fullWidth
                    label="Başlık"
                    variant="outlined"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    fullWidth
                    label="Açıklama"
                    variant="outlined"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    fullWidth
                    label="Konum"
                    variant="outlined"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    fullWidth
                    label="Organizatör"
                    variant="outlined"
                    name="organizer"
                    value={formData.organizer}
                    onChange={handleInputChange}
                    sx={{ marginBottom: 2 }}
                />
                {/* Date input */}
                <TextField
                    fullWidth
                    label="Tarih"
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
                    Etkinliği Oluştur
                </Button>
            </Box>
        </div>
    );
};

export default EventForm;
