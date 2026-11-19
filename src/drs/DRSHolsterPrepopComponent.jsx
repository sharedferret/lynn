import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import DRSBagLostActionComponent from './DRSBagLostActionComponent';

export default function DRSHolsterPrepopComponent({ holsterData }) {
  /**
   * Render Logic
   */

  const {
    essence, reraiser, primaryActions, secondaryActions,
  } = holsterData;
  return (
    <Box
      sx={{
        width: 525,
        border: 1,
        borderRadius: '12px',
        borderColor: '#ddd',
      }}
    >
      <Stack>
        <Typography
          sx={{
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          Pre-Pop
        </Typography>
        <Typography
          align="left"
          sx={{
            fontSize: 20,
            fontWeight: 700,
            width: '100%',
            ml: 4,
            pt: 2,
          }}
        >
          Essence
        </Typography>
        <DRSBagLostActionComponent
          actionName={essence}
          actionQuantity={1}
          index={0}
          key={`action-${crypto.randomUUID()}`}
          displayQuantity={false}
          displayDeleteIcon={false}
          selectorFilter="essence"
        />
        <Typography
          align="left"
          sx={{
            fontSize: 20,
            fontWeight: 700,
            width: '100%',
            ml: 4,
            pt: 2,
          }}
        >
          Reraiser
        </Typography>
        <DRSBagLostActionComponent
          actionName={reraiser}
          actionQuantity={1}
          index={0}
          key={`action-${crypto.randomUUID()}`}
          displayQuantity={false}
          displayDeleteIcon={false}
          selectorFilter="reraiser"
        />
        <Typography
          align="left"
          sx={{
            fontSize: 20,
            fontWeight: 700,
            width: '100%',
            ml: 4,
            pt: 2,
          }}
        >
          Primary Action
        </Typography>
        <Typography
          align="left"
          sx={{
            fontSize: 14,
            fontStyle: 'italic',
            width: '100%',
            ml: 4,
          }}
        >
          Bring one of the below actions
        </Typography>
        <DRSBagLostActionComponent
          actionName={primaryActions[0]}
          actionQuantity={1}
          index={0}
          key={`action-${crypto.randomUUID()}`}
          displayQuantity={false}
        />
        <Typography
          align="left"
          sx={{
            fontSize: 20,
            fontWeight: 700,
            width: '100%',
            ml: 4,
            pt: 2,
          }}
        >
          Secondary Action
        </Typography>
        <Typography
          align="left"
          sx={{
            fontSize: 14,
            fontStyle: 'italic',
            width: '100%',
            ml: 4,
          }}
        >
          Bring one of the below actions
        </Typography>
        <DRSBagLostActionComponent
          actionName={secondaryActions[0]}
          actionQuantity={1}
          index={0}
          key={`action-${crypto.randomUUID()}`}
          displayQuantity={false}
        />
        <Typography
          align="left"
          sx={{
            fontSize: 20,
            fontWeight: 700,
            width: '100%',
            ml: 4,
            pt: 2,
          }}
        >
          Use on Entry
        </Typography>
      </Stack>
    </Box>
  );
}
