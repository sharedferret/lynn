import React from 'react';
import { Box, Stack } from '@mui/material';

import DRSHolsterBagComponent from './DRSHolsterBagComponent';

export default function DRSHolsterContainerComponent({ holsterPrepop, holsterMain, handleHolsterUpdate }) {
  return (
    <Box>
      <Stack
        direction='row'
        spacing={2}
      >
        <DRSHolsterBagComponent
          holsterData={ holsterPrepop }
          bagType={ 'prepop' }
          handleHolsterUpdate={ handleHolsterUpdate }
        />
        <DRSHolsterBagComponent
          holsterData={ holsterMain }
          bagType={ 'main' }
          handleHolsterUpdate={ handleHolsterUpdate }
        />
      </Stack>
    </Box>
  );
}
