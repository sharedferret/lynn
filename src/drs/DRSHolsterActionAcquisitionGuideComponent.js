import React, { Component } from 'react';

import { Box, Divider, Stack, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import DRSHolsterActionAcquisitionLostActionComponent from './DRSHolsterActionAcquisitionLostActionComponent';
import DRSHolsterHelper from './lib/DRSHolsterHelper';
import universalisPriceHelperInstance from '../acquisition/UniversalisPriceHelper';

class DRSHolsterActionAcquisitionGuideComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actionPriceData: null,
      lastUpdated: new Date()
    }

    this.updateGuideState = this.updateGuideState.bind(this);
  }

  /**
   * TODO: Move this up to DRSHolsterMainComponent so we can fetch data for new actions
   */
  componentDidMount() {
    // Gather full list of IDs we need data for
    universalisPriceHelperInstance.fetchIDs(
      Object.keys(this.props.neededActions),
      this.updateGuideState);
  }

  componentDidUpdate(prevProps) {
    if (!(Object.keys(prevProps.neededActions).join(',') === Object.keys(this.props.neededActions).join(','))) {
      universalisPriceHelperInstance.fetchIDs(
        Object.keys(this.props.neededActions),
        this.updateGuideState);
    }
  }

  updateGuideState(priceData) {
    this.setState({
      actionPriceData: priceData,
      lastUpdated: new Date()
    })
  }

  render() {
    return (
      <Box sx={{ maxWidth: 1000, border: 1, borderRadius: '12px', borderColor: '#ddd' }}>
        <Stack spacing={2} p={2}>
          <Typography fontWeight={700} variant={'h4'}>Lost Actions Needed</Typography>
          <Divider />
          <Box>
            <Stack spacing={2} divider={<Divider variant='middle' />}>
              { Object.keys(this.props.neededActions).map(i => {
                const lostActionData = DRSHolsterHelper.getLostActionData(i);
                return <DRSHolsterActionAcquisitionLostActionComponent
                  key={ uuidv4() }
                  action={ i }
                  quantity={ this.props.neededActions[i] }
                  priceData={ this.state.actionPriceData && lostActionData ? this.state.actionPriceData[lostActionData.fragment] : null }
                  lastUpdated={ this.state.lastUpdated }
                  />
              })}
            </Stack>
          </Box>
        </Stack>
      </Box>
    )
  }
}

export default DRSHolsterActionAcquisitionGuideComponent;