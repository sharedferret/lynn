import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControl, InputLabel, Grid, ListItemText, MenuItem, OutlinedInput, Paper, Select, Slider, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Typography from '@mui/material/Typography';
import WeatherFavorability from './weather-favorability';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import './ForecastOptionsSelector.css';

export default function ForecastOptionsSelectorComponent(props) {
  const default_fragment_ranking = {
    conditions: {
      'Dust Storms': 4,
      'Wind': 2,
      'Thunder': 1,
    },
    combinations: 2,
    type: 'fragment',
  };
  const default_custom_ranking = {
    conditions: {
    },
    combinations: 2,
    type: 'custom',
  };

  /**
   * Component State
   */
  const [location, setLocation] = useState(props.location);
  const [startDate, setStartDate] = useState(props.startDate);
  const [sessionLength, setSessionLength] = useState(180);
  const [searchDuration, setSearchDuration] = useState(7);
  const [ranking, setRanking] = useState(props.ranking);

  function handleLocationChange(event) {
    setLocation(event.target.value);
  }

  function handleDateChange(event) {
    setStartDate(event.toDate());
  }

  function handleSessionLengthChange(event) {
    if (event.target.value !== sessionLength) {
      setSessionLength(event.target.value);
    }
  }

  function handleSearchDurationChange(event) {
    if (event.target.value !== searchDuration) {
      setSearchDuration(event.target.value);
    }
  }

  function displaySessionLength(value) {
    return `${value} min`;
  }

  function displaySearchDuration(value) {
    return `${value} days`;
  }

  function handleRankingSelectorChange(event, value) {
    if (value === 'fragment') {
      setRanking(default_fragment_ranking);
    } else if (value === 'custom') {
      setRanking(default_custom_ranking);
    }
  }

  function handleConditionSelectorChange(event, value) {
    const new_conditions = event.target.value;
    const new_condition_rankings = {};
    for (let i = 0; i < new_conditions.length; i++) {
      new_condition_rankings[new_conditions[i]] = 2;
    }
    const new_ranking = {
      conditions: new_condition_rankings,
      combinations: ranking.combinations,
      type: ranking.type
    }

    setRanking(new_ranking);
  }

  function handleSubmitButtonPressed(event) {
    props.handleSubmit({
      location: location,
      startDate: startDate,
      sessionLength: sessionLength,
      searchDuration: searchDuration,
      ranking: ranking
    })
  }

  /**
   * Render Logic
   */
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
              value={ranking.type}
              exclusive
              onChange={handleRankingSelectorChange}
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
                value={Object.keys(ranking.conditions)}
                input={<OutlinedInput label="Conditions" />}
                renderValue={(selected) => selected.join(', ')}
                onChange={handleConditionSelectorChange}
                MenuProps={MenuProps}
                disabled={ranking.type !== 'custom'}
              >
                {weather_conditions.map((condition) => {
                  return <MenuItem key={condition} value={condition}>
                    <Checkbox checked={ranking.conditions[condition] != null} />
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
                value={location}
                label="Location"
                onChange={handleLocationChange}
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
                value={startDate}
                onChange={handleDateChange}
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
                  getAriaValueText={displaySessionLength}
                  valueLabelDisplay="auto"
                  step={15}
                  marks={sessionLengthMarks}
                  min={15}
                  max={360}
                  onChange={handleSessionLengthChange}
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
                  getAriaValueText={displaySearchDuration}
                  valueLabelDisplay="auto"
                  step={0.5}
                  marks={searchDurationMarks}
                  min={0.5}
                  max={28}
                  onChange={handleSearchDurationChange}
                />
              </Box>
            </Grid>
        </Grid>
        <Button variant='contained' onClick={handleSubmitButtonPressed}>
          Update
        </Button>
      </Paper>
    </div>
  );
}

