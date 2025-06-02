import { Box } from '@mui/material';
import React, { Suspense } from 'react';

const OccultCrescentGuideMain = React.lazy(() => import('./OccultCrescentGuideMain'));

export default function OccultCrescentGuideContainer({ guidePage }) {
  return (
    <Box
      component="main"
      margin="auto"
      sx={{ flexGrow: 1, pt: { xs: 10, md: 0 } }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <OccultCrescentGuideMain guidePage={guidePage} />
      </Suspense>
    </Box>
  );
}
