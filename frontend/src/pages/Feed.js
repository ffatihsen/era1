import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Button, Paper, TextField } from '@mui/material';

import PrimarySearchAppBar from '../components/Navbar';
import BasicDateCalendar from '../components/BasicCalendar';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';
import { useLocation, useNavigate } from 'react-router';
import { postCheckAuth } from '../Services';
import Toastbox from '../components/Toastbox';

const Feed = () => {
  let token = localStorage.getItem('token');

  const navigate = useNavigate();


  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchkey = searchParams.get('searchkey');




  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        navigate('/');
      } else {
        try {
          let res = await postCheckAuth(token);

          if (res.status === 200) {
          } else {
            Toastbox("warning", "Your login period has expired. Please log in again.!");
            localStorage.removeItem('token');
            navigate('/');
          }
        } catch (error) {
            Toastbox("warning", "Your login period has expired. Please log in again.!");
            localStorage.removeItem('token');
            navigate('/');
        }
      }
    };

    checkAuth();
  }, [token, navigate]);


  const [refresh, setRefresh] = useState(false)
  const [date, setDate] = useState(false)
 
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    organizer: '',
  });




  return (
    <>
      <PrimarySearchAppBar />

      <Box sx={{ flexGrow: 1, padding: 4 }}>

        <Typography variant="h4" gutterBottom>
          Hi There 👋
        </Typography>
        <Typography variant="h6" paragraph>
          Welcome to your feed. Here you can manage your events and schedule.
        </Typography>


        <Grid container spacing={3}>
          {/* Takvim bölümü */}
          <Grid item xs={12} md={3}>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <BasicDateCalendar date={date} setDate={setDate} />
            </Paper>


            <EventForm formData={formData} setFormData = {setFormData} refresh={refresh} setRefresh ={setRefresh} />
            
          </Grid>


          <Grid item xs={12} md={8}>

            <EventList refresh={refresh} setRefresh ={setRefresh} date={date} setDate={setDate} searchkey={searchkey} />

          </Grid>




        </Grid>
      </Box>
    </>
  );
};

export default Feed;
