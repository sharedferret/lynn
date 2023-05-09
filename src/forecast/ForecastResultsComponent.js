import React from 'react';
import { Paper, Stack } from '@mui/material';
import { Helmet } from 'react-helmet';

import ForecastResultsHeaderComponent from './ForecastResultsHeaderComponent';
import ForecastResultsBodyComponent from './ForecastResultsBodyComponent';

import './ForecastResultsComponent.css';

function ForecastResultsComponent({ filter }) {
  return (
    <Paper className="ForecastResultsPaper">
      <Helmet>
        <title>Expeditionary Forecast - lynn.pet</title>
        <meta name="description" content="Find the best times to farm for fragments, logograms, and Eureka NMs!" />
        <meta property="og:title" content="Expeditionary Forecast" />
        <meta property="og:url" content="https://lynn.pet/forecast" />
        <meta property="og:image" content="https://lynn.pet/assets/nms/cassie.png" />
        <meta property="og:description" content="Find the best times to farm for fragments, logograms, and Eureka NMs!" />
        <meta property="og:site_name" content="lynn.pet!" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@reflexyui" />
      </Helmet>
      <Stack className="ForecastResultsStack" spacing={ 2 }>
        <ForecastResultsHeaderComponent
          filter={ filter }
        />
        <ForecastResultsBodyComponent
          filter={ filter }
        />
      </Stack>
    </Paper>
  );
}

export default ForecastResultsComponent;