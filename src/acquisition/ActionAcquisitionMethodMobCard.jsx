import React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function ActionAcquisitionMethodMobCard({ methodData }) {
  function renderBozjaMobCard(map) {
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
              src={`${process.env.PUBLIC_URL}/assets/lostactions/Ranged.jpg`}
              width={36}
              height={36}
              alt="Kill Mobs"
            />
            <Typography variant="h5">Kill Mobs</Typography>
          </Stack>
          <Box sx={{
            py: 1,
          }}
          >
            <Divider variant="middle" />
          </Box>
          <Typography>{map}</Typography>
          <Typography>
            Zone
            {' '}
            {methodData.zone}
          </Typography>
          <Box sx={{
            py: 1,
          }}
          >
            <Divider variant="middle" />
          </Box>
          {methodData.mobs.map((i) => (
            <Stack
              direction="row"
              spacing={2}
              key={`mob-${i}`}
              sx={{
                alignItems: 'center',
              }}
            >
              <Box sx={{
                width: 24,
              }}
              />
              <Typography>{i}</Typography>
            </Stack>
          ))}
        </CardContent>
      </Card>
    );
  }

  function renderEurekaMobCard(map) {
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
              src={`${process.env.PUBLIC_URL}/assets/lostactions/Ranged.jpg`}
              width={36}
              height={36}
              alt="Kill Mobs"
            />
            <Typography variant="h5">Kill Mobs</Typography>
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
          {methodData.mobs.map((i) => (
            <Stack key={crypto.randomUUID()}>
              <Stack
                direction="row"
                key={`mob-${crypto.randomUUID()}`}
                sx={{
                  alignItems: 'center',
                }}
              >
                <Typography>{`Lv${i.level}`}</Typography>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/eureka/eureka_${i.element}.png`}
                  width={24}
                  height={24}
                  alt={i.element}
                />
                {
                  i.adaptation
                    ? (
                      <Box sx={{
                        pr: 0.5,
                      }}
                      >
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/eureka/adaptation.png`}
                          width={16}
                          height={16}
                          alt="Adaptation"
                        />
                      </Box>
                    )

                    : null
                }
                <Typography>{i.mob}</Typography>
              </Stack>
              {i.weather
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
                : null}

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
    return renderBozjaMobCard('The Bozjan Southern Front');
  } if (methodData.map === 'zadnor') {
    return renderBozjaMobCard('Zadnor');
  } if (methodData.map === 'Pyros') {
    return renderEurekaMobCard('Eureka Pyros');
  } if (methodData.map === 'Hydatos') {
    return renderEurekaMobCard('Eureka Hydatos');
  }

  return <Box />;
}
