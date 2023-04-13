import React, { Component } from 'react';
import DRSHolsterHelper from './lib/DRSHolsterHelper';

import { Box, Divider, Stack, Typography } from '@mui/material';
import DRSLostActionAcquisitionMethodCardComponent from './DRSLostActionAcquisitionMethodCardComponent';
import { v4 as uuidv4 } from 'uuid';

class BozjaLostActionHelperDataComponent extends Component {
  render() {
    if (this.props.lostAction === '') {
      return null;
    }

    const actionData = DRSHolsterHelper.getLostActionData(this.props.lostAction);
    
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
          <Typography fontWeight={700} variant='h5'>{ this.props.lostAction }</Typography>
        </Stack>
        <Stack direction={ 'row' } alignItems={ 'center' } spacing={1}>
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
              return <DRSLostActionAcquisitionMethodCardComponent fragmentData={ i } fragmentName={ fragmentData.short } key={ uuidv4() } />
            })
          }
        </Stack>
      </Stack>
    )
  }
}

export default BozjaLostActionHelperDataComponent;