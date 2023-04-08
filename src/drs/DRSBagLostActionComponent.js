import React, { Component } from 'react';

import { Box, Divider, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import DRSHolsterHelper from './lib/DRSHolsterHelper';
import DRSLostActionSelectorComponent from './DRSLostActionSelectorComponent';
import ClearIcon from '@mui/icons-material/Clear';

class DRSBagLostActionComponent extends Component {
  constructor(props) {
    super(props);

    this.handleQuantityUpdate = this.handleQuantityUpdate.bind(this);
    this.handleActionUpdate = this.handleActionUpdate.bind(this);
    this.handleDeleteAction = this.handleDeleteAction.bind(this);
  }

  handleQuantityUpdate(event) {
    const newLostAction = {
      name: this.props.actionName,
      quantity: parseInt(event.target.value)
    }

    this.props.handleLostActionUpdate(newLostAction, this.props.index);
  }

  handleActionUpdate(event) {
    // For this we'll just create a new lost action with quantity 1 and pass it up.
    const newLostAction = {
      name: event.target.value,
      quantity: 1
    }

    this.props.handleLostActionUpdate(newLostAction, this.props.index);
  }

  handleDeleteAction(event) {
    this.props.handleLostActionUpdate(null, this.props.index);
  }

  render() {
    // Get lost action data
    const actionData = DRSHolsterHelper.getLostActionData(this.props.actionName);

    // Calculate total action weight
    const combinedActionWeight = actionData !== undefined ? (actionData.weight * this.props.actionQuantity) : 0;

    return (
      <Box>
        <Stack
          direction='row'
          spacing={2}
          height={60}
          p={1}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Box width={10}>
            <Box
              style={{cursor: 'pointer'}}
              onClick={ this.handleDeleteAction }
            >
              <ClearIcon
                fontSize='small'
                sx={{ color: 'red' }}
              />
            </Box>
          </Box>
          <Box width={60}>
            <TextField
              type='number'
              value={this.props.actionQuantity}
              size='small'
              onChange={ this.handleQuantityUpdate }
            />
          </Box>

          <Box width={325}>
            <DRSLostActionSelectorComponent lostAction={ this.props.actionName } handleActionUpdate={ this.handleActionUpdate } />
          </Box>
          <Divider orientation='vertical' variant='middle' />
          <Box width={30}>
            <Typography>{combinedActionWeight}</Typography>
          </Box>
        </Stack>
      </Box>
    );
  }
}

export default DRSBagLostActionComponent;