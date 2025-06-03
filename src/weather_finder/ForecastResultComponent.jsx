import React from 'react';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { v4 as uuidv4 } from 'uuid';
import WeatherConditionCardComponent from './WeatherConditionCardComponent';
import './ForecastResult.css';

export default function ForecastResultComponent({ data }) {
  return (
    <Paper className="WeatherForecastResultPaper" variant="outlined">
      <Stack spacing={2}>
        <Grid container spacing={2} sx={{ paddingLeft: 4, paddingTop: 2, textAlign: 'left' }}>
          <Grid item xs>
            <Typography variant="overline">
              Starting time
            </Typography>
            <Typography variant="h4">
              {data.startingTime.toLocaleString('en-US', {
                weekday: 'long',
                day: 'numeric',
                month: 'short',
                hour: 'numeric',
                minute: 'numeric',
                timeZoneName: 'short',
              })}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="overline">
              Score
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {data.favorability.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
        <Container>
          <Divider variant="middle" />
        </Container>

        <Stack
          className="WeatherConditionsContainer"
          direction="row"
          spacing={2}
          divider={<ChevronRightIcon fontSize="large" />}
        >
          {data.conditions.map((item) => (
            <WeatherConditionCardComponent data={item} key={`condition-${uuidv4()}`} />
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
}
