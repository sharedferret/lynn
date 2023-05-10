import React from 'react';
import { Box } from '@mui/material';

export default function MainPageComponent() {
  return (
    <Box flexGrow={1} height="100%" sx={{ backgroundColor: '#ffb0a9', pt: { xs: 14, md: 5 } }}>
      <Box maxWidth={600} margin="auto">
        <img src={`${process.env.PUBLIC_URL}/assets/lynn.jpg`} alt="lynn.pet!" />
      </Box>

    </Box>
  );
}
