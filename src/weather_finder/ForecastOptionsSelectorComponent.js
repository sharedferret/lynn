import React, { Component } from 'react';
import { Box, Button, Checkbox, FormControl, InputLabel, Grid, ListItemText, MenuItem, OutlinedInput, Paper, Select, Slider, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Typography from '@mui/material/Typography';
import WeatherFavorability from './weather-favorability';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import './ForecastOptionsSelector.css';

class ForecastOptionsSelectorComponent extends Component {
  default_fragment_ranking = {
    conditions: {
      'Dust Storms': 4,
      'Wind': 2,
      'Thunder': 1,
    },
    combinations: 2,
    type: 'fragment',
  };
  default_custom_ranking = {
    conditions: {
    },
    combinations: 2,
    type: 'custom',
  };

  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      start_date: props.startDate,
      session_length: 180,
      search_duration: 7,
      ranking: props.ranking,
    };

    this.handleSubmit = props.handleSubmit;

    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSessionLengthChange = this.handleSessionLengthChange.bind(this);
    this.handleSearchDurationChange = this.handleSearchDurationChange.bind(this);
    this.handleSubmitButtonPressed = this.handleSubmitButtonPressed.bind(this);
    this.handleRankingSelectorChange = this.handleRankingSelectorChange.bind(this);
    this.handleConditionSelectorChange = this.handleConditionSelectorChange.bind(this);
  }

  handleLocationChange(event) {
    console.log('e', event);
    this.setState({ location: event.target.value })
    console.log('state', this.state);
  }

  handleDateChange(event) {
    console.log('d', event.toDate());
    this.setState({ start_date: event.toDate() });
    console.log(this.state.start_date);
  }

  handleSessionLengthChange(event) {
    if (event.target.value !== this.state.session_length) {
      this.setState({ session_length: event.target.value });
    }
  }

  handleSearchDurationChange(event) {
    if (event.target.value !== this.state.search_duration) {
      this.setState({ search_duration: event.target.value });
    }
  }

  displaySessionLength(value) {
    return `${value} min`;
  }

  displaySearchDuration(value) {
    return `${value} days`;
  }

  handleRankingSelectorChange(event, value) {
    if (value === 'fragment') {
      this.setState({ ranking: this.default_fragment_ranking })
    } else if (value === 'custom') {
      this.setState({ ranking: this.default_custom_ranking })
    }
  }

  handleConditionSelectorChange(event, value) {
    const new_conditions = event.target.value;
    const new_condition_rankings = {};
    for (let i = 0; i < new_conditions.length; i++) {
      new_condition_rankings[new_conditions[i]] = 2;
    }
    const new_ranking = this.state.ranking;
    new_ranking.conditions = new_condition_rankings;
    
    this.setState({ ranking: new_ranking });
  }

  handleSubmitButtonPressed(event) {
    this.handleSubmit(this.state);
  }

  render() {
    const sessionLengthMarks = [
      {
        value: 60,
        label: '1h'
      },
      {
        value: 120,
        label: '2h',
      },
      {
        value: 180,
        label: '3h',
      },
      {
        value: 240,
        label: '4h',
      },
      {
        value: 300,
        label: '5h',
      },
      {
        value: 360,
        label: '6h',
      },
    ];

    const searchDurationMarks = [
      {
        value: 1,
        label: '1d'
      },
      {
        value: 3,
        label: '3d',
      },
      {
        value: 7,
        label: '1w',
      },
      {
        value: 14,
        label: '2w',
      },
      {
        value: 28,
        label: '4w',
      },
    ];

    const weather_conditions = [
      'Astromagnetic Storm',
      'Blizzards',
      'Clear Skies',
      'Clouds',
      'Dust Storms',
      'Fair Skies',
      'Fog',
      'Gales',
      'Gloom',
      'Heat Waves',
      'Moon Dust',
      'Rain',
      'Showers',
      'Snow',
      'Thunder',
      'Thunderstorms',
      'Umbral Static',
      'Umbral Wind',
      'Wind'
    ];

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 7.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };

    return (
      <div className="ForecastOptionsSelector">
        <Paper className="ForecastOptionsPaper" elevation={1}>
          <Grid container spacing={2} justifyContent='center'>
            <Grid item xs={4} sx={{ p: 4 }}>
              <ToggleButtonGroup
                color="primary"
                value={this.state.ranking.type}
                exclusive
                onChange={this.handleRankingSelectorChange}
              >
                <ToggleButton value="fragment">Fragment Farming</ToggleButton>
                <ToggleButton value="custom">Select Conditions</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={4} sx={{ p: 4 }}>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="forecast-weather-condition-select-label">Conditions</InputLabel>
                <Select
                  labelId="forecast-weather-condition-select-label"
                  id="forecast-weather-condition-select"
                  multiple
                  value={Object.keys(this.state.ranking.conditions)}
                  input={<OutlinedInput label="Conditions" />}
                  renderValue={(selected) => selected.join(', ')}
                  onChange={this.handleConditionSelectorChange}
                  MenuProps={MenuProps}
                  disabled={this.state.ranking.type !== 'custom'}
                >
                  {weather_conditions.map((condition) => {
                    return <MenuItem key={condition} value={condition}>
                      <Checkbox checked={this.state.ranking.conditions[condition] != null} />
                      <ListItemText primary={condition} />
                    </MenuItem>
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2} justifyContent='center'>
            <Grid item xs={4} sx={{ p: 4 }}>
              <FormControl>
                <InputLabel id="forecast-location-select-label">Location</InputLabel>
                <Select
                  labelId="forecast-location-select-label"
                  id="forecast-location-select"
                  value={this.state.location}
                  label="Location"
                  onChange={this.handleLocationChange}
                >
                  {Object.keys(WeatherFavorability.ZoneMapping).map(key => {
                    return <MenuItem key={key} value={key}>{WeatherFavorability.ZoneMapping[key]}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4} sx={{ p: 4 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker 
                  label='Start date'
                  value={this.state.start_date}
                  onChange={this.handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>

          <Grid container spacing={2} justifyContent='center'>
            <Grid item xs={4} sx={{ p: 4 }}>
                <Box>
                  <Typography gutterBottom>
                    Session length
                  </Typography>
                  <Slider
                    aria-label='Session length'
                    defaultValue={180}
                    getAriaValueText={this.updateSessionLength}
                    valueLabelDisplay="auto"
                    step={15}
                    marks={sessionLengthMarks}
                    min={15}
                    max={360}
                    onChange={this.handleSessionLengthChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={4} sx={{ p: 4 }}>
                <Box>
                  <Typography gutterBottom>
                    Search duration
                  </Typography>
                  <Slider
                    aria-label='Search duration'
                    defaultValue={7}
                    getAriaValueText={this.updateSearchDuration}
                    valueLabelDisplay="auto"
                    step={0.5}
                    marks={searchDurationMarks}
                    min={0.5}
                    max={28}
                    onChange={this.handleSearchDurationChange}
                  />
                </Box>
              </Grid>
          </Grid>
          <Button variant='contained' onClick={this.handleSubmitButtonPressed}>
            Update
          </Button>
        </Paper>
      </div>
    );
  };
}

export default ForecastOptionsSelectorComponent;
