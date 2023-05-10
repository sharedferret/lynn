import React from 'react';
import { Divider, Paper, Stack } from '@mui/material';

import ForecastResultDateComponent from './ForecastResultDateComponent';
import ForecastResultInfoComponent from './ForecastResultInfoComponent';

import './ForecastResultComponent.css';

/**
 * Container for a single result.
 *
 * 35%        65%
 * Time    |  Spawn title
 *         |  Spawn detail
 */
export default function ForecastResultComponent({ result, isCollection }) {
  return (
    <Paper variant="outlined" className="ForecastResultPaper">
      <Stack direction="row" spacing={2} minHeight={70} height="100%" p={1}>
        <ForecastResultDateComponent
          time={result.time}
        />
        <Divider orientation="vertical" flexItem variant="inset" />
        <ForecastResultInfoComponent
          result={result}
          isCollection={isCollection}
        />
      </Stack>
    </Paper>
  );
}
