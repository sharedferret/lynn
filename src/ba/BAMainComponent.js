import React, { Component } from 'react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';

import BAMainContentComponent from './BAMainContentComponent'

class BAMainComponent extends Component {

  render() {
    return (
      <Box
        component="main"
        margin="auto"
        sx={{ flexGrow: 1, pt: { xs: 14, md: 5} }}>
        <BAMainContentComponent />
      </Box>
      
    );
  }
}

export default BAMainComponent