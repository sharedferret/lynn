import React, { Component } from 'react';
import { Container, Grid, Stack } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HistoryIcon from '@mui/icons-material/History';
import Typography from '@mui/material/Typography';
import WeatherFavorability from './weather-favorability';

class ForecastResultsHeaderComponent extends Component {
  render() {
    return (
      <Stack spacing={1}>
        <Container sx={{ paddingTop: '16px', paddingBottom: '12px' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Results
          </Typography>
        </Container>
        <Grid container spacing={0}>
          <Grid item xs>
            <Typography variant="overline">
              Location
            </Typography>
            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
              <LocationOnIcon />
              <Typography>
                {WeatherFavorability.ZoneMapping[this.props.location]}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs>
            <Typography variant="overline">
              Session length
            </Typography>
            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
              <AvTimerIcon />
              <Typography>
                {this.props.sessionLength} minutes
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs>
            <Typography variant="overline">
              Search duration
            </Typography>
            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
              <HistoryIcon />
              <Typography>
                {this.props.searchDuration} days
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs>
            <Typography variant="overline">
              Start Time
            </Typography>
            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
              <AccessTimeIcon />
              <Typography>
                {this.props.startTime.toLocaleString('en-US', {
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  timeZoneName: 'short',
                })}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    );
  };
}

export default ForecastResultsHeaderComponent;