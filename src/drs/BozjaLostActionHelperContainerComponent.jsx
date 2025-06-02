import { Box } from '@mui/material';
import React, { Suspense } from 'react';

const BozjaLostActionHelperComponent = React.lazy(() => import('./BozjaLostActionHelperComponent'));

export default function BozjaLostActionHelperContainerComponent({ lostAction }) {
  return (
    <Box
      component="main"
      margin="auto"
      sx={{ flexGrow: 1, pt: { xs: 10, md: 0 } }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <BozjaLostActionHelperComponent lostAction={lostAction} />
      </Suspense>
    </Box>
  );
}
