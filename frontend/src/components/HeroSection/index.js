import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {


  const navigate = useNavigate();

  return (
    <Box 
      sx={{ 
        backgroundColor: '#f4f4f4', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}
    >
      <Grid container spacing={4} sx={{ maxWidth: '1200px', margin: '0 auto' }}>
    
        <Grid item xs={12} md={6} sx={{ textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
            Connect with people who share your interests
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ color: '#555' }}>
            Whether it's tech, sports, or music, join groups that fit your passions.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ marginTop: 3, padding: '10px 20px', fontSize: '16px' }}
            onClick={() => {navigate('/signup');}}
          >
            Join Now
          </Button>
        </Grid>

        
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box
            component="img"
            src={`${process.env.PUBLIC_URL}/era1Home1.svg`}
            alt="Era1 Home"
            sx={{ maxWidth: '100%', height: 'auto' }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroSection;
