import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import EorzeaTime from 'eorzea-time';
import { useState } from 'react';
import { useEffect } from 'react';
dayjs.extend(relativeTime);

export default function ForecastResultDateComponent({ time }) {
  /**
   * Component State
   * 
   * currentTime: The current time. Currently only used to force a refresh of
   * the date object.
   */
  const [currentTime, setCurrentTime] = useState(new Date());

  function updateTimer() {
    setCurrentTime(new Date());
  }

  /**
   * Effects
   */
  useEffect(() => {
    const interval = setInterval(updateTimer.bind(this), 1000);

    return () => {
      clearInterval(interval);
    }
  });

  const spawnTime = dayjs(time);
  const fromNowString = spawnTime.fromNow();

  // Testing
  const eorzeaTime = new EorzeaTime(time);
  let untilET = eorzeaTime.getHours();
  if (spawnTime.isBefore(dayjs())) {
    untilET += 8;
  }
  untilET %= 24;

  let untilETString = '';
  if (untilET === 0) {
    untilETString = '12AM'
  } else if (untilET === 8) {
    untilETString = '8AM'
  } else if (untilET === 16) {
    untilETString = '4PM'
  }

  const activeNowSx = { color: 'red' };

  return (
    <Box sx={{ width: '35%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Stack>
        <Typography variant='overline' fontSize={14}>
          {time.toLocaleString('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
            hour: 'numeric',
            minute: 'numeric',
            timeZoneName: 'short',
          })}
        </Typography>
        <Box>
          <Typography display={'inline'} fontSize={18} fontWeight={700} sx={spawnTime.isBefore(dayjs()) ? activeNowSx : null}>
            {spawnTime.isBefore(dayjs())
              ? 'Active Now' 
              : fromNowString}
          </Typography>
          <Typography display={'inline'} fontSize={14}>
            {spawnTime.isBefore(dayjs())
              ? ' (until ' + untilETString + ' ET)'
              : ' (at ' + untilETString + ' ET)'
            }
          </Typography>
        </Box>
        
      </Stack>
      
    </Box>
  );
}
