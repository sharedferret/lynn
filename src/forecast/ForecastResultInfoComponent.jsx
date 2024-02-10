import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import FarmType from './lib/FarmType';

import ForecastResultInfoWeatherComponent from './ForecastResultInfoWeatherComponent';

export default function ForecastResultInfoComponent({ result, isCollection }) {
  let text = '';

  if (result.spawn.type === FarmType.EUREKA_NM) {
    text = `${result.spawn.name} Spawn`;
  } else if (result.spawn.type === FarmType.EUREKA_FARM) {
    text = `${(result.duration > 1 ? `${result.duration}x ` : '') + result.spawn.name} Farm`;
  } else if (result.spawn.type === FarmType.FRAGMENT_FARM) {
    text = `${(result.duration > 1 ? `${result.duration}x ` : '') + result.spawn.name} Fragment Farm`;
  }

  let conflictText = null;
  if (result.spawn.type === FarmType.EUREKA_NM && result.conflict) {
    const THREE_HOURS_IN_MS = 3 * 1000 * 60 * 60;
    const spawnTimeBeforeNow = result.time.getTime() - result.conflict.time.getTime();
    const earliestEntryTime = Math.floor((THREE_HOURS_IN_MS - spawnTimeBeforeNow) / 1000 / 60);
    const spawnTimeBeforeNowMinutes = Math.floor(spawnTimeBeforeNow / 1000 / 60);
    conflictText = `Last spawn ${spawnTimeBeforeNowMinutes}m earlier, may not spawn if the earliest Time Remaining is less than ${earliestEntryTime}m`;
  }

  return (
    <Box sx={{
      width: '65%', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}
    >
      <Stack pb={1} pt={1}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
          {isCollection
            ? (
              <Box className="IconImageBox">
                <img
                  className="IconImage"
                  src={`${process.env.PUBLIC_URL}/assets/nms/${result.spawn.image}`}
                  alt={result.spawn.name}
                />
              </Box>
            ) : null}
          <Typography variant="h6">{text}</Typography>
        </Stack>
        <Box>
          {Array.isArray(result.condition)
            ? (
              <ForecastResultInfoWeatherComponent
                conditions={result.condition}
                startTime={result.time}
              />
            )
            : null}
        </Box>
        <Box>
          {conflictText !== null
            ? (
              <Stack direction="row" spacing={1} alignItems="end" justifyContent="center">
                <WarningAmberIcon />
                <Typography variant="caption">{conflictText}</Typography>
              </Stack>
            )
            : null}
        </Box>
      </Stack>

    </Box>
  );
}
