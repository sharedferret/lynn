import Box from '@mui/material/Box';
import React, { Suspense } from 'react';

const OccultPhantomJobHelperComponent = React.lazy(() => import('./OccultPhantomJobHelperComponent'));

export default function OccultPhantomJobHelperContainerComponent({ phantomJob }) {
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
        <OccultPhantomJobHelperComponent phantomJob={phantomJob} />
      </Suspense>
    </Box>
  );
}
