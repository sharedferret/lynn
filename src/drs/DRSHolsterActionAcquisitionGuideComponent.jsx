import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DRSHolsterActionAcquisitionLostActionComponent from './DRSHolsterActionAcquisitionLostActionComponent';
import DRSLostActionHelper from './lib/DRSLostActionHelper';
import universalisPriceHelperInstance from '../acquisition/UniversalisPriceHelper';

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
    updateGuideState,
  );

  return (
    <Box sx={{
      maxWidth: 1000, border: 1, borderRadius: '12px', borderColor: '#ddd',
    }}
    >
      <Stack
        spacing={2}
        sx={{
          p: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          Lost Actions Needed
        </Typography>
        <Divider />
        <Box>
          <Stack spacing={2} divider={<Divider variant="middle" />}>
            {Object.keys(neededActions).map((i) => {
              const lostActionData = DRSLostActionHelper.getLostActionData(i);
              return (
                <DRSHolsterActionAcquisitionLostActionComponent
                  key={crypto.randomUUID()}
                  action={i}
                  quantity={neededActions[i]}
                  priceData={actionPriceData && lostActionData
                    ? actionPriceData[lostActionData.fragment]
                    : null}
                  lastUpdated={lastUpdated}
                />
              );
            })}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
