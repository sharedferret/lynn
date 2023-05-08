import React, { Component } from 'react';
import { Stack } from '@mui/material';
import ForecastResultsDisplayComponent from './ForecastResultsDisplayComponent';

import UpcomingSpawnCalculator from './lib/UpcomingSpawnCalculator';
import FarmType from './lib/FarmType';
import ForecastColdBoxMobSelectorComponent from './ForecastColdBoxMobSelectorComponent';
import Weather from './lib/Weather';

class ForecastResultsBodyComponent extends Component {
  constructor(props) {
    super(props);

    const startOfCurrentWeather = this.getWeatherStartTime(new Date());

    this.state = {
      startOfCurrentWeather: startOfCurrentWeather.getTime(),
      coldBoxMob: 'Pagos Chimera',
      coldBoxWeather: Weather.BLIZZARDS
    };

    this.handleColdBoxMobUpdate = this.handleColdBoxMobUpdate.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.updateResultsOnWeatherChange.bind(this), 15000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleColdBoxMobUpdate(event, value) {
    switch (value) {
      case 'Pagos Chimera':
        this.setState({
          coldBoxMob: 'Pagos Chimera',
          coldBoxWeather: Weather.BLIZZARDS
        })
        break;
      case 'Val Griffin':
        this.setState({
          coldBoxMob: 'Val Griffin',
          coldBoxWeather: Weather.FAIR_SKIES
        })
        break;
        case 'Greater Amphiptere':
          this.setState({
            coldBoxMob: 'Greater Amphiptere',
            coldBoxWeather: Weather.THUNDER
          })
        break;
      default:
        return null;
    }
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

    const filter = this.props.filter;

    if (filter.name === 'Cold-Warped Lockbox') {
      filter.requiredWeather = [ this.state.coldBoxWeather ];
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
            ? <ForecastColdBoxMobSelectorComponent currentMob={ this.state.coldBoxMob } handleColdBoxMobUpdate={ this.handleColdBoxMobUpdate } />
            : null
        }
        <Stack direction="row" spacing={2} justifyContent='center'>
          <ForecastResultsDisplayComponent
            type='Upcoming Results'
            filter={filter} 
            results={upcomingResults}
          />
          {
            topResults.length > 0 ? <ForecastResultsDisplayComponent type='Top Results (Next 14 Days)' filter={filter} results={topResults} /> : undefined
          }
        </Stack>
      </Stack>
      
    );
  }
}

export default ForecastResultsBodyComponent;