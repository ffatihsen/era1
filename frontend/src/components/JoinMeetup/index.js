import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const JoinMeetup = () => {

  const navigate = useNavigate();

  return (
    <Box 
      sx={{ 
        backgroundColor: '#f4f4f4', 
        padding: 6, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}
    >
      <Grid container spacing={4} sx={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <Grid item xs={12} md={6} sx={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          Join Meetup
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: '#555', lineHeight: 1.8 }}>
          Our members use Meetup to meet new people, learn new things, find support, step out of their comfort zones, and pursue their passions together. <strong>Membership is free.</strong>
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ marginTop: 3, padding: '10px 20px', fontSize: '16px' }}
            onClick={() => {navigate('/signup');}}
          >
            Sign Up
          </Button>
        </Grid>

        
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box
            component="img"
            src={`${process.env.PUBLIC_URL}/era1Home2.webp`}
            alt="Join Meetup"
            sx={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default JoinMeetup;
