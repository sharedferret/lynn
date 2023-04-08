import React, { Component } from 'react';

import { Box, Stack, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import DRSBagLostActionComponent from './DRSBagLostActionComponent';
import DRSHolsterHelper from './lib/DRSHolsterHelper';
import { v4 as uuidv4 } from 'uuid';

class DRSHolsterBagComponent extends Component {
  constructor(props) {
    super(props);

    this.handleLostActionUpdate = this.handleLostActionUpdate.bind(this);
    this.handleAddNewAction = this.handleAddNewAction.bind(this);
  }

  handleLostActionUpdate(data, index) {
    // Data contains a newly updated lost action + quantity
    // We'll put it into our actions array and then pass it up.
    const newActions = this.props.holsterData;

    if (data === null) {
      newActions.splice(index, 1);
    } else {
      newActions[index] = data;
    }

    this.props.handleHolsterUpdate(newActions, this.props.bagType);
  }

  handleAddNewAction() {
    // Add a new blank action
    const newActions = this.props.holsterData;
    newActions.push({
      name: '',
      quantity: 1
    })

    this.props.handleHolsterUpdate(newActions, this.props.bagType);
  }

  render() {
    const actions = this.props.holsterData;

    // Calculate bag weight
    const bagWeight = DRSHolsterHelper.calculateHolsterWeight(actions);
    const overweightSx = { color: 'red' };

    return (
      <Box sx={{ border: 1, borderRadius: '12px', borderColor: '#ddd' }}>
        <Stack>
          <Typography fontSize={30} fontWeight={700}>{this.props.bagType === 'prepop' ? 'Pre-Pop' : 'Main'}</Typography>
          <Stack spacing={1} p={1}>
            {actions.map((i, index) => <DRSBagLostActionComponent actionName={ i.name } actionQuantity={ i.quantity } index={ index } handleLostActionUpdate={ this.handleLostActionUpdate} key={'action-' + uuidv4()} />)}

          </Stack>
          <Stack direction='row' p={1} width={475} alignItems={'middle'} justifyContent={'middle'}>
            <Box pl={2}>
              <Stack
                direction={'row'}
                spacing={1}
                sx={{ border: 1, borderRadius: '12px', borderColor: '#ddd' }}
                p={1}
                style={{cursor: 'pointer'}}
                onClick={ this.handleAddNewAction }
              >
              <AddCircleIcon />
              <Typography>Add Action</Typography>
              </Stack>
            </Box>

            <Box flexGrow={1} />
            <Box>
              <Stack direction='row' height='100%' alignItems={'center'}>
                <Typography align='right'>Total Weight: </Typography>
                <Box width={10} />
                <Typography fontWeight={700} sx={ bagWeight > 99 ? overweightSx : null }>{ bagWeight }</Typography>
                <Typography>&nbsp;/ 99</Typography>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Box>
    );
  }
}

export default DRSHolsterBagComponent;