import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import WeatherFavorability from './weather_finder/weather-favorability';
import ForecastResultComponent from './forecast/ForecastResultComponent';
import FarmType from './forecast/lib/FarmType';

export default function FishComponent() {
  /**
   * Forecast-style upcoming tracker for two fish:
   * Aquamaton: Clear Skies or Fair Skies followed by Gales, with gales occurring at 8am
   *
   * Lancetfish: Fair Skies followed by Clouds, with Clouds occurring at 12am
   *  Additionally include the most recent Fair Skies time along with this.
   */

  const fishSpawnTimes = WeatherFavorability.findUpcomingSpawnsForFish();

  return (
    <Box width={1000}>
      <Stack spacing={2} maxWidth={1000} pl={10} pb={10}>
        <Stack spacing={2}>
          <Box height={48} />
          <Typography variant="h4">Aquamaton</Typography>
          <Stack spacing={2}>
            {
              fishSpawnTimes.aquamaton.map((i) => (
                <ForecastResultComponent
                  result={{
                    time: i.time,
                    spawn: {
                      name: 'Aquamaton',
                      type: FarmType.EUREKA_NM,
                    },
                  }}
                  isCollection={false}
                />
              ))
            }
          </Stack>
        </Stack>
        <Stack spacing={2}>
          <Box height={48} />
          <Typography variant="h4">Lancetfish</Typography>
          <Stack spacing={2} pt={2}>
            {
              fishSpawnTimes.lancetfish.map((i) => (
                <ForecastResultComponent result={{
                  time: i.time,
                  spawn: {
                    name: 'Lancetfish',
                    type: FarmType.EUREKA_NM,
                    requiredFish: i.moraSpawns,
                  },
                }}
                />
              ))
            }
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
