import React, { Component } from 'react';
import { Container, Divider, Grid, Paper, Stack } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Typography from '@mui/material/Typography';
import WeatherConditionCardComponent from './WeatherConditionCardComponent';
import './ForecastResult.css';

class ForecastResultComponent extends Component {
  render() {
    return (
      <Paper className="WeatherForecastResultPaper" variant="outlined">
        <Stack spacing={2}>
          <Grid container spacing={2} sx={{ paddingLeft: 4, paddingTop: 2, textAlign: 'left' }}>
            <Grid item xs>
              <Typography variant="overline">
                Starting time
              </Typography>
              <Typography variant="h4">
                {this.props.data.starting_time.toLocaleString('en-US', {
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
                {this.props.data.favorability.toFixed(2)}
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
            divider={<ChevronRightIcon fontSize='large' />}
          >
            {this.props.data.conditions.map(item => (
                <WeatherConditionCardComponent data={item} />
            ))}
          </Stack>
        </Stack>
      </Paper>
    );
  }
}

export default ForecastResultComponent;