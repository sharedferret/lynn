import React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function ActionAcquisitionMethodDutyCard({ methodData }) {
  return (
    <Card sx={{ minWidth: 275, minHeight: 300 }}>
      <CardContent>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: 'center',
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/${methodData.icon}`}
            width={36}
            height={36}
            alt="Duty"
          />
          <Typography variant="h5">Duty</Typography>
        </Stack>
        <Box sx={{
          py: 1,
        }}
        >
          <Divider variant="middle" />
        </Box>
        <Typography>{methodData.dutyName}</Typography>
      </CardContent>
    </Card>
  );
}
