import React, { Component } from 'react';
import { Box } from '@mui/material';

class BAPortalMapComponent extends Component {

  render() {
    return (
      <Box flexGrow={1} height={'100%'} sx={{backgroundColor: '#000', pt: { xs: 14, md: 5}}}  >
        <Box maxWidth={1400} minWidth={800} height={'100%'} margin='auto' sx={{backgroundColor: '#000'}}>
          <img src={`${process.env.PUBLIC_URL}/assets/portalmap.jpg`} />
        </Box>
        
      </Box>
    );
  }
}

export default BAPortalMapComponent