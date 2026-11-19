import React, { Suspense } from 'react';
import Box from '@mui/material/Box';

const ForecastResultsComponent = React.lazy(() => import('./ForecastResultsComponent'));

export default function ForecastMainComponent({ passedFilter }) {
  return (
    <Box
      component="main"
      sx={{
        margin: 'auto',
        flexGrow: 1,
        pt: { xs: 14, md: 5 },
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <ForecastResultsComponent
          filter={passedFilter}
        />
      </Suspense>
    </Box>
  );
}
