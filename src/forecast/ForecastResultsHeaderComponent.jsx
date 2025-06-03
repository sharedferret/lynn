import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FarmType from './lib/FarmType';
import ForecastResultsGuideComponent from './ForecastResultsGuideComponent';
import ForecastResultsMapComponent from './ForecastResultsMapComponent';

function ForecastResultsHeaderComponent({ filter }) {
  // Generate Response
  let output = '';
  if (filter.collection === true) {
    output = filter.name;
  } else if (filter.type === FarmType.EUREKA_NM) {
    output = `Upcoming ${filter.name} Spawns`;
  } else if (filter.type === FarmType.EUREKA_FARM) {
    output = `Upcoming ${filter.name} Farms`;
  } else if (filter.type === FarmType.FRAGMENT_FARM) {
    output = `Upcoming ${filter.name} Fragment Farms`;
  }

  return (
    <Box pb={4}>
      <Stack spacing={2} alignItems="center">
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
          {filter.collection === false
            ? (
              <Box className="IconImageBox">
                <img
                  className="IconImage"
                  src={`${process.env.PUBLIC_URL}/assets/nms/${filter.image}`}
                  alt={filter.name}
                />
              </Box>
            ) : null}
          <Typography variant="h4" fontWeight={700}>
            {output}
          </Typography>
        </Stack>
        {
          filter.guide
            ? (
              <ForecastResultsGuideComponent filter={filter} />
            )
            : <Box />
        }
        {
          filter.map
            ? <ForecastResultsMapComponent filter={filter} />
            : <Box />
        }

      </Stack>
    </Box>
  );
}

export default ForecastResultsHeaderComponent;
