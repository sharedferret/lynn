import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

export default function EurekaNMTooltipComponent({ markerData }) {
  const renderSpawnedBy = () => {
    if (markerData.metadata.spawnedBy) {
      return (
        <Stack direction="row" alignItems="center">
          <Box>
            <img
              src={`${process.env.PUBLIC_URL}/assets/eureka/eureka_${markerData.metadata.spawnedBy.element.toLowerCase()}.png`}
              alt={markerData.name}
              width="32px"
              height="32px"
            />
          </Box>
          <Typography variant="button">{`Lv${markerData.metadata.spawnedBy.level} ${markerData.metadata.spawnedBy.name}`}</Typography>
        </Stack>
      );
    }
    return null;
  };

  return (
    <Stack>
      <Typography variant="h6">Notorious Monster</Typography>
      <Stack direction="row" alignItems="center">
        <Box>
          <img
            src={`${process.env.PUBLIC_URL}/assets/eureka/eureka_${markerData.metadata.element.toLowerCase()}.png`}
            alt={markerData.name}
            width="32px"
            height="32px"
          />
        </Box>
        <Typography variant="button">{markerData.name}</Typography>
      </Stack>
      {markerData.metadata.spawnedBy ? <Typography variant="h6">Spawned by</Typography> : null}
      {renderSpawnedBy()}
    </Stack>
  );
}
