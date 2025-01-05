import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#f4f4f4', padding: 4, textAlign: 'center' }}>
      <Typography variant="body2" color="textSecondary">
        © 2025 Era1 All Rights Reserved.
      </Typography>
      <Typography variant="body2" color="textSecondary">
        <Link href="#">Privacy Policy</Link> | <Link href="#">Terms of Service</Link>
      </Typography>
    </Box>
  );
};

export default Footer;
