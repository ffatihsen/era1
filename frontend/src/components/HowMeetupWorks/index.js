import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const HowMeetupWorks = () => {
  return (
    <Box sx={{ padding: 6, backgroundColor: '#f9f9f9' }}>
      <Grid 
        container 
        spacing={4} 
        sx={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}
      >
        {/* Left Column */}
        <Grid 
          item 
          xs={12} 
          md={6} 
          sx={{ 
            backgroundColor: 'rgba(151,202,209,.08)', 
            padding: 4, 
            borderRadius: '8px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center' 
          }}
        >
          <SearchIcon sx={{ fontSize: 60, color: '#4795A8', marginBottom: 2 }} />
          <Typography 
            variant="h6" 
            gutterBottom 
            sx={{ fontWeight: 'bold', color: '#333' }}
          >
            Explore events and groups
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ color: '#555', lineHeight: 1.6 }}
          >
            See who's hosting local events for the things you love.
          </Typography>
        </Grid>

        {/* Right Column */}
        <Grid 
          item 
          xs={12} 
          md={6} 
          sx={{ 
            backgroundColor: 'rgba(151,202,209,.08)', 
            padding: 4, 
            borderRadius: '8px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center' 
          }}
        >
          <AddCircleOutlineIcon 
            sx={{ fontSize: 60, color: '#4795A8', marginBottom: 2 }} 
          />
          <Typography 
            variant="h6" 
            gutterBottom 
            sx={{ fontWeight: 'bold', color: '#333' }}
          >
            Create a group to host events
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ color: '#555', lineHeight: 1.6 }}
          >
            Create your own group and take your place on our platform of millions of users.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HowMeetupWorks;
