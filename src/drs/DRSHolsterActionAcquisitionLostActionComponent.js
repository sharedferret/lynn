import React, { Component } from 'react';

import { Box, Grid, Stack, Typography } from '@mui/material';
import DRSHolsterHelper from './lib/DRSHolsterHelper';
import DRSLostActionAcquisitionMethodCardComponent from './DRSLostActionAcquisitionMethodCardComponent';

class DRSHolsterActionAcquisitionLostActionComponent extends Component {
  render() {
    const actionData = DRSHolsterHelper.getLostActionData(this.props.action);

    if (actionData === undefined) {
      return null;
    }

    const fragmentData = DRSHolsterHelper.getFragmentData(actionData.fragment);

    return (
      <Stack alignItems={ 'flex-start' } p={2} spacing={2}>
        <Stack direction={ 'row' } alignItems={'center'}>
          <Typography fontWeight={700} variant='h4'>{ this.props.quantity }</Typography>
          <Box width={ 12 } />
          <img src={`${process.env.PUBLIC_URL}/assets/lostactions/${actionData.image}.jpg`} width={48} height={48} alt={'Resistance Reraiser'} />
          <Box width={ 12 } />
          <Typography fontWeight={700} variant='h5'>{ this.props.action }</Typography>
        </Stack>
        <Stack direction={ 'row'} alignItems={ 'center' } spacing={1}>
          <Typography variant='h6'>From:</Typography>
          <img src={`${process.env.PUBLIC_URL}/assets/icons/Yellow_Fragment.png`} width={24} height={24} alt={'Forgotten Fragment of Care'} />
          <Typography variant='h6'>{ fragmentData.name }</Typography>
        </Stack>
        
        <Grid
          container 
          spacing={2}
        >
          {
            fragmentData.acquisition.map(i => {
              return <Grid item>
                <DRSLostActionAcquisitionMethodCardComponent methodData={ i } fragmentId={ fragmentData.id } fragmentName={ fragmentData.short } priceData={ this.props.priceData } />
              </Grid>
            })
          }
        </Grid>
      </Stack>
    );
  }
}

export default DRSHolsterActionAcquisitionLostActionComponent;