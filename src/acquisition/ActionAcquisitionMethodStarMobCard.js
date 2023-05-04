import React, { Component } from 'react';

import { Box, Card, CardContent, Divider, Stack, Typography } from '@mui/material';

class ActionAcquisitionMethodStarMobCard extends Component {
  render() {
    let map = '';
    if (this.props.methodData.map === 'bsf') {
      map = 'The Bozjan Southern Front';
    } else if (this.props.methodData.map === 'zadnor') {
      map = 'Zadnor';
    }

    return (
      <Card sx={{ minWidth: 275, minHeight: 300 }}>
        <CardContent>
          <Stack direction={ 'row' } alignItems={'center'} spacing={2}>
            <img src={`${process.env.PUBLIC_URL}/assets/icons/staricon.png`} width={36} height={36} alt={'Kill Star Mobs'} />
            <Typography variant='h5'>Kill Star Mobs</Typography>
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
            return <Stack direction={ 'row' } alignItems={ 'center' } spacing={ 2 } key={'starmob-' + i}>
              <img src={`${process.env.PUBLIC_URL}/assets/icons/rankstar.png`} width={24} height={24} alt={'Earth Sprite'} />
              <Typography>{ i }</Typography>
            </Stack>
          })}
        </CardContent>
      </Card>
    );
  }
}

export default ActionAcquisitionMethodStarMobCard;