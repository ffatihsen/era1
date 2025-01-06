import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router';

const events = [
  { title: 'Tech Meetup', description: 'Join the latest discussions about tech.' },
  { title: 'Music Lovers', description: 'A group for people who love music.' },
  { title: 'Outdoor Adventures', description: 'For those who enjoy outdoor activities.' }
];





const EventSection = () => {
  const navigate = useNavigate();
  
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Upcoming Events
      </Typography>
      <Grid container spacing={4}>
        {events.map((event, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {event.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {event.description}
                </Typography>
                <Button variant="outlined" sx={{ marginTop: 2 }} onClick={() => {navigate("/feed")}} >
                  Join Event
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EventSection;
