import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Weather from './lib/Weather';

export default function ForecastColdBoxMobSelectorComponent(
  { currentMob, handleColdBoxMobUpdate },
) {
  function renderMobButton(mob) {
    return (
      <ToggleButton
        value={mob.name}
        style={{ justifyContent: 'flex-start' }}
        sx={{ minWidth: 300 }}
      >
        <Stack>
          <Stack direction="row">
            <Typography>{`Lv${mob.level}`}</Typography>
            <img
              src={`${process.env.PUBLIC_URL}/assets/eureka/eureka_${mob.element}.png`}
              width={24}
              height={24}
              alt={mob.element}
            />
            <Typography>{mob.name}</Typography>
          </Stack>
          <Stack direction="row" spacing={0.5}>
            <Box width={36} />
            <Typography fontStyle="italic">during</Typography>
            <img
              src={`${process.env.PUBLIC_URL}/assets/weathericons/${mob.weather.replaceAll(' ', '')}.png`}
              width={24}
              height={24}
              alt={mob.weather}
            />
            <Typography fontStyle="italic">{mob.weather}</Typography>
          </Stack>
        </Stack>

      </ToggleButton>
    );
  }

  return (
    <Box>
      <ToggleButtonGroup
        value={currentMob}
        exclusive
        size="large"
        onChange={handleColdBoxMobUpdate}
      >
        {renderMobButton(
          {
            name: 'Pagos Chimera',
            level: 40,
            element: 'lightning',
            weather: Weather.BLIZZARDS,
          },
        )}
        {renderMobButton(
          {
            name: 'Val Griffin',
            level: 40,
            element: 'wind',
            weather: Weather.FAIR_SKIES,
          },
        )}
        {renderMobButton(
          {
            name: 'Greater Amphiptere',
            level: 39,
            element: 'fire',
            weather: Weather.THUNDER,
          },
        )}
      </ToggleButtonGroup>
    </Box>
  );
}
