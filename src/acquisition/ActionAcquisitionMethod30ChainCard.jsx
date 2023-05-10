import React from 'react';

import {
  Avatar, Box, Card, CardContent, Divider, Stack, Typography,
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';

export default function ActionAcquisitionMethod30ChainCard({ methodData }) {
  let map = '';
  if (methodData.map === 'Pyros') {
    map = 'Eureka Pyros';
  } else if (methodData.map === 'Hydatos') {
    map = 'Eureka Hydatos';
  }

  return (
    <Card sx={{ minWidth: 275, minHeight: 300 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar variant="rounded" sx={{ width: 32, height: 32 }}>
            <LinkIcon />
          </Avatar>
          <Typography variant="h5">30 Chain</Typography>
        </Stack>
        <Box py={1}>
          <Divider variant="middle" />
        </Box>
        <Typography>{map}</Typography>
        <Box py={1}>
          <Divider variant="middle" />
        </Box>
        <Typography>Achieve a 30 mob chain</Typography>
      </CardContent>
    </Card>
  );
}
