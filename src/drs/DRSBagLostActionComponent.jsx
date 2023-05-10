import React, { useCallback } from 'react';

import {
  Box, Divider, Stack, TextField, Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import DRSHolsterHelper from './lib/DRSHolsterHelper';
import BozjaLostActionSelectorComponent from './BozjaLostActionSelectorComponent';

export default function DRSBagLostActionComponent({
  actionName, actionQuantity, index, handleLostActionUpdate,
}) {
  const handleQuantityUpdate = useCallback((event) => {
    const newLostAction = {
      name: actionName,
      quantity: parseInt(event.target.value, 10),
    };

    handleLostActionUpdate(newLostAction, index);
  }, [actionName, index, handleLostActionUpdate]);

  const handleActionUpdate = useCallback((event) => {
    // For this we'll just create a new lost action with quantity 1 and pass it up.
    const newLostAction = {
      name: event.target.value,
      quantity: 1,
    };

    handleLostActionUpdate(newLostAction, index);
  }, [index, handleLostActionUpdate]);

  const handleDeleteAction = useCallback(() => {
    handleLostActionUpdate(null, index);
  }, [index, handleLostActionUpdate]);

  /**
   * Render Logic
   */
  // Get lost action data
  const actionData = DRSHolsterHelper.getLostActionData(actionName);

  // Calculate total action weight
  const combinedActionWeight = actionData !== undefined
    ? (actionData.weight * actionQuantity)
    : 0;

  return (
    <Box>
      <Stack
        direction="row"
        spacing={2}
        height={60}
        p={1}
        alignItems="center"
        justifyContent="center"
      >
        <Box width={10}>
          <Box
            style={{ cursor: 'pointer' }}
            onClick={handleDeleteAction}
          >
            <ClearIcon
              fontSize="small"
              sx={{ color: 'red' }}
            />
          </Box>
        </Box>
        <Box width={60}>
          <TextField
            type="number"
            InputProps={{
              inputProps: { min: 1, max: 35 },
            }}
            value={actionQuantity}
            size="small"
            onChange={handleQuantityUpdate}
          />
        </Box>

        <Box width={325}>
          <BozjaLostActionSelectorComponent
            lostAction={actionName}
            handleActionUpdate={handleActionUpdate}
          />
        </Box>
        <Divider orientation="vertical" variant="middle" />
        <Box width={30}>
          <Typography>{combinedActionWeight}</Typography>
        </Box>
      </Stack>
    </Box>
  );
}
