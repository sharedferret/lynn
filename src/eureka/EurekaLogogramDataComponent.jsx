import React from 'react';
import {
  Box, Divider, Grid, Stack, Typography,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import ActionAcquisitionMethodCardComponent from '../acquisition/ActionAcquisitionMethodCardComponent';

export default function EurekaLogogramDataComponent({
  mneme, mnemeData, logogramData, priceData,
}) {
  return (
    <Stack spacing={2} p={1} alignItems="flex-start" width={1000}>
      <Divider variant="middle" />
      <Stack direction="row" alignItems="center">
        <img
          src={`${process.env.PUBLIC_URL}/assets/logograms/${mnemeData.type}.png`}
          width={48}
          height={48}
          alt={mnemeData.type}
        />
        <Box width={12} />
        <Typography fontWeight={700} variant="h5">{mneme}</Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="h6">Drops from:</Typography>
        <img
          src={`${process.env.PUBLIC_URL}/assets/logograms/${logogramData.short}_logogram.png`}
          width={24}
          height={24}
          alt={logogramData.name}
        />
        <Typography variant="h6">{logogramData.name}</Typography>
      </Stack>
      <Grid container spacing={2}>
        {
          logogramData.acquisition.map((i) => (
            <Grid item key={uuidv4()}>
              <ActionAcquisitionMethodCardComponent
                methodData={i}
                logogramName={logogramData.name}
                fragmentId={logogramData.id}
                priceData={priceData}
              />
            </Grid>
          ))
        }
      </Grid>
    </Stack>
  );
}
