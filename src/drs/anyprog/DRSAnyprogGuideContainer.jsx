import Box from '@mui/material/Box';
import React, { Suspense } from 'react';

const DRSAnyprogGuideMain = React.lazy(() => import('./DRSAnyprogGuideMain'));

export default function DRSAnyprogGuideContainer({ guidePage }) {
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
        <DRSAnyprogGuideMain guidePage={guidePage} />
      </Suspense>
    </Box>
  );
}
