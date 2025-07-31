import Box from '@mui/material/Box';
import React, { Suspense } from 'react';

const DRSGuideMain = React.lazy(() => import('./DRSGuideMain'));

export default function DRSGuideContainer({ guidePage }) {
  return (
    <Box
      component="main"
      margin="auto"
      sx={{ flexGrow: 1, pt: { xs: 10, md: 0 } }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <DRSGuideMain guidePage={guidePage} />
      </Suspense>
    </Box>
  );
}
