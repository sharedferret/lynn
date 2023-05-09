import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import ForecastResultsDisplayComponent from './ForecastResultsDisplayComponent';

import UpcomingSpawnCalculator from './lib/UpcomingSpawnCalculator';
import FarmType from './lib/FarmType';
import ForecastColdBoxMobSelectorComponent from './ForecastColdBoxMobSelectorComponent';
import Weather from './lib/Weather';

export default function ForecastResultsBodyComponent({ filter }) {
  function getWeatherStartTime(start_date = new Date()) {
    const EORZEA_TIME_DILATION = 20.571428571428573;
    const EIGHT_HOURS_IN_MS = 8 * 1000 * 60 * 60;

    // Align to start of current weather segment
    const current_eorzea_epoch = start_date.getTime() * EORZEA_TIME_DILATION;
    const weather_start_eorzea_epoch = current_eorzea_epoch - (current_eorzea_epoch % EIGHT_HOURS_IN_MS) + 1;
    const weather_start_date = new Date(Math.round(weather_start_eorzea_epoch / EORZEA_TIME_DILATION));
    return weather_start_date;
  }

  /**
   * Component State
   *
   * startOfCurrentWeather: A date object corresponding to the start of the most recent weather period (23m 20s).
   *    Used to force a refresh of upcoming spawns on weather change.
   * coldBoxMob: The selected mob from ForecastColdBoxMobSelectorComponent
   * coldBoxWeather: The selected weather from ForecastColdBoxMobSelectorComponent
   */
  const [startOfCurrentWeather, setStartOfCurrentWeather] = useState(getWeatherStartTime(new Date()));
  const [coldBoxMob, setColdBoxMob] = useState('Pagos Chimera');
  const [coldBoxWeather, setColdBoxWeather] = useState(Weather.BLIZZARDS);

  function handleColdBoxMobUpdate(event, value) {
    switch (value) {
      case 'Pagos Chimera':
        setColdBoxMob('Pagos Chimera');
        setColdBoxWeather(Weather.BLIZZARDS);
        break;
      case 'Val Griffin':
        setColdBoxMob('Val Griffin');
        setColdBoxWeather(Weather.FAIR_SKIES);
        break;
      case 'Greater Amphiptere':
        setColdBoxMob('Greater Amphiptere');
        setColdBoxWeather(Weather.THUNDER);
        break;
      default:
        return null;
    }
  }

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

  if (filter.name === 'Cold-Warped Lockbox') {
    filter.requiredWeather = [coldBoxWeather];
  }

  if (filter.type === FarmType.EUREKA_NM) {
    if (filter.collection === true) {
      upcomingResults = UpcomingSpawnCalculator.getMultipleUpcomingSpawns(filter.contains);
    } else {
      upcomingResults = UpcomingSpawnCalculator.getUpcomingSpawns(filter);
    }
  } else if (filter.type === FarmType.EUREKA_FARM) {
    if (filter.collection === true) {
      upcomingResults = UpcomingSpawnCalculator.getMultipleUpcomingSpawns(filter.contains);
      topResults = UpcomingSpawnCalculator.getMultipleTopFarms(filter.contains);
    } else {
      upcomingResults = UpcomingSpawnCalculator.getUpcomingFarms(filter);
      topResults = UpcomingSpawnCalculator.getTopFarms(filter);
    }
  } else if (filter.type === FarmType.FRAGMENT_FARM) {
    if (filter.collection === true) {
      upcomingResults = UpcomingSpawnCalculator.getMultipleUpcomingSpawns(filter.contains);
      topResults = UpcomingSpawnCalculator.getMultipleTopFarms(filter.contains);
    } else {
      upcomingResults = UpcomingSpawnCalculator.getUpcomingFarms(filter);
      topResults = UpcomingSpawnCalculator.getTopFarms(filter);
    }
  } else if (filter.type === FarmType.ALL) {
    upcomingResults = UpcomingSpawnCalculator.getMultipleUpcomingSpawns(filter.contains, 10);
  }

  return (
    <Stack spacing={4}>
      {
        filter.name === 'Cold-Warped Lockbox'
          ? <ForecastColdBoxMobSelectorComponent currentMob={coldBoxMob} handleColdBoxMobUpdate={handleColdBoxMobUpdate} />
          : null
      }
      <Stack direction="row" spacing={2} justifyContent="center">
        <ForecastResultsDisplayComponent
          type="Upcoming Results"
          filter={filter}
          results={upcomingResults}
        />
        {
          topResults.length > 0 ? <ForecastResultsDisplayComponent type="Top Results (Next 14 Days)" filter={filter} results={topResults} /> : undefined
        }
      </Stack>
    </Stack>

  );
}
