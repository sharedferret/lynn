import { Stack, Typography } from '@mui/material';
import React from 'react';

export default function MapInfoDefaultComponent({
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
    </Stack>
  );
}
