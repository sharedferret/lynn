import React, { Component } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import FarmType from './lib/FarmType';

class ForecastResultsHeaderComponent extends Component {
  render() {
    // Generate Response
    let output = '';
    if (this.props.filter.collection === true) {
      output = this.props.filter.name;
    } else if (this.props.filter.type === FarmType.EUREKA_NM) {
      output = 'Upcoming ' + this.props.filter.name + ' Spawns';
    } else if (this.props.filter.type === FarmType.EUREKA_FARM) {
      output = 'Upcoming ' + this.props.filter.name + ' Farms';
    } else if (this.props.filter.type === FarmType.FRAGMENT_FARM) {
      output = 'Upcoming ' + this.props.filter.name + ' Fragment Farms';
    }
    
    return (
      <Box pb={ 4 }>
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
          {this.props.filter.collection === false
            ? <Box className='IconImageBox'>
                <img className='IconImage' src={`${process.env.PUBLIC_URL}/assets/nms/${this.props.filter.image}`} alt={this.props.filter.name} />
              </Box> : null
          }
          <Typography variant="h4" fontWeight={ 700 }>
            {output}
          </Typography>
        </Stack>
        
      </Box>
    );
  }
}

export default ForecastResultsHeaderComponent;