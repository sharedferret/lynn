import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import './WeatherConditionCard.css';

export default function WeatherConditionCardComponent({ data }) {
  const weatherIconMapping = {
    'Astromagnetic Storm': 'AstromagneticStorm.png',
    Blizzards: 'Blizzards.png',
    'Clear Skies': 'ClearSkies.png',
    Clouds: 'Clouds.png',
    'Dust Storms': 'DustStorms.png',
    'Fair Skies': 'FairSkies.png',
    Fog: 'Fog.png',
    Gales: 'Gales.png',
    Gloom: 'Gloom.png',
    'Heat Waves': 'HeatWaves.png',
    'Moon Dust': 'MoonDust.png',
    Rain: 'Rain.png',
    Showers: 'Showers.png',
    Snow: 'Snow.png',
    Thunder: 'Thunder.png',
    Thunderstorms: 'Thunderstorms.png',
    'Umbral Static': 'UmbralStatic.png',
    'Umbral Wind': 'UmbralWind.png',
    Wind: 'Wind.png',
  };

  const weatherIcon = weatherIconMapping[data.condition];
  return (
    <Card className="WeatherConditionCard">
      <CardContent>
        <Stack alignItems="center">
          <Typography>
            {data.condition}
          </Typography>
          <Box>
            <img
              src={`${process.env.PUBLIC_URL}/assets/weathericons/${weatherIcon}`}
              alt={weatherIcon}
            />
          </Box>

          <Typography variant="h6">
            {data.time.toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
            })}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
