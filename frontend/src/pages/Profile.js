import React from 'react';
import PrimarySearchAppBar from '../components/Navbar';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import TabPanel from '../components/TabPanel';
import JoinedEvents from '../components/JoinedEvents';
import CreatedEvents from '../components/CreatedEvents';

const Profile = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <PrimarySearchAppBar />
      <Box sx={{ width: '80%', margin: 'auto', mt: 4 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Joined" />
          <Tab label="Created" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <JoinedEvents />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CreatedEvents />
        </TabPanel>
      </Box>
    </div>
  );
};

export default Profile;
