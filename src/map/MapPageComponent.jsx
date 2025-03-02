import { Box } from '@mui/material';
import React, { Suspense } from 'react';

const MapContainerComponent = React.lazy(() => import('./MapContainerComponent'));

export default function MapPageComponent() {
  return (
    <Box
      component="main"
      margin="auto"
      sx={{ flexGrow: 1, pt: { xs: 10, md: 0 } }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <MapContainerComponent />
      </Suspense>
    </Box>
  );
}
