import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function ActionAcquisitionMethodReflectCard({ methodData, fragmentName }) {
  function renderBozjaReflectCard(map) {
    return (
      <Card sx={{ minWidth: 275, minHeight: 300 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/lostactions/Lost_Reflect.jpg`}
              width={36}
              height={36}
              alt="Reflect"
            />
            <Typography variant="h5">Reflect</Typography>
          </Stack>
          <Box py={1}>
            <Divider variant="middle" />
          </Box>
          <Typography>{map}</Typography>
          <Typography>
            Zone
            {' '}
            {methodData.zone}
          </Typography>
          <Box py={1}>
            <Divider variant="middle" />
          </Box>
          {methodData.mobs.map((i) => (
            <Stack key={`reflect-${i.mob}`}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/icons/${i.icon}`}
                  width={24}
                  height={24}
                  alt="Sprite Type"
                />
                <img
                  src={`${process.env.PUBLIC_URL}/assets/icons/rank${i.rank}.png`}
                  width={24}
                  height={24}
                  alt="Rank"
                />
                <Typography>{i.mob}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center">
                <Box width={48} />
                <Typography fontStyle="italic">
                  during
                  {' '}
                  {i.weather}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </CardContent>
        <CardActions>
          <a href={`/forecast/${fragmentName}`} target="_blank" rel="noreferrer">
            <Button size="small">Upcoming Farm Times</Button>
          </a>
        </CardActions>
      </Card>
    );
  }

  function renderEurekaReflectCard(map) {
    return (
      <Card sx={{ minWidth: 275, minHeight: 300 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/logosactions/reflect.png`}
              width={36}
              height={36}
              alt="Kill Mobs"
            />
            <Typography variant="h5">Reflect</Typography>
          </Stack>
          <Box py={1}>
            <Divider variant="middle" />
          </Box>
          <Typography>{map}</Typography>
          <Box py={1}>
            <Divider variant="middle" />
          </Box>
          {methodData.mobs.map((i) => (
            <Stack key={`reflect-${i.mob}`}>
              <Stack direction="row" alignItems="center">
                <Typography>
                  Lv
                  {i.level}
                </Typography>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/eureka/eureka_${i.element}.png`}
                  width={24}
                  height={24}
                  alt="Element"
                />
                <Typography>{i.mob}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center">
                <Box width={48} />
                <Typography fontStyle="italic">
                  during
                  {' '}
                  {i.weather}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </CardContent>
      </Card>
    );
  }

  /**
   * Render
   */
  if (methodData.map === 'bsf') {
    return renderBozjaReflectCard('The Bozjan Southern Front');
  } if (methodData.map === 'zadnor') {
    return renderBozjaReflectCard('Zadnor');
  } if (methodData.map === 'Pyros') {
    return renderEurekaReflectCard('Eureka Pyros');
  } if (methodData.map === 'Hydatos') {
    return renderEurekaReflectCard('Eureka Hydatos');
  }

  return <Box />;
}
