import React, { useCallback } from 'react';

import { Box, Stack, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { v4 as uuidv4 } from 'uuid';
import DRSBagLostActionComponent from './DRSBagLostActionComponent';
import DRSLostActionHelper from './lib/DRSLostActionHelper';

export default function DRSHolsterBagComponent({ holsterData, bagType, handleHolsterUpdate }) {
  const handleLostActionUpdate = useCallback((data, index) => {
    // Data contains a newly updated lost action + quantity
    // We'll put it into our actions array and then pass it up.
    const newActions = holsterData;

    if (data === null) {
      newActions.splice(index, 1);
    } else {
      newActions[index] = data;
    }

    handleHolsterUpdate(newActions, bagType);
  }, [holsterData, bagType, handleHolsterUpdate]);

  const handleAddNewAction = useCallback(() => {
    // Add a new blank action
    const newActions = holsterData;
    newActions.push({
      name: '',
      quantity: 1,
    });

    handleHolsterUpdate(newActions, bagType);
  }, [holsterData, bagType, handleHolsterUpdate]);

  /**
   * Render Logic
   */
  const actions = holsterData;

  // Calculate bag weight
  const bagWeight = DRSLostActionHelper.calculateHolsterWeight(actions);
  const overweightSx = { color: 'red' };

  return (
    <Box sx={{ border: 1, borderRadius: '12px', borderColor: '#ddd' }}>
      <Stack>
        <Typography fontSize={30} fontWeight={700}>
          {bagType === 'prepop' ? 'Pre-Pop' : 'Main'}
        </Typography>
        <Stack spacing={1} p={1}>
          {actions.map((i, index) => (
            <DRSBagLostActionComponent
              actionName={i.name}
              actionQuantity={i.quantity}
              index={index}
              handleLostActionUpdate={handleLostActionUpdate}
              key={`action-${uuidv4()}`}
            />
          ))}

        </Stack>
        <Stack direction="row" p={1} width={475} alignItems="middle" justifyContent="middle">
          <Box pl={2}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ border: 1, borderRadius: '12px', borderColor: '#ddd' }}
              p={1}
              style={{ cursor: 'pointer' }}
              onClick={handleAddNewAction}
            >
              <AddCircleIcon />
              <Typography>Add Action</Typography>
            </Stack>
          </Box>

          <Box flexGrow={1} />
          <Box>
            <Stack direction="row" height="100%" alignItems="center">
              <Typography align="right">Total Weight: </Typography>
              <Box width={10} />
              <Typography
                fontWeight={700}
                sx={bagWeight > 99 ? overweightSx : null}
              >
                {bagWeight}
              </Typography>
              <Typography>&nbsp;/ 99</Typography>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
