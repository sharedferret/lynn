import React, { Suspense } from 'react';
import { Box } from '@mui/material';

const ForecastResultsComponent = React.lazy(() => import('./ForecastResultsComponent'));

export default function ForecastMainComponent({ passedFilter }) {
  return (
    <Box
      component="main"
      margin="auto"
      sx={{ flexGrow: 1, pt: { xs: 14, md: 5 } }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <ForecastResultsComponent
          filter={passedFilter}
        />
      </Suspense>
    </Box>
  );
}
