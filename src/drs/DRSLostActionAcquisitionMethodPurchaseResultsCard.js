import React, { Component } from 'react';

import { Box, Button, Card, CardActions, CardContent, CircularProgress, Divider, Stack, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

class DRSLostActionAcquisitionMethodPurchaseResultsCard extends Component {

  render() {
    if (!this.props.priceData) {
      return (
        <Card sx={{ minWidth: 275, minHeight: 300 }}>
          <CardContent>
            <Stack direction={ 'row' } alignItems={'center'} spacing={2}>
              <img src={`${process.env.PUBLIC_URL}/assets/icons/gil.png`} width={36} height={36} alt={'Purchase'} />
              <Typography variant='h5'>Purchase</Typography>
            </Stack>
            <Box py={1}>
              <Divider variant='middle' />
            </Box>
            <CircularProgress />
          </CardContent>
          <CardActions>
            <a href={ 'https://universalis.app/market/' + this.props.id } target="_blank" rel="noreferrer">
              <Button size={ 'small' }>Universalis</Button>
            </a>
          </CardActions>
        </Card>
      )
    }

    return (
      <Card sx={{ minWidth: 275, minHeight: 300 }}>
        <CardContent>
          <Stack direction={ 'row' } alignItems={'center'} spacing={2}>
            <img src={`${process.env.PUBLIC_URL}/assets/icons/gil.png`} width={36} height={36} alt={'Purchase'} />
            <Typography variant='h5'>Purchase</Typography>
          </Stack>
          <Box py={1}>
            <Divider variant='middle' />
          </Box>
          <Typography>Average: { this.props.priceData.averagePrice.toLocaleString('en-us') } gil</Typography>
          <Box py={1}>
            <Divider variant='middle' />
          </Box>
            <Stack alignItems={'flex-start'}>
            <Typography>Cheapest Listings:</Typography>
            {
              this.props.priceData.cheapestListings.map(i => {
                return (
                  <Typography key={ uuidv4() }>{ i.worldName }  • { i.pricePerUnit.toLocaleString('en-us') } gil for {i.quantity}</Typography>
                )
              })
            }
          </Stack>
        </CardContent>
        <CardActions>
          <a href={ 'https://universalis.app/market/' + this.props.id } target="_blank" rel="noreferrer">
            <Button size={ 'small' }>Universalis</Button>
          </a>
        </CardActions>
      </Card>
    );
  }
}

export default DRSLostActionAcquisitionMethodPurchaseResultsCard;