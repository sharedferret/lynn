import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  Box, Card, CardContent, Divider, Stack, Typography,
} from '@mui/material';

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
        <Stack direction="row" alignItems="center" spacing={2}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/eureka/notorious_monster.png`}
            width={36}
            height={36}
            alt="Kill Mobs"
          />
          <Typography variant="h5">Notorious Monsters</Typography>
        </Stack>
        <Box py={1}>
          <Divider variant="middle" />
        </Box>
        <Typography>{map}</Typography>
        <Box py={1}>
          <Divider variant="middle" />
        </Box>
        <Stack spacing={2}>
          {methodData.fates.map((i) => (
            <Stack key={uuidv4()}>
              <Stack direction="row" alignItems="center" key={`skirmish-${i}`}>
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
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box width={6} />
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
                    <Stack direction="row" alignItems="center">
                      <Box width={48} />
                      <Typography fontStyle="italic">
                        prepped by
                        {i.spawned_by}
                      </Typography>
                    </Stack>
                  )

                  : null
              }

              {
                i.weather
                  ? (
                    <Stack direction="row" alignItems="center">
                      <Box width={48} />
                      <Typography fontStyle="italic">
                        during
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
