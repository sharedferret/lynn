import React from 'react';
import { Box } from '@mui/material';

import ForecastResultsComponent from './ForecastResultsComponent';

export default function ForecastMainContentComponent({ filter, forecastFilter }) {
  return (
    <Box
      component="main"
      margin="auto"
      sx={{ flexGrow: 1, pt: { xs: 14, md: 5} }}>
      <ForecastResultsComponent
        filter={forecastFilter}
      />
    </Box>
  );
}
