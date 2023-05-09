import React from 'react';

import { Box, Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

export default function ActionAcquisitionMethodMobCard({ methodData }) {
  function renderBozjaMobCard(map) {
    return (
      <Card sx={{ minWidth: 275, minHeight: 300 }}>
        <CardContent>
          <Stack direction={ 'row' } alignItems={'center'} spacing={2}>
            <img src={`${process.env.PUBLIC_URL}/assets/lostactions/Ranged.jpg`} width={36} height={36} alt={'Kill Mobs'} />
            <Typography variant='h5'>Kill Mobs</Typography>
          </Stack>
          <Box py={1}>
            <Divider variant='middle' />
          </Box>
          <Typography>{ map }</Typography>
          <Typography>Zone { methodData.zone }</Typography>
          <Box py={1}>
            <Divider variant='middle' />
          </Box>
          { methodData.mobs.map(i => {
            return <Stack direction={ 'row' } alignItems={ 'center' } spacing={ 2 } key={'mob-' + i}>
              <Box width={ 24 } />
              <Typography>{ i }</Typography>
            </Stack>
          })}
        </CardContent>
      </Card>
    );
  }

  function renderEurekaMobCard(map) {
    return (
      <Card sx={{ minWidth: 275, minHeight: 300 }}>
        <CardContent>
          <Stack direction={ 'row' } alignItems={'center'} spacing={2}>
            <img src={`${process.env.PUBLIC_URL}/assets/lostactions/Ranged.jpg`} width={36} height={36} alt={'Kill Mobs'} />
            <Typography variant='h5'>Kill Mobs</Typography>
          </Stack>
          <Box py={1}>
            <Divider variant='middle' />
          </Box>
          <Typography>{ map }</Typography>
          <Box py={1}>
            <Divider variant='middle' />
          </Box>
          { methodData.mobs.map(i => {
            return (
              <Stack key={ uuidv4() }>
                <Stack direction={ 'row' } alignItems={ 'center' } key={'mob-' + uuidv4()}>
                  <Typography>{ 'Lv' + i.level }</Typography>
                  <img src={`${process.env.PUBLIC_URL}/assets/eureka/eureka_${i.element}.png`} width={24} height={24} alt={i.element} />
                  {
                    i.adaptation ?
                    <Box pr={0.5}>
                      <img src={`${process.env.PUBLIC_URL}/assets/eureka/adaptation.png`} width={16} height={16} alt={'Adaptation'} />
                    </Box>
                    
                    : null
                  }
                  <Typography>{ i.mob }</Typography>
                </Stack>
                { i.weather
                  ? (
                    <Stack direction={'row'} alignItems={'center'}>
                      <Box width={ 48 } />
                      <Typography fontStyle={'italic'}>during {i.weather}</Typography>
                    </Stack>)
                  : null
                }
                
                
              </Stack>
              
            );
          })}
        </CardContent>
      </Card>
    )
  }

  /**
   * Render
   */
  if (methodData.map === 'bsf') {
    return renderBozjaMobCard('The Bozjan Southern Front');
  } else if (methodData.map === 'zadnor') {
    return renderBozjaMobCard('Zadnor');
  } else if (methodData.map === 'Pyros') {
    return renderEurekaMobCard('Eureka Pyros');
  } else if (methodData.map === 'Hydatos') {
    return renderEurekaMobCard('Eureka Hydatos');
  }

  return <Box />
}
