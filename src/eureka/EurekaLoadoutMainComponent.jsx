import React from 'react';
import { Box } from '@mui/material';
import BALogosHolsterComponent from '../ba/BALogosHolsterComponent';

export default function EurekaLoadoutMainComponent({ encodedHolster }) {
  return (
    <Box>
      <BALogosHolsterComponent
        encodedHolster={encodedHolster}
      />
    </Box>
  );
}
