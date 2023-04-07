import React, { Component } from 'react';

import { Box, Stack, Typography } from '@mui/material';
import DRSHolsterHelper from './lib/DRSHolsterHelper';
import DRSHolsterContainerComponent from './DRSHolsterContainerComponent';

class DRSHolsterMainComponent extends Component {
  constructor(props) {
    super(props);

    const holster = this.props.holster;
    this.state = {
      holsterName: holster.name,
      holsterType: holster.type
    }
  }

  render() {
    const holster = DRSHolsterHelper.getHolsterData(this.state.holsterType, this.state.holsterName);
    return (
      <Box maxWidth={1000}>
        <Stack spacing={2} minHeight={100} p={1}>
          <Typography>DRS Holsters ({this.state.holsterType})</Typography>
          <Typography>Role: {holster.name}</Typography>
          <DRSHolsterContainerComponent
            name={this.state.holsterName}
            type={this.state.holsterType}
            holsterData={holster}
          />
        </Stack>
      </Box>
    );
  }
}

export default DRSHolsterMainComponent