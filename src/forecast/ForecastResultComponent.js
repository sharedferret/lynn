import { Divider, Paper, Stack } from '@mui/material';
import React, { Component } from 'react';

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
class ForecastResultComponent extends Component {
  
  render() {
    return (
      <Paper variant='outlined' className='ForecastResultPaper'>
        <Stack direction='row' spacing={2} minHeight={70} height={'100%'} p={1}>
          <ForecastResultDateComponent
            time={this.props.result.time}
          />
          <Divider orientation='vertical' flexItem={true} variant='inset' />
          <ForecastResultInfoComponent 
            result={this.props.result}
            isCollection={this.props.isCollection}
          />
        </Stack>
      </Paper>
    );
  }
}

export default ForecastResultComponent;
