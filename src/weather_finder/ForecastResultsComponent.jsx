import React from 'react';
import Paper from '@mui/material/Paper';

import './ForecastResults.css';
import { v4 as uuidv4 } from 'uuid';
import ForecastResultComponent from './ForecastResultComponent';
import WeatherFavorability from './weather-favorability';
import ForecastResultsHeaderComponent from './ForecastResultsHeaderComponent';

export default function ForecastResultsComponent({
  location, searchDuration, sessionLength, startDate, ranking,
}) {
  const WEATHER_CHANGES_PER_DAY = 61.71429;
  const MINUTES_TO_MS = 60000;

  const favorabilityData = WeatherFavorability.getFavorability(
    sessionLength * MINUTES_TO_MS,
    Math.ceil(searchDuration * WEATHER_CHANGES_PER_DAY),
    startDate,
    location,
    ranking,
  );

  return (
    <div className="ForecastResults">
      <Paper className="ForecastResultsPaper" elevation={1}>
        <ForecastResultsHeaderComponent
          location={location}
          searchDuration={searchDuration}
          sessionLength={sessionLength}
          startTime={startDate}
        />
        <div className="ForecastResultsContainer">
          {favorabilityData.map((item) => (
            <ForecastResultComponent data={item} key={`favorability-${uuidv4()}`} />
          ))}
        </div>
      </Paper>
    </div>
  );
}
