import { Box } from '@mui/material';
import React, { Suspense } from 'react';

const OccultPhantomJobHelperComponent = React.lazy(() => import('./OccultPhantomJobHelperComponent'));

export default function OccultPhantomJobHelperContainerComponent({ phantomJob }) {
  return (
    <Box
      component="main"
      margin="auto"
      sx={{ flexGrow: 1, pt: { xs: 10, md: 0 } }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <OccultPhantomJobHelperComponent phantomJob={phantomJob} />
      </Suspense>
    </Box>
  );
}
