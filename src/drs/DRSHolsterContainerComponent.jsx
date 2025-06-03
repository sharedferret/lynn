import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import DRSHolsterBagComponent from './DRSHolsterBagComponent';

export default function DRSHolsterContainerComponent(
  { holsterPrepop, holsterMain, handleHolsterUpdate },
) {
  return (
    <Box>
      <Stack
        direction={{ xl: 'row' }}
        spacing={2}
      >
        <DRSHolsterBagComponent
          holsterData={holsterPrepop}
          bagType="prepop"
          handleHolsterUpdate={handleHolsterUpdate}
        />
        <DRSHolsterBagComponent
          holsterData={holsterMain}
          bagType="main"
          handleHolsterUpdate={handleHolsterUpdate}
        />
      </Stack>
    </Box>
  );
}
