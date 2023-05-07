import React, { Component } from 'react';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import ActionAcquisitionMethodCardComponent from '../acquisition/ActionAcquisitionMethodCardComponent';

class EurekaLogogramDataComponent extends Component {
  render() {
    return(
      <Stack spacing={2} p={1} alignItems={'flex-start'} width={1000}>
        <Divider variant={'middle'} />
        <Stack direction={ 'row' } alignItems={'center'}>
          <img src={`${process.env.PUBLIC_URL}/assets/logograms/${this.props.mnemeData.type}.png`} width={48} height={48} alt={'Resistance Reraiser'} />
          <Box width={ 12 } />
          <Typography fontWeight={700} variant='h5'>{ this.props.mneme }</Typography>
        </Stack>
        <Stack direction={ 'row' } alignItems={ 'center' } spacing={1}>
          <Typography variant='h6'>Drops from:</Typography>
          <img src={`${process.env.PUBLIC_URL}/assets/logograms/${this.props.logogramData.short}_logogram.png`} width={24} height={24} alt={'Forgotten Fragment of Care'} />
          <Typography variant='h6'>{ this.props.logogramData.name }</Typography>
        </Stack>
        <Grid container spacing={2}>
          {
            this.props.logogramData.acquisition.map(i => {
              return <Grid item key={ uuidv4() }>
                <ActionAcquisitionMethodCardComponent
                  methodData={i}
                  logogramName={this.props.logogramData.name}
                  fragmentId={this.props.logogramData.id}
                  priceData={this.props.priceData}
                />
              </Grid>
            })
          }
        </Grid>
      </Stack>
    );
  }
}

export default EurekaLogogramDataComponent;