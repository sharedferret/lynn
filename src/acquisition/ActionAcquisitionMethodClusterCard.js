import React, { Component } from 'react';

import { Box, Card, CardContent, Divider, Stack, Typography } from '@mui/material';

class ActionAcquisitionMethodClusterCard extends Component {
  render() {
    return (
      <Card sx={{ minWidth: 275, minHeight: 300 }}>
        <CardContent>
          <Stack direction={ 'row' } alignItems={'center'} spacing={2}>
            <img src={`${process.env.PUBLIC_URL}/assets/icons/Bozjan_Cluster.png`} width={36} height={36} alt={'Kill Mobs'} />
            <Typography variant='h5'>Clusters</Typography>
          </Stack>
          <Box py={1}>
            <Divider variant='middle' />
          </Box>
          <Typography>Exchange { this.props.methodData.clusters } Cluster{ this.props.methodData.clusters > 1 ? 's' : '' }</Typography>
          <Typography>for { this.props.methodData.quantity } Fragment{this.props.methodData.quantity > 1 ? 's' : ''}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default ActionAcquisitionMethodClusterCard;