import React, { useState } from 'react';
import {
  Divider, Grid, Stack, Typography,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import DRSLostActionHelper from './lib/DRSLostActionHelper';

import ActionAcquisitionMethodCardComponent from '../acquisition/ActionAcquisitionMethodCardComponent';
import universalisPriceHelperInstance from '../acquisition/UniversalisPriceHelper';
import BozjaLostActionInformationComponent from './BozjaLostActionInformationComponent';

export default function BozjaLostActionHelperDataComponent({ lostAction }) {
  /**
   * Component State
   */
  const [actionPriceData, setActionPriceData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  function updateGuideState(priceData) {
    setActionPriceData(priceData);
    setLastUpdated(new Date());
  }

  // Fetch price data
  universalisPriceHelperInstance.fetchIDs([lostAction], updateGuideState);

  /**
   * Render logic
   */
  if (lostAction === '') {
    return null;
  }

  const actionData = DRSLostActionHelper.getLostActionData(lostAction);

  if (actionData === undefined) {
    return null;
  }

  const fragmentData = DRSLostActionHelper.getFragmentData(actionData.fragment);

  return (
    <Stack spacing={2} p={1} alignItems="flex-start" width={1000}>
      <Divider variant="middle" />
      <BozjaLostActionInformationComponent
        lostAction={lostAction}
        actionData={actionData}
      />
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="h6">Drops from:</Typography>
        <img
          src={`${process.env.PUBLIC_URL}/assets/icons/Yellow_Fragment.png`}
          width={24}
          height={24}
          alt="Forgotten Fragment of Care"
        />
        <Typography variant="h6">{fragmentData.name}</Typography>
      </Stack>
      <Grid
        container
        spacing={2}
      >
        {
          fragmentData.acquisition.map((i) => (
            <Grid item key={uuidv4()}>
              <ActionAcquisitionMethodCardComponent
                methodData={i}
                fragmentId={fragmentData.id}
                fragmentName={fragmentData.short}
                lastUpdated={lastUpdated}
                priceData={
                  actionPriceData && lostAction
                    ? actionPriceData[fragmentData.short]
                    : null
                }
              />
            </Grid>
          ))
        }
      </Grid>
    </Stack>
  );
}
