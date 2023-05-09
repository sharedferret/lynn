import React from 'react';

import { Box, Card, CardContent, Divider, Stack, Typography } from '@mui/material';

export default function ActionAcquisitionMethodBoxFarmCard({ methodData }) {
  let map = '';
  if (this.props.methodData.map === 'Pyros') {
    map = 'Eureka Pyros';
  } else if (this.props.methodData.map === 'Hydatos') {
    map = 'Eureka Hydatos';
  }


  return (
    <Card sx={{ minWidth: 275, minHeight: 300 }}>
      <CardContent>
        <Stack direction={ 'row' } alignItems={'center'} spacing={2}>
          <img src={`${process.env.PUBLIC_URL}/assets/eureka/warped_box.png`} width={36} height={36} alt={'Kill Mobs'} />
          <Typography variant='h5'>Box Farm</Typography>
        </Stack>
        <Box py={1}>
          <Divider variant='middle' />
        </Box>
        <Typography>{ map }</Typography>
        <Box py={1}>
          <Divider variant='middle' />
        </Box>
        <Typography>{ this.props.methodData.item }</Typography>
      </CardContent>
    </Card>
  );
}
