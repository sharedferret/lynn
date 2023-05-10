import React from 'react';

import { Box, Divider, Stack, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import DRSHolsterActionAcquisitionLostActionComponent from './DRSHolsterActionAcquisitionLostActionComponent';
import DRSHolsterHelper from './lib/DRSHolsterHelper';
import universalisPriceHelperInstance from '../acquisition/UniversalisPriceHelper';
import { useState } from 'react';

export default function DRSHolsterActionAcquisitionGuideComponent({ neededActions }) {
  /**
   * Component State
   */
  const [actionPriceData, setActionPriceData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  function updateGuideState(priceData) {
    setActionPriceData(priceData);
    setLastUpdated(new Date());
  }

  // Fetch prices
  universalisPriceHelperInstance.fetchIDs(
    Object.keys(neededActions),
    updateGuideState
  );

  return (
    <Box sx={{ maxWidth: 1000, border: 1, borderRadius: '12px', borderColor: '#ddd' }}>
      <Stack spacing={2} p={2}>
        <Typography fontWeight={700} variant={'h4'}>Lost Actions Needed</Typography>
        <Divider />
        <Box>
          <Stack spacing={2} divider={<Divider variant='middle' />}>
            { Object.keys(neededActions).map(i => {
              const lostActionData = DRSHolsterHelper.getLostActionData(i);
              return <DRSHolsterActionAcquisitionLostActionComponent
                key={ uuidv4() }
                action={ i }
                quantity={ neededActions[i] }
                priceData={ actionPriceData && lostActionData ? actionPriceData[lostActionData.fragment] : null }
                lastUpdated={ lastUpdated }
                />
            })}
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}
