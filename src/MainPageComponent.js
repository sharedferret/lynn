import React, { Component } from 'react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';

class MainPageComponent extends Component {

  render() {
    return (
      <Box flexGrow={1} height={'100%'} sx={{backgroundColor: '#ffb0a9'}} >
        <Box maxWidth={600} margin='auto'>
          <img src={`${process.env.PUBLIC_URL}/assets/lynn.jpg`} />
        </Box>
        
      </Box>
    );
  }
}

export default MainPageComponent