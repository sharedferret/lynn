import React, { Component } from 'react';

import { Box, Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

class ActionAcquisitionMethodMobCard extends Component {
  renderBozjaMobCard(map) {
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
          <Typography>Zone { this.props.methodData.zone }</Typography>
          <Box py={1}>
            <Divider variant='middle' />
          </Box>
          { this.props.methodData.mobs.map(i => {
            return <Stack direction={ 'row' } alignItems={ 'center' } spacing={ 2 } key={'mob-' + i}>
              <Box width={ 24 } />
              <Typography>{ i }</Typography>
            </Stack>
          })}
        </CardContent>
      </Card>
    );
  }

  renderEurekaMobCard(map) {
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
          { this.props.methodData.mobs.map(i => {
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

  render() {
    if (this.props.methodData.map === 'bsf') {
      return this.renderBozjaMobCard('The Bozjan Southern Front');
    } else if (this.props.methodData.map === 'zadnor') {
      return this.renderBozjaMobCard('Zadnor');
    } else if (this.props.methodData.map === 'Pyros') {
      return this.renderEurekaMobCard('Eureka Pyros');
    } else if (this.props.methodData.map === 'Hydatos') {
      return this.renderEurekaMobCard('Eureka Hydatos');
    }

    return <Box />
  }
}

export default ActionAcquisitionMethodMobCard;