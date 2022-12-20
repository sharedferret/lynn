import React, { Component } from 'react';
import { Paper, Stack } from '@mui/material';

import ForecastResultsHeaderComponent from './ForecastResultsHeaderComponent';
import ForecastResultsBodyComponent from './ForecastResultsBodyComponent';

import './ForecastResultsComponent.css';

class ForecastResultsComponent extends Component {
  render() {
    return (
      <Paper className="ForecastResultsPaper">
        <Stack className="ForecastResultsStack" spacing={2}>
          <ForecastResultsHeaderComponent
            filter={this.props.filter}
          />
          <ForecastResultsBodyComponent
            filter={this.props.filter}
          />
        </Stack>
      </Paper>
    );
  }
}

export default ForecastResultsComponent;