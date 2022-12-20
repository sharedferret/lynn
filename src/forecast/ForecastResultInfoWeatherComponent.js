import { Box, Stack } from '@mui/material';
import React, { Component } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { v4 as uuidv4 } from 'uuid';

class ForecastResultInfoWeatherComponent extends Component {

  render() {
    return (
      <Stack direction='row' justifyContent='center' alignItems='center' divider={<ChevronRightIcon fontSize='small' />}>
        {this.props.conditions.map(item => (
          <Box className='IconImageBox' key={ uuidv4() }>
            <img className='IconImage' src={`${process.env.PUBLIC_URL}/assets/weathericons/${weather_icon_mapping[item]}`} alt={ item } />
          </Box>
        ))}
      </Stack>
    );
  }
}

const weather_icon_mapping = {
  'Astromagnetic Storm': 'AstromagneticStorm.png',
  'Blizzards': 'Blizzards.png',
  'Clear Skies': 'ClearSkies.png',
  'Clouds': 'Clouds.png',
  'Dust Storms': 'DustStorms.png',
  'Fair Skies': 'FairSkies.png',
  'Fog': 'Fog.png',
  'Gales': 'Gales.png',
  'Gloom': 'Gloom.png',
  'Heat Waves': 'HeatWaves.png',
  'Moon Dust': 'MoonDust.png',
  'Rain': 'Rain.png',
  'Showers': 'Showers.png',
  'Snow': 'Snow.png',
  'Thunder': 'Thunder.png',
  'Thunderstorms': 'Thunderstorms.png',
  'Umbral Static': 'UmbralStatic.png',
  'Umbral Wind': 'UmbralWind.png',
  'Wind': 'Wind.png',
};

export default ForecastResultInfoWeatherComponent;
