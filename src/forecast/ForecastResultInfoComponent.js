import { Box, Stack, Typography } from '@mui/material';
import React, { Component } from 'react';
import FarmType from './lib/FarmType';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import ForecastResultInfoWeatherComponent from './ForecastResultInfoWeatherComponent';

class ForecastResultInfoComponent extends Component {
  render() {
    let text = '';

    if (this.props.result.spawn.type === FarmType.EUREKA_NM) {
      text = this.props.result.spawn.name + ' Spawn';
    } else if (this.props.result.spawn.type === FarmType.EUREKA_FARM) {
      text = (this.props.result.duration > 1 ? this.props.result.duration + 'x ' : '') + this.props.result.spawn.name + ' Farm';
    } else if (this.props.result.spawn.type === FarmType.FRAGMENT_FARM) {
      text = (this.props.result.duration > 1 ? this.props.result.duration + 'x ' : '') + this.props.result.spawn.name + ' Fragment Farm';
    }

    let conflictText = null;
    if (this.props.result.spawn.type === FarmType.EUREKA_NM && this.props.result.conflict) {
      const THREE_HOURS_IN_MS = 3 * 1000 * 60 * 60;
      const spawnTimeBeforeNow = this.props.result.time.getTime() - this.props.result.conflict.time.getTime();
      const earliestEntryTime = Math.floor((THREE_HOURS_IN_MS - spawnTimeBeforeNow) / 1000 / 60);
      const spawnTimeBeforeNowMinutes = Math.floor(spawnTimeBeforeNow / 1000 / 60)
      conflictText = 'Last spawn ' + spawnTimeBeforeNowMinutes +'m earlier, may not spawn if the earliest Time Remaining is less than ' + earliestEntryTime + 'm';
      // conflictText = 'May not spawn if instance\'s earliest Time Remaining is less than ' + earliestEntryTime + ' minutes';
    }

    return (
      <Box sx={{ width: '65%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Stack pb={1} pt={1}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
            {this.props.isCollection === true
              ? <Box className='IconImageBox'>
                  <img className='IconImage' src={`${process.env.PUBLIC_URL}/assets/nms/${this.props.result.spawn.image}`} alt={ this.props.result.spawn.name } />
                </Box> : null
            }
            <Typography variant='h6'>{text}</Typography>
          </Stack>
          <Box>
            {Array.isArray(this.props.result.condition) ? <ForecastResultInfoWeatherComponent conditions={this.props.result.condition} /> : null }
          </Box>
          <Box>
            {conflictText !== null
              ? <Stack direction='row' spacing={1} alignItems='end' justifyContent='center'><WarningAmberIcon /><Typography variant='caption'>{conflictText}</Typography></Stack>
              : null}
          </Box>
        </Stack>
        
      </Box>
    );
  }
}

export default ForecastResultInfoComponent;
