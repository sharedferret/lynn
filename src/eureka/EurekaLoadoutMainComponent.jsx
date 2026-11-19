import Box from '@mui/material/Box';
import React, { Suspense } from 'react';

const BALogosHolsterComponent = React.lazy(() => import('../ba/BALogosHolsterComponent'));

export default function EurekaLoadoutMainComponent({ encodedHolster }) {
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
        <BALogosHolsterComponent encodedHolster={encodedHolster} />
      </Suspense>
    </Box>
  );
}
