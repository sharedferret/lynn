/**
 * This exists solely so I can lazy load Holsters.json
 */

import { Box } from '@mui/material';
import React, { Suspense } from 'react';

const DRSRunHolsterCreatorComponent = React.lazy(() => import('./DRSRunHolsterCreatorComponent'));

export default function DRSRunHolsterCreatorContainerComponent() {
  return (
    <Box
      component="main"
      margin="auto"
      sx={{ flexGrow: 1, pt: { xs: 14, md: 5 } }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <DRSRunHolsterCreatorComponent />
      </Suspense>
    </Box>
  );
}
