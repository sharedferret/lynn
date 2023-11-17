import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

import { v4 as uuidv4 } from 'uuid';
import DRSBagLostActionComponent from './DRSBagLostActionComponent';

export default function DRSHolsterPrepopComponent({ holsterData, handleHolsterUpdate }) {
  /**
   * Render Logic
   */

  const {
    essence, reraiser, primaryActions, secondaryActions,
  } = holsterData;
  return (
    <Box width={525} sx={{ border: 1, borderRadius: '12px', borderColor: '#ddd' }}>
      <Stack>
        <Typography fontSize={30} fontWeight={700}>
          Pre-Pop
        </Typography>
        <Typography fontSize={20} fontWeight={700} width="100%" align="left" ml={4} pt={2}>
          Essence
        </Typography>
        <DRSBagLostActionComponent
          actionName={essence}
          actionQuantity={1}
          index={0}
          key={`action-${uuidv4()}`}
          displayQuantity={false}
          displayDeleteIcon={false}
          selectorFilter="essence"
        />
        <Typography fontSize={20} fontWeight={700} width="100%" align="left" ml={4} pt={2}>
          Reraiser
        </Typography>
        <DRSBagLostActionComponent
          actionName={reraiser}
          actionQuantity={1}
          index={0}
          key={`action-${uuidv4()}`}
          displayQuantity={false}
          displayDeleteIcon={false}
          selectorFilter="reraiser"
        />
        <Typography fontSize={20} fontWeight={700} width="100%" align="left" ml={4} pt={2}>
          Primary Action
        </Typography>
        <Typography fontSize={14} fontStyle="italic" width="100%" align="left" ml={4}>
          Bring one of the below actions
        </Typography>
        <DRSBagLostActionComponent
          actionName={primaryActions[0]}
          actionQuantity={1}
          index={0}
          key={`action-${uuidv4()}`}
          displayQuantity={false}
        />
        <Typography fontSize={20} fontWeight={700} width="100%" align="left" ml={4} pt={2}>
          Secondary Action
        </Typography>
        <Typography fontSize={14} fontStyle="italic" width="100%" align="left" ml={4}>
          Bring one of the below actions
        </Typography>
        <DRSBagLostActionComponent
          actionName={secondaryActions[0]}
          actionQuantity={1}
          index={0}
          key={`action-${uuidv4()}`}
          displayQuantity={false}
        />
        <Typography fontSize={20} fontWeight={700} width="100%" align="left" ml={4} pt={2}>
          Use on Entry
        </Typography>
      </Stack>
    </Box>
  );
}
