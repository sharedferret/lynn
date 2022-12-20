import React, { Component } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import './ForecastResultsDisplayComponent.css';
import ForecastResultComponent from './ForecastResultComponent';

class ForecastResultsDisplayComponent extends Component {
  
  render() {
    return (
      <Box className='ForecastResultsDisplayPaper'>
        <Typography variant="h6" fontWeight={ 600 } pb={ 2 }>
          {this.props.type}
        </Typography>
        <Box>
          <Stack spacing={2} pl={2} pr={2}>
            {this.props.results !== undefined ? this.props.results.map(item => (
              <ForecastResultComponent
                result={item}
                isCollection={this.props.filter.collection}
                key={'result-' + item.time.getTime() + '-' + item.spawn.name}
              />
            )) : []}
            
          </Stack>
        </Box>
      </Box>
    );
  }
}

export default ForecastResultsDisplayComponent;