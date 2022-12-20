import React, { Component } from 'react';
import { Box, Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './WeatherConditionCard.css';

class WeatherConditionCardComponent extends Component {
  render() {
    const weather_icon = weather_icon_mapping[this.props.data.condition];
    return <Card className="WeatherConditionCard">
      <CardContent>
        <Stack alignItems={'center'}>
          <Typography>
            {this.props.data.condition}
          </Typography>
          <Box>
          <img src={`${process.env.PUBLIC_URL}/assets/weathericons/${weather_icon}`} />
          </Box>
          
          <Typography variant="h6">
            {this.props.data.time.toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
            })}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
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

export default WeatherConditionCardComponent;
