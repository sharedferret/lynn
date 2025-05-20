import React, { useState } from 'react';
import {
  Container, Divider, Grid, Paper, Stack, Typography, useTheme, alpha,
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

  const theme = useTheme();

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
    <Container maxWidth="lg" sx={{ width: '100%' }}>
      <Stack spacing={4} alignItems="flex-start" width="100%">
        <Divider sx={{ width: '50%', margin: '0 auto', mb: 3 }} />
        <BozjaLostActionInformationComponent
          lostAction={lostAction}
          actionData={actionData}
        />

        <Paper
          elevation={3}
          sx={{
            width: '100%',
            borderRadius: '12px',
            overflow: 'hidden',
            background: alpha(theme.palette.background.paper, 0.85),
            backdropFilter: 'blur(10px)',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} pt={3} pl={3} pr={3}>
            <Typography fontWeight={700} variant="h6">Appraised from</Typography>
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
            p={3}
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
        </Paper>

      </Stack>
    </Container>
  );
}
