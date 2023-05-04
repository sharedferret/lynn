import React, { Component } from 'react';
import DRSHolsterHelper from './lib/DRSHolsterHelper';

import { Box, Divider, Stack, Typography } from '@mui/material';
import ActionAcquisitionMethodCardComponent from '../acquisition/ActionAcquisitionMethodCardComponent';
import universalisPriceHelperInstance from '../acquisition/UniversalisPriceHelper';
import { v4 as uuidv4 } from 'uuid';

class BozjaLostActionHelperDataComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actionPriceData: null,
      lastUpdated: new Date()
    }

    this.updateGuideState = this.updateGuideState.bind(this);
  }

  componentDidMount() {
    universalisPriceHelperInstance.fetchIDs([this.props.lostAction], this.updateGuideState);
  }

  componentDidUpdate(prevProps) {
    if (!(this.props.lostAction === prevProps.lostAction)) {
      universalisPriceHelperInstance.fetchIDs([this.props.lostAction], this.updateGuideState);
    }
  }

  updateGuideState(priceData) {
    this.setState({
      actionPriceData: priceData,
      lastUpdated: new Date()
    })
  }

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
              return <ActionAcquisitionMethodCardComponent
                methodData={ i }
                fragmentId={ fragmentData.id}
                fragmentName={ fragmentData.short }
                priceData={ this.state.actionPriceData && this.props.lostAction ? this.state.actionPriceData[fragmentData.short] : null }
                key={ uuidv4() } />
            })
          }
        </Stack>
      </Stack>
    )
  }
}

export default BozjaLostActionHelperDataComponent;