import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import EorzeaTime from 'eorzea-time';

export default function ForecastResultInfoWeatherComponent({ conditions, startTime }) {
  const EORZEA_WEATHER_DURATION_MS = (23 * 60000) + (20 * 1000);
  return (
    <Grid
      container
      spacing={1}
      justifyContent="center"
      alignItems="center"
      pt={2}
    >
      {conditions.map((item, index) => (
        <Tooltip title={(
          <Stack>
            <Typography textAlign="center">
              {dayjs(startTime.getTime() + (index * EORZEA_WEATHER_DURATION_MS))
                .format('h:mm:ss A')}
            </Typography>
            <Typography textAlign="center">
              {
                new EorzeaTime(
                  dayjs(startTime.getTime() + (index * EORZEA_WEATHER_DURATION_MS))
                    .toDate(),
                )
                  .getHours().toLocaleString('en-US', { minimumIntegerDigits: 2 })
              }
              :00 ET
            </Typography>
          </Stack>
        )}
        >
          <Stack direction="row" alignItems="center">

            <Grid
              item
              className="IconImageBox"
              key={uuidv4()}
              width={32}
            >
              <img
                className="IconImage"
                src={`${process.env.PUBLIC_URL}/assets/weathericons/${item.replaceAll(' ', '')}.png`}
                alt={item}
              />
            </Grid>
            {index < conditions.length - 1 ? <ChevronRightIcon fontSize="small" /> : null}
          </Stack>
        </Tooltip>
      ))}
    </Grid>
  );
}

/**
 * time.toLocaleString('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
            hour: 'numeric',
            minute: 'numeric',
            timeZoneName: 'short',
          })
 */
