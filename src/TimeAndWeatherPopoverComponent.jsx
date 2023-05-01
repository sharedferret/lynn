import React, { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import EorzeaTime from 'eorzea-time';
import EorzeaWeather from 'eorzea-weather';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import UpcomingSpawnCalculator from './forecast/lib/UpcomingSpawnCalculator';

export default function TimeAndWeatherPopoverComponent() {
  const [open, setOpen] = React.useState(false);

  const handleTimeWidgetClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const regionsToFetchWeatherFor = [
    {
      name: 'Eureka Anemos',
      zone: EorzeaWeather.ZONE_EUREKA_ANEMOS,
    },
    {
      name: 'Eureka Pagos',
      zone: EorzeaWeather.ZONE_EUREKA_PAGOS,
    },
    {
      name: 'Eureka Pyros',
      zone: EorzeaWeather.ZONE_EUREKA_PYROS,
    },
    {
      name: 'Eureka Hydatos',
      zone: EorzeaWeather.ZONE_EUREKA_HYDATOS,
    },
    {
      name: 'The Bozjan Southern Front',
      zone: EorzeaWeather.ZONE_BOZJAN_SOUTHERN_FRONT,
    },
    {
      name: 'Zadnor',
      zone: EorzeaWeather.ZONE_ZADNOR,
    },
  ];

  const fetchWeather = (region) => {
    const currentTime = new Date();
    return UpcomingSpawnCalculator.getUpcomingWeather(3, currentTime, region);
  };

  const initialTime = new EorzeaTime(new Date());
  const initialTimeString = `${initialTime.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2 })}:${initialTime.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2 })}`;
  const [time, setTime] = useState(initialTimeString);
  function updateTime() {
    const newTime = new EorzeaTime(new Date());
    const newTimeString = `${newTime.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2 })}:${newTime.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2 })}`;
    setTime(newTimeString);
  }

  useEffect(() => {
    const interval = setInterval(updateTime.bind(this), 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const renderWeatherWidget = (name, conditions) => (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      justifyContent="center"
    >
      <Box>
        <Typography width={300}>{name}</Typography>
      </Box>
      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        alignItems="center"
      >
        {conditions.map((item, index) => (
          <Tooltip title={(
            <Stack>
              <Typography textAlign="center">
                {dayjs(item.time.getTime())
                  .format('h:mm:ss A')}
              </Typography>
              <Typography textAlign="center">
                {
                  new EorzeaTime(
                    dayjs(item.time.getTime())
                      .toDate(),
                  )
                    .getHours().toLocaleString('en-US', { minimumIntegerDigits: 2 })
                }
                :
                {
                  new EorzeaTime(
                    dayjs(item.time.getTime())
                      .toDate(),
                  )
                    .getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2 })
                }
                {' '}
                ET
              </Typography>
            </Stack>
          )}
          >
            <Stack direction="row" alignItems="center">
              <Grid
                item
                className="IconImageBox"
                key={uuidv4()}
                width={32}
              >
                <img
                  className="IconImage"
                  src={`${process.env.PUBLIC_URL}/assets/weathericons/${item.condition.replaceAll(' ', '')}.png`}
                  alt={item}
                />
              </Grid>
              {index < conditions.length - 1 ? <ChevronRightIcon fontSize="small" /> : null}
            </Stack>
          </Tooltip>
        ))}
      </Stack>
    </Stack>

  );

  const dummyFetch = fetchWeather(EorzeaWeather.ZONE_EUREKA_ANEMOS);
  const weatherTimes = [
    `${new EorzeaTime(
      dayjs(dummyFetch[0].time.getTime())
        .toDate(),
    )
      .getHours().toLocaleString('en-US', { minimumIntegerDigits: 2 })}:00`,
    `${new EorzeaTime(
      dayjs(dummyFetch[1].time.getTime())
        .toDate(),
    )
      .getHours().toLocaleString('en-US', { minimumIntegerDigits: 2 })}:00`,
    `${new EorzeaTime(
      dayjs(dummyFetch[2].time.getTime())
        .toDate(),
    )
      .getHours().toLocaleString('en-US', { minimumIntegerDigits: 2 })}:00`,
  ];

  const timeWidget = (
    <>
      <Box pr={2} style={{ cursor: 'pointer' }} onClick={(e) => handleTimeWidgetClick(e)}>
        <Typography color="#fff" fontWeight={600} fontSize={16}>{time}</Typography>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Current Time</DialogTitle>
        <DialogContent>
          <Typography fontWeight={700} fontSize={24} pl={2}>
            {time}
            {' '}
            ET
          </Typography>
        </DialogContent>
        <DialogTitle>Current Weather</DialogTitle>
        <DialogContent>
          <Stack divider={<Divider variant="middle" />} spacing={1}>
            <Stack direction="row" spacing={1}>
              <Box width={297} />
              <Typography>{weatherTimes[0]}</Typography>
              <Typography pl={1.3}>{weatherTimes[1]}</Typography>
              <Typography pl={1.3}>{weatherTimes[2]}</Typography>
            </Stack>
            {regionsToFetchWeatherFor.map(
              (region) => (
                renderWeatherWidget(region.name, fetchWeather(region.zone))
              ),
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );

  return timeWidget;
}
