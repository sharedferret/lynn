import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import './ForecastResultsDisplayComponent.css';
import ForecastResultComponent from './ForecastResultComponent';

export default function ForecastResultsDisplayComponent({ type, results, filter }) {
  return (
    <Box className="ForecastResultsDisplayPaper">
      <Typography variant="h6" fontWeight={600} pb={2}>
        {type}
      </Typography>
      <Box>
        <Stack spacing={2} pl={2} pr={2}>
          {results !== undefined
            ? results.map((item) => (
              <ForecastResultComponent
                result={item}
                isCollection={filter.collection}
                key={`result-${item.time.getTime()}-${item.spawn.name}`}
              />
            ))
            : []}
        </Stack>
      </Box>
    </Box>
  );
}
