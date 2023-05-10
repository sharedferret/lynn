import React from 'react';

import {
  Box, Card, CardContent, Divider, Stack, Typography,
} from '@mui/material';

export default function ActionAcquisitionMethodClusterCard({ methodData }) {
  return (
    <Card sx={{ minWidth: 275, minHeight: 300 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/icons/Bozjan_Cluster.png`}
            width={36}
            height={36}
            alt="Clusters"
          />
          <Typography variant="h5">Clusters</Typography>
        </Stack>
        <Box py={1}>
          <Divider variant="middle" />
        </Box>
        <Typography>
          Exchange
          {' '}
          {methodData.clusters}
          {' '}
          Cluster
          {methodData.clusters > 1 ? 's' : ''}
        </Typography>
        <Typography>
          for
          {' '}
          {methodData.quantity}
          {' '}
          Fragment
          {methodData.quantity > 1 ? 's' : ''}
        </Typography>
      </CardContent>
    </Card>
  );
}
