import { Box, Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

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
        <Stack direction={ 'row' } alignItems={'center'} spacing={2}>
          <img src={`${process.env.PUBLIC_URL}/assets/eureka/notorious_monster.png`} width={36} height={36} alt={'Kill Mobs'} />
          <Typography variant='h5'>Bunny FATEs</Typography>
        </Stack>
        <Box py={1}>
          <Divider variant='middle' />
        </Box>
        <Typography>{ map }</Typography>
        <Box py={1}>
          <Divider variant='middle' />
        </Box>
        <Stack direction={ 'row '} alignItems={ 'center' } spacing={ 2 } key={ uuidv4() }>
          <Box pr={0.5}>
            <img src={`${process.env.PUBLIC_URL}/assets/eureka/bunny_chest_${ methodData.coffer_rarity }.png`} width={24} height={24} alt={'Coffer'} />
          </Box>
          <Typography>{ rarity }</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
