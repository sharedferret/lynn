import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

export default function BozjaCETooltipComponent({ markerData }) {
  const renderSpawnedBy = () => {
    if (markerData.metadata.spawnedBy) {
      return (
        <Stack direction="row" alignItems="center">
          <Box>
            <img
              src={`${process.env.PUBLIC_URL}/assets/maps/markers/${markerData.metadata.spawnedBy.type}.png`}
              alt={markerData.metadata.spawnedBy.type}
              width="32px"
              height="32px"
            />
          </Box>
          <Typography variant="button">{markerData.metadata.spawnedBy.name}</Typography>
        </Stack>
      );
    }
    return null;
  };

  const renderRewards = () => {
    if (markerData.metadata.rewards) {
      return markerData.metadata.rewards.map((reward) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box>
            <img
              src={`${process.env.PUBLIC_URL}/assets/maps/markers/${reward.type}.png`}
              alt={reward.type}
              width="32px"
              height="32px"
            />
          </Box>
          <Typography variant="button">{reward.name}</Typography>
        </Stack>
      ));
    }
    return null;
  };

  return (
    <Stack>
      <Typography variant="h6">Critical Engagement</Typography>
      <Typography variant="h6">Boss</Typography>
      <Typography variant="button">{markerData.metadata.boss}</Typography>
      {markerData.metadata.spawnedBy ? <Typography variant="h6">Spawned by</Typography> : null}
      {renderSpawnedBy()}
      {markerData.metadata.rewards ? <Typography variant="h6">Rewards</Typography> : null}
      {renderRewards()}
    </Stack>
  );
}
