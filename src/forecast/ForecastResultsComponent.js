import React, { Component } from 'react';
import { Paper, Stack } from '@mui/material';
import { Helmet } from 'react-helmet';

import ForecastResultsHeaderComponent from './ForecastResultsHeaderComponent';
import ForecastResultsBodyComponent from './ForecastResultsBodyComponent';

import './ForecastResultsComponent.css';

class ForecastResultsComponent extends Component {
  render() {
    return (
      <Paper className="ForecastResultsPaper">
        <Helmet>
          <title>Expeditionary Forecast - lynn.pet</title>
          <meta name="description" content="Find the best times to farm for fragments, logograms, Eureka NMs!" />
          <meta property="og:title" content="Expeditionary Forecast" />
          <meta property="og:url" content="https://lynn.pet/forecast" />
          <meta property="og:image" content="https://lynn.pet/assets/nms/cassie.png" />
          <meta property="og:description" content="Find the best times to farm for fragments, logograms, Eureka NMs!" />
          <meta property="og:site_name" content="lynn.pet!" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:creator" content="@reflexyui" />
        </Helmet>
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