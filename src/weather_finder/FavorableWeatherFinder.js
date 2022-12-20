import React, { Component } from 'react';
import { Box, Stack } from '@mui/material';
import ForecastResultsComponent from './ForecastResultsComponent';
import ForecastOptionsSelectorComponent from './ForecastOptionsSelectorComponent';
import EorzeaWeather from 'eorzea-weather';

class FavorableWeatherFinderComponent extends Component {
  fragment_favorability_ranking = {
    conditions: {
      'Dust Storms': 4,
      'Wind': 2,
      'Thunder': 1,
    },
    combinations: 2,
    type: 'fragment',
  };

  constructor(props) {
    super(props);

    this.state = {
      location: EorzeaWeather.ZONE_BOZJAN_SOUTHERN_FRONT,
      start_date: new Date(),
      session_length: 180,
      search_duration: 7,
      ranking: this.fragment_favorability_ranking,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(data) {
    this.setState({ location: data.location });
    this.setState({ start_date: data.start_date });
    this.setState({ session_length: data.session_length });
    this.setState({ search_duration: data.search_duration });
    this.setState({ ranking: data.ranking });
  }

  render() {
    return (
      <Box
        component="main"
        margin="auto"
        sx={{ flexGrow: 1, pt: { xs: 14, md: 5} }}>
        <Stack spacing={2} sx={{ paddingTop: 6 }}>
        <ForecastOptionsSelectorComponent
          location={this.state.location}
          startDate={this.state.start_date}
          sessionLength={this.state.session_length}
          searchDuration={this.state.search_duration}
          ranking={this.state.ranking}
          handleSubmit={this.handleSubmit}
        />
        <ForecastResultsComponent
          location={this.state.location}
          startDate={this.state.start_date}
          sessionLength={this.state.session_length}
          searchDuration={this.state.search_duration}
          ranking={this.state.ranking}
        />
      </Stack>
      </Box>
      
    );
  }
}

export default FavorableWeatherFinderComponent;