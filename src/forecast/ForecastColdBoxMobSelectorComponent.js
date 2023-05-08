import React, { Component } from 'react';
import { Box, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Weather from './lib/Weather';

class ForecastColdBoxMobSelectorComponent extends Component {
  renderMobButton(mob) {
    return (
      <ToggleButton
        value={ mob.name }
        style={{ justifyContent: 'flex-start' }}
        sx={{ minWidth: 300 }}
      >
        <Stack>
          <Stack direction={'row'}>
            <Typography>{ 'Lv' + mob.level }</Typography>
            <img src={`${process.env.PUBLIC_URL}/assets/eureka/eureka_${mob.element}.png`} width={24} height={24} alt={mob.element} />
            <Typography>{ mob.name }</Typography>
          </Stack>
          <Stack direction={'row'} spacing={0.5}>
            <Box width={ 36 } />
            <Typography fontStyle={'italic'}>during</Typography>
            <img src={`${process.env.PUBLIC_URL}/assets/weathericons/${mob.weather.replaceAll(' ', '')}.png`} width={24} height={24} alt={mob.weather} />
            <Typography fontStyle={'italic'}>{ mob.weather }</Typography>
          </Stack>
        </Stack>
        
      </ToggleButton>
    )
  }

  render() {
    return (
      <Box>
        <ToggleButtonGroup
          value={ this.props.currentMob }
          exclusive
          size={'large'}
          onChange={this.props.handleColdBoxMobUpdate}
        >
          { this.renderMobButton(
              {
                name: 'Pagos Chimera',
                level: 40,
                element: 'lightning',
                weather: Weather.BLIZZARDS
              }
            )
          }
          { this.renderMobButton(
              {
                name: 'Val Griffin',
                level: 40,
                element: 'wind',
                weather: Weather.FAIR_SKIES
              }
            )
          }
          { this.renderMobButton(
            {
              name: 'Greater Amphiptere',
              level: 39,
              element: 'fire',
              weather: Weather.THUNDER
            }
          )
        }
        </ToggleButtonGroup>
      </Box>
    );
  }
}

export default ForecastColdBoxMobSelectorComponent;