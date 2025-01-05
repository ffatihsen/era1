import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';

const FriendshipsOnMeetup = () => {
  return (
    <Box sx={{ padding: 6, backgroundColor: '#f9f9f9' }}>
      <Grid 
        container 
        spacing={4} 
        sx={{ maxWidth: '1200px', margin: '0 auto', alignItems: 'center' }}
      >
        {/* Left Column */}
        <Grid 
          item 
          xs={12} 
          md={6} 
          sx={{ 
            textAlign: 'left', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center' 
          }}
        >
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ fontWeight: 'bold', color: '#333' }}
          >
           Friendships are made in Era1
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ color: '#555', lineHeight: 1.8, marginBottom: 3 }}
          >
           Since 2025, members have been using Era1 to make new friends, meet like-minded people, spend time on hobbies, and connect with people nearby who share the same interests.
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ color: '#555', lineHeight: 1.8, marginBottom: 4 }}
          >
            Find out how this is possible.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ padding: '10px 20px', fontSize: '16px', textTransform: 'none' }}
          >
            Learn More
          </Button>
        </Grid>

        {/* Right Column */}
        <Grid 
          item 
          xs={12} 
          md={6} 
          sx={{ textAlign: 'center' }}
        >
          <Box 
            sx={{ 
              backgroundColor: 'rgba(71, 149, 168, 0.1)', 
              padding: 4, 
              borderRadius: '50%', 
              display: 'inline-flex' 
            }}
          >
            <PeopleIcon sx={{ fontSize: 100, color: '#4795A8' }} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FriendshipsOnMeetup;
