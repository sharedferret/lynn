import React, { useState, useCallback } from 'react';
import { Box, Stack } from '@mui/material';
import EorzeaWeather from 'lynn-eorzea-weather';
import ForecastResultsComponent from './ForecastResultsComponent';
import ForecastOptionsSelectorComponent from './ForecastOptionsSelectorComponent';

export default function FavorableWeatherFinderComponent() {
  const fragmentFavorabilityRanking = {
    conditions: {
      'Dust Storms': 4,
      Wind: 2,
      Thunder: 1,
    },
    combinations: 2,
    type: 'fragment',
  };

  /**
   * Component State
   */
  const [location, setLocation] = useState(EorzeaWeather.ZONE_BOZJAN_SOUTHERN_FRONT);
  const [startDate, setStartDate] = useState(new Date());
  const [sessionLength, setSessionLength] = useState(180);
  const [searchDuration, setSearchDuration] = useState(7);
  const [ranking, setRanking] = useState(fragmentFavorabilityRanking);

  const handleSubmit = useCallback((data) => {
    setLocation(data.locationState);
    setStartDate(data.startDateState);
    setSessionLength(data.sessionLengthState);
    setSearchDuration(data.searchDurationState);
    setRanking(data.rankingState);
  }, [setLocation, setStartDate, setSessionLength, setSearchDuration, setRanking]);

  /**
   * Render Logic
   */
  return (
    <Box
      component="main"
      margin="auto"
      sx={{ flexGrow: 1, pt: { xs: 14, md: 5 } }}
    >
      <Stack spacing={2} sx={{ paddingTop: 6 }}>
        <ForecastOptionsSelectorComponent
          location={location}
          startDate={startDate}
          sessionLength={sessionLength}
          searchDuration={searchDuration}
          ranking={ranking}
          handleSubmit={handleSubmit}
        />
        <ForecastResultsComponent
          location={location}
          startDate={startDate}
          sessionLength={sessionLength}
          searchDuration={searchDuration}
          ranking={ranking}
        />
      </Stack>
    </Box>

  );
}
