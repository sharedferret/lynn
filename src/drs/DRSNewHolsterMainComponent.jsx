import { Box, Stack, Typography } from '@mui/material';
import React, { Suspense } from 'react';

const DRSNewHolsterSelectorComponent = React.lazy(() => import('./DRSNewHolsterSelectorComponent'));
// import DRSNewHolsterSelectorComponent from './DRSNewHolsterSelectorComponent';

export default function DRSNewHolsterMainComponent({ holster, encodedHolster }) {
  /**
   * TODO: Pass down initial props if they exist on this element.
   */
  return (
    <Box
      component="main"
      margin="auto"
      sx={{ flexGrow: 1, pt: { xs: 14, md: 5 } }}
    >
      <Stack>
        <Typography variant="h4" fontWeight={700}>DRS Holster Helper</Typography>
        <Suspense fallback={<div>Loading...</div>}>
          <DRSNewHolsterSelectorComponent holster={holster} encodedHolster={encodedHolster} />
        </Suspense>
      </Stack>
    </Box>
  );
}
