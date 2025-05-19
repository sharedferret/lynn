import { Stack, Typography } from '@mui/material';
import React from 'react';

export default function AetheryteTooltipComponent({ markerData }) {
  if (markerData.metadata?.unlock) {
    return (
      <Stack>
        <Typography variant="h6">Unlocks at</Typography>
        <Typography variant="button">{`Level ${markerData.metadata.unlock}`}</Typography>
      </Stack>
    );
  }

  return null;
}
