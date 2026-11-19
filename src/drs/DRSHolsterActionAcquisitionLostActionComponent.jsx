import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DRSLostActionHelper from './lib/DRSLostActionHelper';
import ActionAcquisitionMethodCardComponent from '../acquisition/ActionAcquisitionMethodCardComponent';

export default function DRSHolsterActionAcquisitionLostActionComponent(
  { action, quantity, priceData },
) {
  const actionData = DRSLostActionHelper.getLostActionData(action);

  if (actionData === undefined) {
    return null;
  }

  const fragmentData = DRSLostActionHelper.getFragmentData(actionData.fragment);

  return (
    <Stack
      spacing={2}
      sx={{
        alignItems: 'flex-start',
        p: 2,
      }}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          {quantity}
        </Typography>
        <Box sx={{
          width: 12,
        }}
        />
        <img
          src={`${process.env.PUBLIC_URL}/assets/lostactions/${actionData.image}.jpg`}
          width={48}
          height={48}
          alt={action}
        />
        <Box sx={{
          width: 12,
        }}
        />
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
          }}
        >
          {action}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">From:</Typography>
        <img
          src={`${process.env.PUBLIC_URL}/assets/icons/Yellow_Fragment.png`}
          width={24}
          height={24}
          alt={fragmentData.name}
        />
        <Typography variant="h6">{fragmentData.name}</Typography>
      </Stack>

      <Grid
        container
        spacing={2}
      >
        {
          fragmentData.acquisition.map((i) => (
            <Grid>
              <ActionAcquisitionMethodCardComponent
                methodData={i}
                fragmentId={fragmentData.id}
                fragmentName={fragmentData.short}
                priceData={priceData}
              />
            </Grid>
          ))
        }
      </Grid>
    </Stack>
  );
}
