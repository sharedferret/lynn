import Box from '@mui/material/Box';
import React, { Suspense } from 'react';

const FavorableWeatherFinderComponent = React.lazy(() => import('./FavorableWeatherFinder'));

export default function FavorableWeatherFinderContainerComponent() {
  return (
    <Box
      component="main"
      sx={{
        margin: 'auto',
        flexGrow: 1,
        pt: { xs: 10, md: 0 },
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <FavorableWeatherFinderComponent />
      </Suspense>
    </Box>
  );
}
