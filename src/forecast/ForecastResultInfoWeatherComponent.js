import { Box, Stack } from '@mui/material';
import React from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { v4 as uuidv4 } from 'uuid';

export default function ForecastResultInfoWeatherComponent({ conditions }) {
  return (
    <Stack direction='row' justifyContent='center' alignItems='center' divider={<ChevronRightIcon fontSize='small' />}>
      {conditions.map(item => (
        <Box className='IconImageBox' key={ uuidv4() }>
          <img className='IconImage' src={`${process.env.PUBLIC_URL}/assets/weathericons/${item.replaceAll(' ', '')}.png`} alt={ item } />
        </Box>
      ))}
    </Stack>
  );
}
