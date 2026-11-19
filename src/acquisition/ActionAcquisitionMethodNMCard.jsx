import React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function ActionAcquisitionMethodNMCard({ methodData }) {
  let map = '';
  if (methodData.map === 'Pyros') {
    map = 'Eureka Pyros';
  } else if (methodData.map === 'Hydatos') {
    map = 'Eureka Hydatos';
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
            src={`${process.env.PUBLIC_URL}/assets/eureka/notorious_monster.png`}
            width={36}
            height={36}
            alt="Kill Mobs"
          />
          <Typography variant="h5">Notorious Monsters</Typography>
        </Stack>
        <Box sx={{
          py: 1,
        }}
        >
          <Divider variant="middle" />
        </Box>
        <Typography>{map}</Typography>
        <Box sx={{
          py: 1,
        }}
        >
          <Divider variant="middle" />
        </Box>
        <Stack spacing={2}>
          {methodData.fates.map((i) => (
            <Stack key={crypto.randomUUID()}>
              <Stack
                direction="row"
                key={`skirmish-${i}`}
                sx={{
                  alignItems: 'center',
                }}
              >
                <Typography>
                  Lv
                  {i.level}
                </Typography>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/eureka/eureka_${i.element}.png`}
                  width={24}
                  height={24}
                  alt="Earth Sprite"
                />
                <Typography>{i.mob}</Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: 'center',
                }}
              >
                <Box sx={{
                  width: 6,
                }}
                />
                <img
                  src={`${process.env.PUBLIC_URL}/assets/eureka/notorious_monster.png`}
                  width={24}
                  height={24}
                  alt="Earth Sprite"
                />
                <Typography>{i.name}</Typography>
              </Stack>
              {
                i.spawned_by
                  ? (
                    <Stack
                      direction="row"
                      sx={{
                        alignItems: 'center',
                      }}
                    >
                      <Box sx={{
                        width: 48,
                      }}
                      />
                      <Typography sx={{
                        fontStyle: 'italic',
                      }}
                      >
                        prepped by
                        {' '}
                        {i.spawned_by}
                      </Typography>
                    </Stack>
                  )

                  : null
              }

              {
                i.weather
                  ? (
                    <Stack
                      direction="row"
                      sx={{
                        alignItems: 'center',
                      }}
                    >
                      <Box sx={{
                        width: 48,
                      }}
                      />
                      <Typography sx={{
                        fontStyle: 'italic',
                      }}
                      >
                        during
                        {' '}
                        {i.weather}
                      </Typography>
                    </Stack>
                  )
                  : null
              }
            </Stack>

          ))}
        </Stack>

      </CardContent>
    </Card>
  );
}
