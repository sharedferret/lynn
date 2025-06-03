import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
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
