import React, { Component } from 'react';

import { Box, Button, Card, CardActions, CardContent, Divider, Stack, Typography } from '@mui/material';

class DRSLostActionAcquisitionMethodReflectCard extends Component {
  render() {
    let map = '';
    if (this.props.methodData.map === 'bsf') {
      map = 'The Bozjan Southern Front';
    } else if (this.props.methodData.map === 'zadnor') {
      map = 'Zadnor';
    }

    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Stack direction={ 'row' } alignItems={'center'} spacing={2}>
            <img src={`${process.env.PUBLIC_URL}/assets/lostactions/Lost_Reflect.jpg`} width={36} height={36} alt={'Kill Mobs'} />
            <Typography variant='h5'>Reflect</Typography>
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
            return (
              <Stack>
                <Stack direction={ 'row' } alignItems={ 'center' } spacing={ 2 }>
                  <img src={`${process.env.PUBLIC_URL}/assets/icons/${ i.icon }`} width={24} height={24} alt={'Kill Mobs'} />
                  <Typography>{ i.mob } (Rank { i.rank })</Typography>
                </Stack>
                <Stack direction={ 'row' } alignItems={ 'center' }>
                  <Box width={ 48 } />
                  <Typography fontStyle={ 'italic' }>during {i.weather}</Typography>
                </Stack>
              </Stack>
            );
          })}
        </CardContent>
        <CardActions>
          <a href={ '/forecast/' + this.props.fragmentName } target="_blank" rel="noreferrer">
            <Button size={ 'small' }>Upcoming Farm Times</Button>
          </a>
        </CardActions>
      </Card>
    );
  }
}

export default DRSLostActionAcquisitionMethodReflectCard;