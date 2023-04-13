import React, { Component } from 'react';

import { Box, Divider, Stack, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import DRSHolsterActionAcquisitionLostActionComponent from './DRSHolsterActionAcquisitionLostActionComponent';

class DRSHolsterActionAcquisitionGuideComponent extends Component {
  render() {
    return (
      <Box sx={{ maxWidth: 1000, border: 1, borderRadius: '12px', borderColor: '#ddd' }}>
        <Stack spacing={2} p={2}>
          <Typography fontWeight={700} variant={'h4'}>Lost Actions Needed</Typography>
          <Divider />
          <Box>
            <Stack spacing={2} divider={<Divider variant='middle' />}>
              { Object.keys(this.props.neededActions).map(i => {
                return <DRSHolsterActionAcquisitionLostActionComponent key={ uuidv4() } action={ i } quantity={ this.props.neededActions[i] } />
              })}
            </Stack>
          </Box>
        </Stack>
      </Box>
    )
  }
}

export default DRSHolsterActionAcquisitionGuideComponent;