import React, { useCallback, useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import ForecastResultsDisplayComponent from './ForecastResultsDisplayComponent';

import UpcomingSpawnCalculator from './lib/UpcomingSpawnCalculator';
import FarmType from './lib/FarmType';
import ForecastColdBoxMobSelectorComponent from './ForecastColdBoxMobSelectorComponent';
import Weather from './lib/Weather';

export default function ForecastResultsBodyComponent({ filter }) {
  function getWeatherStartTime(startDate = new Date()) {
    const EORZEA_TIME_DILATION = 20.571428571428573;
    const EIGHT_HOURS_IN_MS = 8 * 1000 * 60 * 60;

    // Align to start of current weather segment
    const currentEorzeaEpoch = startDate.getTime() * EORZEA_TIME_DILATION;
    const weatherStartEorzeaEpoch = currentEorzeaEpoch
      - (currentEorzeaEpoch % EIGHT_HOURS_IN_MS) + 1;
    const weatherStartDate = new Date(Math.round(weatherStartEorzeaEpoch / EORZEA_TIME_DILATION));
    return weatherStartDate;
  }

  /**
   * Component State
   *
   * startOfCurrentWeather: A date object corresponding to the start of the most recent
   *   weather period (23m 20s). Used to force a refresh of upcoming spawns on weather change.
   * coldBoxMob: The selected mob from ForecastColdBoxMobSelectorComponent
   * coldBoxWeather: The selected weather from ForecastColdBoxMobSelectorComponent
   */
  const [startOfCurrentWeather, setStartOfCurrentWeather] = useState(
    getWeatherStartTime(new Date()),
  );
  const [coldBoxMob, setColdBoxMob] = useState('Pagos Chimera');
  const [coldBoxWeather, setColdBoxWeather] = useState(Weather.BLIZZARDS);

  const handleColdBoxMobUpdate = useCallback((event, value) => {
    switch (value) {
      case 'Pagos Chimera':
        setColdBoxMob('Pagos Chimera');
        return setColdBoxWeather(Weather.BLIZZARDS);
      case 'Val Griffin':
        setColdBoxMob('Val Griffin');
        return setColdBoxWeather(Weather.FAIR_SKIES);
      case 'Greater Amphiptere':
        setColdBoxMob('Greater Amphiptere');
        return setColdBoxWeather(Weather.THUNDER);
      default:
        return null;
    }
  }, [setColdBoxMob, setColdBoxWeather]);

  function updateResultsOnWeatherChange() {
    // Get current weather start time
    const newStartOfCurrentWeather = getWeatherStartTime(new Date());

    if (newStartOfCurrentWeather.getTime() !== startOfCurrentWeather) {
      setStartOfCurrentWeather(newStartOfCurrentWeather.getTime());
    }
  }

  /**
   * Effects
   *
   * 1. Checks if the current weather has changed. If it has, updates the startOfCurrentWeather
   * state object to force a refresh of current spawns.
   */
  useEffect(() => {
    const interval = setInterval(updateResultsOnWeatherChange.bind(this), 15000);

    return () => {
      clearInterval(interval);
    };
  });

  /**
   * Render Logic
   */
  let upcomingResults = [];
  let topResults = [];

  const forecastFilter = filter;

  if (forecastFilter.name === 'Cold-Warped Lockbox') {
    forecastFilter.requiredWeather = [coldBoxWeather];
  }

  if (forecastFilter.type === FarmType.EUREKA_NM) {
    if (forecastFilter.collection === true) {
      upcomingResults = UpcomingSpawnCalculator.getMultipleUpcomingSpawns(filter.contains);
    } else {
      upcomingResults = UpcomingSpawnCalculator.getUpcomingSpawns(filter);
    }
  } else if (forecastFilter.type === FarmType.EUREKA_FARM) {
    if (forecastFilter.collection === true) {
      upcomingResults = UpcomingSpawnCalculator.getMultipleUpcomingSpawns(filter.contains);
      topResults = UpcomingSpawnCalculator.getMultipleTopFarms(filter.contains);
    } else {
      upcomingResults = UpcomingSpawnCalculator.getUpcomingFarms(filter);
      topResults = UpcomingSpawnCalculator.getTopFarms(filter);
    }
  } else if (forecastFilter.type === FarmType.FRAGMENT_FARM) {
    if (forecastFilter.collection === true) {
      upcomingResults = UpcomingSpawnCalculator.getMultipleUpcomingSpawns(filter.contains);
      topResults = UpcomingSpawnCalculator.getMultipleTopFarms(filter.contains);
    } else {
      upcomingResults = UpcomingSpawnCalculator.getUpcomingFarms(filter);
      topResults = UpcomingSpawnCalculator.getTopFarms(filter);
    }
  } else if (forecastFilter.type === FarmType.ALL) {
    upcomingResults = UpcomingSpawnCalculator.getMultipleUpcomingSpawns(filter.contains, 10);
  }

  return (
    <Stack spacing={4}>
      {
        forecastFilter.name === 'Cold-Warped Lockbox'
          ? (
            <ForecastColdBoxMobSelectorComponent
              currentMob={coldBoxMob}
              handleColdBoxMobUpdate={handleColdBoxMobUpdate}
            />
          )
          : null
      }
      <Stack direction={{ md: 'row' }} spacing={2} justifyContent="center">
        <ForecastResultsDisplayComponent
          type="Upcoming Results"
          filter={forecastFilter}
          results={upcomingResults}
        />
        {
          topResults.length > 0
            ? (
              <ForecastResultsDisplayComponent
                type="Top Results (Next 14 Days)"
                filter={forecastFilter}
                results={topResults}
              />
            )
            : undefined
        }
      </Stack>
    </Stack>

  );
}
