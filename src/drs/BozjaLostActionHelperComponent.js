import React, { Component } from 'react';

import { Box, Divider, Stack, Typography } from '@mui/material';
import DRSLostActionSelectorComponent from './DRSLostActionSelectorComponent';
import DRSHolsterHelper from './lib/DRSHolsterHelper';
import DRSLostActionAcquisitionMethodCardComponent from './DRSLostActionAcquisitionMethodCardComponent';
import BozjaLostActionHelperDataComponent from './BozjaLostActionHelperDataComponent';

class BozjaLostActionHelperComponent extends Component {
  constructor(props) {
    super(props);

    let action = this.props.lostAction ?? '';
    action = action.replaceAll('_', ' ');
    
    this.state = {
      lostAction: action
    };

    this.handleActionUpdate = this.handleActionUpdate.bind(this);
  }

  handleActionUpdate(event) {
    this.setState(
      {
        lostAction: event.target.value
      }
    )
  }

  render() {
    return (
      <Box width={1000}>
        <Stack spacing={2} minHeight={100} p={1} alignItems={'center'}>
          <Typography fontWeight={700} variant={'h4'}>Bozja Lost Action Helper</Typography>
          <Stack direction={'row'} spacing={2} alignItems={'center'}>
            <Typography>Action: </Typography>
            <Box width={325}>
              <DRSLostActionSelectorComponent
                lostAction={ this.state.lostAction }
                handleActionUpdate={ this.handleActionUpdate }
              />
            </Box>
          </Stack>
          <BozjaLostActionHelperDataComponent lostAction={ this.state.lostAction } />
        </Stack>
      </Box>
    );
  }
}

export default BozjaLostActionHelperComponent;