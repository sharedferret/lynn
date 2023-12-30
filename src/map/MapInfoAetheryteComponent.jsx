import { Stack, Typography } from '@mui/material';
import React from 'react';

export default function MapInfoAetheryteComponent({
  entity,
}) {
  return (
    <Stack>
      <Typography textAlign="left">
        Coordinates:
        {' '}
        {entity.coordinates.x}
        {', '}
        {entity.coordinates.y}
      </Typography>
      <Typography textAlign="left">
        Unlocks at Level
        {' '}
        {entity.unlockLevel}
      </Typography>
    </Stack>
  );
}
