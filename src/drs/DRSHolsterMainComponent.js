import React, { Component } from 'react';

import { Box, Stack, Typography } from '@mui/material';
import DRSHolsterHelper from './lib/DRSHolsterHelper';
import DRSHolsterContainerComponent from './DRSHolsterContainerComponent';
import DRSHolsterActionAcquisitionGuideComponent from './DRSHolsterActionAcquisitionGuideComponent';

class DRSHolsterMainComponent extends Component {
  constructor(props) {
    super(props);

    const holster = this.props.holster;
    const holsterData = DRSHolsterHelper.getHolsterData(holster.type, holster.name);
    this.state = {
      holsterName: holster.name,
      holsterType: holster.type,
      holsterMetadata: {
        name: holsterData.name,
        role: holsterData.role,
        assignments: holsterData.assignments,
        explanation: holsterData.explanation
      },
      holsterPrepop: holsterData.pre,
      holsterMain: holsterData.main
    }

    this.handleHolsterUpdate = this.handleHolsterUpdate.bind(this);
  }

  handleHolsterUpdate(data, bagType) {
    if (bagType === 'prepop') {
      this.setState({
        holsterPrepop: data
      });
    } else if (bagType === 'main') {
      this.setState({
        holsterMain: data
      });
    }
  }

  render() {
    return (
      <Box maxWidth={1000}>
        <Stack spacing={2} minHeight={100} p={1}>
          <Typography fontWeight={700} variant={'h4'}>DRS Holster</Typography>
          <Typography fontWeight={700} variant={'h4'}>Role: {this.state.holsterMetadata.name}</Typography>
          <Typography align='left' p={2} style={{'white-space': 'pre-line'}}>{ this.state.holsterMetadata.explanation }</Typography>
          <DRSHolsterContainerComponent
            name={this.state.holsterName}
            type={this.state.holsterType}
            holsterPrepop={this.state.holsterPrepop}
            holsterMain={this.state.holsterMain}
            handleHolsterUpdate={this.handleHolsterUpdate}
          />
          <DRSHolsterActionAcquisitionGuideComponent />
        </Stack>
      </Box>
    );
  }
}

export default DRSHolsterMainComponent