import Box from '@mui/material/Box';
import React, { Suspense } from 'react';

const EurekaLogosActionHelperComponent = React.lazy(() => import('./EurekaLogosActionHelperComponent'));

export default function EurekaLogosActionHelperContainerComponent({ logosAction }) {
  return (
    <Box
      component="main"
      margin="auto"
      sx={{ flexGrow: 1, pt: { xs: 10, md: 0 } }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <EurekaLogosActionHelperComponent logosAction={logosAction} />
      </Suspense>
    </Box>
  );
}
