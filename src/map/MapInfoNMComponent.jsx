import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

export default function MapInfoNMComponent({
  entity,
}) {
  return (
    <Stack>
      <Typography textAlign="left">
        {entity.mob}
      </Typography>
      <Typography textAlign="left">
        Level:
        {' '}
        {entity.level}
      </Typography>
      <Typography textAlign="left">
        Coordinates:
        {' '}
        {entity.coordinates.x}
        {', '}
        {entity.coordinates.y}
      </Typography>
      <Box height={12} />
      <Typography textAlign="left">
        Spawned by:
      </Typography>
      <Stack direction="row">
        <Typography textAlign="left">
          Lv
          {entity.spawnedBy.level}
          {' '}
          {entity.spawnedBy.name}
        </Typography>
      </Stack>
      <Box height={12} />
      <Typography textAlign="left">
        Experience:
        {' '}
        {entity.experience}
      </Typography>
      <Typography textAlign="left">
        Tomestones:
        {' '}
        {entity.tomestones}
      </Typography>
      <Box height={12} />
      <Typography textAlign="left" fontWeight={700}>
        Rewards
      </Typography>
      {entity.rewards.map((i) => (
        <Typography textAlign="left">
          {i.name}
          {' '}
          x
          {i.quantity}
        </Typography>
      ))}
    </Stack>
  );
}
