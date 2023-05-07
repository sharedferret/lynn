import React, { Component } from 'react';

import { Box, Card, CardContent, Divider, Stack, Typography } from '@mui/material';

class ActionAcquisitionMethodDutyCard extends Component {
  render() {
    return (
      <Card sx={{ minWidth: 275, minHeight: 300 }}>
        <CardContent>
          <Stack direction={ 'row' } alignItems={'center'} spacing={2}>
            <img src={`${process.env.PUBLIC_URL}/assets/${this.props.methodData.icon}`} width={36} height={36} alt={'Duty'} />
            <Typography variant='h5'>Duty</Typography>
          </Stack>
          <Box py={1}>
            <Divider variant='middle' />
          </Box>
          <Typography>{ this.props.methodData.dutyName }</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default ActionAcquisitionMethodDutyCard;