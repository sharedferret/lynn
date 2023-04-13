import React, { Component } from 'react';

import { Box, Divider, Stack, Typography } from '@mui/material';
import DRSLostActionSelectorComponent from './DRSLostActionSelectorComponent';
import DRSHolsterHelper from './lib/DRSHolsterHelper';
import DRSLostActionAcquisitionMethodCardComponent from './DRSLostActionAcquisitionMethodCardComponent';

class BozjaLostActionHelperComponent extends Component {
  constructor(props) {
    super(props);

    let action = this.props.lostAction ?? '';
    action = action.replaceAll('_', ' ');
    
    this.state = {
      lostAction: action
    };

    this.handleActionUpdate = this.handleActionUpdate.bind(this);
    this.renderLostActionData = this.renderLostActionData.bind(this);
  }

  handleActionUpdate(event) {

    this.setState(
      {
        lostAction: event.target.value
      }
    )
  }

  renderLostActionData() {
    if (this.state.lostAction === '') {
      return null;
    }

    const actionData = DRSHolsterHelper.getLostActionData(this.state.lostAction);
    
    if (actionData === undefined) {
      return null;
    }

    const fragmentData = DRSHolsterHelper.getFragmentData(actionData.fragment);

    return (
      <Stack spacing={2} p={1} alignItems={'flex-start'} width={1000}>
        <Divider variant={'middle'} />
        <Stack direction={ 'row' } alignItems={'center'}>
          <img src={`${process.env.PUBLIC_URL}/assets/lostactions/${actionData.image}.jpg`} width={48} height={48} alt={'Resistance Reraiser'} />
          <Box width={ 12 } />
          <Typography fontWeight={700} variant='h5'>{ this.state.lostAction }</Typography>
        </Stack>
        <Stack direction={ 'row'} alignItems={ 'center' } spacing={1}>
          <Typography variant='h6'>Drops from:</Typography>
          <img src={`${process.env.PUBLIC_URL}/assets/icons/Yellow_Fragment.png`} width={24} height={24} alt={'Forgotten Fragment of Care'} />
          <Typography variant='h6'>{ fragmentData.name }</Typography>
        </Stack>
        <Stack
          direction={ 'row' }
          spacing={2}
        >
          {
            fragmentData.acquisition.map(i => {
              return <DRSLostActionAcquisitionMethodCardComponent fragmentData={ i } fragmentName={ fragmentData.short } key={ actionData.short + fragmentData.short + i.method } />
            })
          }
        </Stack>
      </Stack>
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
          { this.renderLostActionData() }
        </Stack>
      </Box>
    );
  }
}

export default BozjaLostActionHelperComponent;