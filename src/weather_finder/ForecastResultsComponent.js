import React, { Component } from 'react';
import { Paper } from '@mui/material';

import './ForecastResults.css';
import ForecastResultComponent from './ForecastResultComponent';
import WeatherFavorability from './weather-favorability';
import ForecastResultsHeaderComponent from './ForecastResultsHeaderComponent';

class ForecastResultsComponent extends Component {
  render() {
    const WEATHER_CHANGES_PER_DAY = 61.71429;
    const MINUTES_TO_MS = 60000;

    const favorability_data = WeatherFavorability.getFavorability(
      this.props.sessionLength * MINUTES_TO_MS, 
      Math.ceil(this.props.searchDuration * WEATHER_CHANGES_PER_DAY), 
      this.props.startDate, 
      this.props.location, 
      this.props.ranking);
    
    return (
      <div className="ForecastResults">
        <Paper className="ForecastResultsPaper" elevation={1} >
          <ForecastResultsHeaderComponent
            location={this.props.location}
            searchDuration={this.props.searchDuration}
            sessionLength={this.props.sessionLength}
            startTime={this.props.startDate}
          />
          <div className="ForecastResultsContainer">
            {favorability_data.map(item => (
              <ForecastResultComponent data={item} />
            ))}
          </div>
        </Paper>
      </div>
    );
  }
}

export default ForecastResultsComponent;