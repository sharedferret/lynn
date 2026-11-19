import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function ActionAcquisitionMethodPurchaseCard({ priceData, fragmentId }) {
  if (!priceData) {
    return (
      <Card sx={{ minWidth: 275, minHeight: 300 }}>
        <CardContent>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: 'center',
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/icons/gil.png`}
              width={36}
              height={36}
              alt="Purchase"
            />
            <Typography variant="h5">Purchase</Typography>
          </Stack>
          <Box sx={{
            py: 1,
          }}
          >
            <Divider variant="middle" />
          </Box>
          <CircularProgress />
        </CardContent>
        <CardActions>
          <a
            href={`https://universalis.app/market/${fragmentId}`}
            target="_blank"
            rel="noreferrer"
          >
            <Button size="small">Universalis</Button>
          </a>
        </CardActions>
      </Card>
    );
  }

  return (
    <Card sx={{ minWidth: 275, minHeight: 300 }}>
      <CardContent>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: 'center',
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/icons/gil.png`}
            width={36}
            height={36}
            alt="Purchase"
          />
          <Typography variant="h5">Purchase</Typography>
        </Stack>
        <Box sx={{
          py: 1,
        }}
        >
          <Divider variant="middle" />
        </Box>
        <Typography>
          Location:
          {' '}
          {localStorage.getItem('universalisServer')}
        </Typography>
        <Typography>
          Average:
          {' '}
          {priceData.averagePrice.toLocaleString('en-us')}
          {' '}
          gil
        </Typography>
        <Box sx={{
          py: 1,
        }}
        >
          <Divider variant="middle" />
        </Box>
        <Stack sx={{
          alignItems: 'flex-start',
        }}
        >
          <Typography>Cheapest Listings:</Typography>
          {
            priceData.cheapestListings.map((i) => (
              <Typography key={crypto.randomUUID()}>
                {i.worldName}
                {' '}
                •
                {' '}
                {i.pricePerUnit.toLocaleString('en-us')}
                {' '}
                gil for
                {' '}
                {i.quantity}
              </Typography>
            ))
          }
        </Stack>
      </CardContent>
      <CardActions>
        <a
          href={`https://universalis.app/market/${fragmentId}`}
          target="_blank"
          rel="noreferrer"
        >
          <Button size="small">Universalis</Button>
        </a>
      </CardActions>
    </Card>
  );
}
