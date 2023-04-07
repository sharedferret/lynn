import React, { Component } from 'react';

import { Box, Stack } from '@mui/material';

import DRSHolsterBagComponent from './DRSHolsterBagComponent';

class DRSHolsterContainerComponent extends Component {

  render() {
    return (
      <Box>
        <Stack
          direction='row'
          spacing={2}
        >
          <DRSHolsterBagComponent
            holsterData={ this.props.holsterPrepop }
            bagType={ 'prepop' }
            handleHolsterUpdate={ this.props.handleHolsterUpdate }
          />
          <DRSHolsterBagComponent
            holsterData={ this.props.holsterMain }
            bagType={ 'main' }
            handleHolsterUpdate={ this.props.handleHolsterUpdate }
          />
        </Stack>
      </Box>
    );
  }
}

export default DRSHolsterContainerComponent;