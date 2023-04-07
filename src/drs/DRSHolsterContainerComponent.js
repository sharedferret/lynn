import React, { Component } from 'react';

import { Box, Stack } from '@mui/material';

import DRSHolsterBagComponent from './DRSHolsterBagComponent';

class DRSHolsterContainerComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pre: props.holsterData.pre,
      main: props.holsterData.main
    }

    this.handleHolsterUpdate = this.handleHolsterUpdate.bind(this);
  }

  handleHolsterUpdate(data, bagType) {
    if (bagType === 'prepop') {
      this.setState({
        pre: data
      });
    } else if (bagType === 'main') {
      this.setState({
        main: data
      });
    }
  }

  render() {
    return (
      <Box>
        <Stack
          direction='row'
          spacing={2}
        >
          <DRSHolsterBagComponent
            holsterData={ this.state.pre }
            bagType={ 'prepop' }
            handleHolsterUpdate={ this.handleHolsterUpdate }
          />
          <DRSHolsterBagComponent
            holsterData={ this.state.main }
            bagType={ 'main' }
            handleHolsterUpdate={ this.handleHolsterUpdate }
          />
        </Stack>
      </Box>
    );
  }
}

export default DRSHolsterContainerComponent;