import React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function ActionAcquisitionMethodStarMobCard({ methodData }) {
  let map = '';
  if (methodData.map === 'bsf') {
    map = 'The Bozjan Southern Front';
  } else if (methodData.map === 'zadnor') {
    map = 'Zadnor';
  }

  return (
    <Card sx={{ minWidth: 275, minHeight: 300 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/icons/staricon.png`}
            width={36}
            height={36}
            alt="Kill Star Mobs"
          />
          <Typography variant="h5">Kill Star Mobs</Typography>
        </Stack>
        <Box py={1}>
          <Divider variant="middle" />
        </Box>
        <Typography>{map}</Typography>
        <Typography>
          Zone
          {' '}
          {methodData.zone}
        </Typography>
        <Box py={1}>
          <Divider variant="middle" />
        </Box>
        {methodData.mobs.map((i) => (
          <Stack direction="row" alignItems="center" spacing={2} key={`starmob-${i}`}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/icons/rankstar.png`}
              width={24}
              height={24}
              alt="Earth Sprite"
            />
            <Typography>{i}</Typography>
          </Stack>
        ))}
      </CardContent>
    </Card>
  );
}
