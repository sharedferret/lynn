import React, { Component } from 'react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';

import ForecastResultsComponent from './ForecastResultsComponent';

class ForecastMainContentComponent extends Component {

  render() {
    /**
     * <ForecastResultsComponent
          filter={this.props.filter}
        />
     */
    return (
      <Box
        component="main"
        margin="auto"
        sx={{ flexGrow: 1, pt: { xs: 14, md: 5} }}>
        <ForecastResultsComponent
          filter={this.props.forecastFilter}
        />
      </Box>
    );
  }
}

export default ForecastMainContentComponent