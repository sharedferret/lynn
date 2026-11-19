import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ActionAcquisitionMethodCardComponent from '../acquisition/ActionAcquisitionMethodCardComponent';

export default function EurekaLogogramDataComponent({
  mneme, mnemeData, logogramData, priceData,
}) {
  return (
    <Stack
      spacing={2}
      sx={{
        p: 1,
        alignItems: 'flex-start',
        width: 1000,
      }}
    >
      <Divider variant="middle" />
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/assets/logograms/${mnemeData.type}.png`}
          width={48}
          height={48}
          alt={mnemeData.type}
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
          {mneme}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: 'center',
        }}
      >
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
            <Grid key={crypto.randomUUID()}>
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
