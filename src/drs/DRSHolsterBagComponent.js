import React, { Component } from 'react';

import { Box, Stack, Typography } from '@mui/material';

import DRSBagLostActionComponent from './DRSBagLostActionComponent';

class DRSHolsterBagComponent extends Component {
  constructor(props) {
    super(props);

    this.handleLostActionUpdate = this.handleLostActionUpdate.bind(this);
  }

  handleLostActionUpdate(data, index) {
    // Data contains a newly updated lost action + quantity
    // We'll put it into our actions array and then pass it up.
    const newActions = this.props.holsterData;
    newActions[index] = data;

    this.props.handleHolsterUpdate(newActions, this.props.bagType);
  }

  render() {
    const actions = this.props.holsterData;

    return (
      <Box sx={{ border: 1, borderRadius: '12px', borderColor: '#ddd' }}>
        <Stack>
          <Typography fontSize={30} fontWeight={700}>{this.props.bagType === 'prepop' ? 'Pre-Pop' : 'Main'}</Typography>
          <Stack spacing={1} p={1}>
            {actions.map((i, index) => <DRSBagLostActionComponent actionName={ i.name } actionQuantity={ i.quantity } index={ index } handleLostActionUpdate={ this.handleLostActionUpdate} />)}
          </Stack>
          <Stack direction='row' p={1} mr={2} width={475} justifyContent={'flex-end'}>
            <Typography align='right'>Total Weight: </Typography>
            <Box width={10} />
            <Typography fontWeight={700}>99</Typography>
          </Stack>
        </Stack>
      </Box>
    );
  }
}

export default DRSHolsterBagComponent;