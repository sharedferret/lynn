import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

export default function ActionAcquisitionMethodBunnyFateCard({ methodData }) {
  let map = '';
  if (methodData.map === 'Pyros') {
    map = 'Eureka Pyros';
  } else if (methodData.map === 'Hydatos') {
    map = 'Eureka Hydatos';
  }

  let rarity = '';
  switch (methodData.coffer_rarity) {
    case 'bronze':
      rarity = 'Bronze Coffer';
      break;
    case 'silver':
      rarity = 'Silver Coffer';
      break;
    case 'gold':
      rarity = 'Gold Coffer';
      break;
    default:
      rarity = '';
  }

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
            src={`${process.env.PUBLIC_URL}/assets/eureka/notorious_monster.png`}
            width={36}
            height={36}
            alt="Bunny Fate"
          />
          <Typography variant="h5">Bunny FATEs</Typography>
        </Stack>
        <Box sx={{
          py: 1,
        }}
        >
          <Divider variant="middle" />
        </Box>
        <Typography>{map}</Typography>
        <Box sx={{
          py: 1,
        }}
        >
          <Divider variant="middle" />
        </Box>
        <Stack
          direction="row"
          spacing={2}
          key={crypto.randomUUID()}
          sx={{
            alignItems: 'center',
          }}
        >
          <Box sx={{
            pr: 0.5,
          }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/eureka/bunny_chest_${methodData.coffer_rarity}.png`}
              width={24}
              height={24}
              alt="Coffer"
            />
          </Box>
          <Typography>{rarity}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
