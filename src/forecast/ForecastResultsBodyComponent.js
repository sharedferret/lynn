import React, { Component } from 'react';
import { Stack } from '@mui/material';
import ForecastResultsDisplayComponent from './ForecastResultsDisplayComponent';

import UpcomingSpawnCalculator from './lib/UpcomingSpawnCalculator';
import FarmType from './lib/FarmType';

class ForecastResultsBodyComponent extends Component {
  constructor(props) {
    super(props);

    const startOfCurrentWeather = this.getWeatherStartTime(new Date());

    this.state = {
      startOfCurrentWeather: startOfCurrentWeather.getTime(),
    };
  }

  componentDidMount() {
    this.interval = setInterval(this.updateResultsOnWeatherChange.bind(this), 15000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateResultsOnWeatherChange() {
    // Get current weather start time
    const startOfCurrentWeather = this.getWeatherStartTime(new Date());

    if (startOfCurrentWeather.getTime() !== this.state.startOfCurrentWeather) {
      this.setState({
        startOfCurrentWeather: startOfCurrentWeather.getTime()
      })
    }
  }

  getWeatherStartTime(start_date = new Date()) {
    const EORZEA_TIME_DILATION = 20.571428571428573;
    const EIGHT_HOURS_IN_MS = 8 * 1000 * 60 * 60;

    // Align to start of current weather segment
    const current_eorzea_epoch = start_date.getTime() * EORZEA_TIME_DILATION;
    const weather_start_eorzea_epoch = current_eorzea_epoch - (current_eorzea_epoch % EIGHT_HOURS_IN_MS) + 1;
    const weather_start_date = new Date(Math.round(weather_start_eorzea_epoch / EORZEA_TIME_DILATION));
    return weather_start_date;
  }

  render() {
    let upcomingResults = [];
    let topResults = [];

    if (this.props.filter.type === FarmType.EUREKA_NM) {
      if (this.props.filter.collection === true) {
        upcomingResults = UpcomingSpawnCalculator.getMultipleUpcomingSpawns(this.props.filter.contains);
      } else {
        upcomingResults = UpcomingSpawnCalculator.getUpcomingSpawns(this.props.filter);
      }
    } else if (this.props.filter.type === FarmType.EUREKA_FARM) {
      if (this.props.filter.collection === true) {
        upcomingResults = UpcomingSpawnCalculator.getMultipleUpcomingSpawns(this.props.filter.contains);
        topResults = UpcomingSpawnCalculator.getMultipleTopFarms(this.props.filter.contains);
      } else {
        upcomingResults = UpcomingSpawnCalculator.getUpcomingFarms(this.props.filter);
        topResults = UpcomingSpawnCalculator.getTopFarms(this.props.filter);
      }
    } else if (this.props.filter.type === FarmType.FRAGMENT_FARM) {
      if (this.props.filter.collection === true) {
        upcomingResults = UpcomingSpawnCalculator.getMultipleUpcomingSpawns(this.props.filter.contains);
        topResults = UpcomingSpawnCalculator.getMultipleTopFarms(this.props.filter.contains);
      } else {
        upcomingResults = UpcomingSpawnCalculator.getUpcomingFarms(this.props.filter);
        topResults = UpcomingSpawnCalculator.getTopFarms(this.props.filter);
      }
    } else if (this.props.filter.type === FarmType.ALL) {
      upcomingResults = UpcomingSpawnCalculator.getMultipleUpcomingSpawns(this.props.filter.contains, 10);
    }

    return (
      <Stack direction="row" spacing={2} justifyContent='center'>
        <ForecastResultsDisplayComponent
          type='Upcoming Results'
          filter={this.props.filter} 
          results={upcomingResults}
        />
        {
          topResults.length > 0 ? <ForecastResultsDisplayComponent type='Top Results (Next 14 Days)' filter={this.props.filter} results={topResults} /> : undefined
        }
      </Stack>
    );
  }
}

export default ForecastResultsBodyComponent;