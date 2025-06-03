import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import WeatherFavorability from './weather-favorability';
import './ForecastOptionsSelector.css';

export default function ForecastOptionsSelectorComponent(
  {
    location, startDate, ranking, handleSubmit,
  },
) {
  const defaultFragmentRanking = {
    conditions: {
      'Dust Storms': 4,
      Wind: 2,
      Thunder: 1,
    },
    combinations: 2,
    type: 'fragment',
  };
  const defaultCustomRanking = {
    conditions: {
    },
    combinations: 2,
    type: 'custom',
  };

  /**
   * Component State
   */
  const [locationState, setLocationState] = useState(location);
  const [startDateState, setStartDateState] = useState(startDate);
  const [sessionLengthState, setSessionLengthState] = useState(180);
  const [searchDurationState, setSearchDurationState] = useState(7);
  const [rankingState, setRankingState] = useState(ranking);

  const handleLocationChange = useCallback((event) => {
    setLocationState(event.target.value);
  }, [setLocationState]);

  const handleDateChange = useCallback((event) => {
    setStartDateState(event.toDate());
  }, [setStartDateState]);

  const handleSessionLengthChange = useCallback((event) => {
    if (event.target.value !== sessionLengthState) {
      setSessionLengthState(event.target.value);
    }
  }, [sessionLengthState, setSessionLengthState]);

  const handleSearchDurationChange = useCallback((event) => {
    if (event.target.value !== searchDurationState) {
      setSearchDurationState(event.target.value);
    }
  }, [searchDurationState, setSearchDurationState]);

  const displaySessionLength = useCallback((value) => `${value} min`);
  const displaySearchDuration = useCallback((value) => `${value} days`);

  const handleRankingSelectorChange = useCallback((event, value) => {
    if (value === 'fragment') {
      setRankingState(defaultFragmentRanking);
    } else if (value === 'custom') {
      setRankingState(defaultCustomRanking);
    }
  }, [defaultCustomRanking, defaultFragmentRanking, setRankingState]);

  const handleConditionSelectorChange = useCallback((event) => {
    const newConditions = event.target.value;
    const newConditionRankings = {};
    for (let i = 0; i < newConditions.length; i += 1) {
      newConditionRankings[newConditions[i]] = 2;
    }
    const newRanking = {
      conditions: newConditionRankings,
      combinations: rankingState.combinations,
      type: rankingState.type,
    };

    setRankingState(newRanking);
  }, [rankingState, setRankingState]);

  const handleSubmitButtonPressed = useCallback(() => {
    handleSubmit({
      locationState,
      startDateState,
      sessionLengthState,
      searchDurationState,
      rankingState,
    });
  }, [handleSubmit,
    locationState,
    startDateState,
    sessionLengthState,
    searchDurationState,
    rankingState]);

  /**
   * Render Logic
   */
  const sessionLengthMarks = [
    {
      value: 60,
      label: '1h',
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
      label: '1d',
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

  const weatherConditions = [
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
    'Wind',
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

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <div className="ForecastOptionsSelector">
      <Paper className="ForecastOptionsPaper" elevation={1}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={4} sx={{ p: 4 }}>
            <ToggleButtonGroup
              color="primary"
              value={rankingState.type}
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
                value={Object.keys(rankingState.conditions)}
                input={<OutlinedInput label="Conditions" />}
                renderValue={(selected) => selected.join(', ')}
                onChange={handleConditionSelectorChange}
                MenuProps={MenuProps}
                disabled={rankingState.type !== 'custom'}
              >
                {weatherConditions.map((condition) => (
                  <MenuItem key={condition} value={condition}>
                    <Checkbox checked={rankingState.conditions[condition] != null} />
                    <ListItemText primary={condition} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={4} sx={{ p: 4 }}>
            <FormControl>
              <InputLabel id="forecast-location-select-label">Location</InputLabel>
              <Select
                labelId="forecast-location-select-label"
                id="forecast-location-select"
                value={locationState}
                label="Location"
                onChange={handleLocationChange}
              >
                {Object.keys(WeatherFavorability.ZoneMapping).map(
                  (key) => (
                    <MenuItem
                      key={key}
                      value={key}
                    >
                      {WeatherFavorability.ZoneMapping[key]}
                    </MenuItem>
                  ),
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4} sx={{ p: 4 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start date"
                value={startDateState}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={4} sx={{ p: 4 }}>
            <Box>
              <Typography gutterBottom>
                Session length
              </Typography>
              <Slider
                aria-label="Session length"
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
                aria-label="Search duration"
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
        <Button variant="contained" onClick={handleSubmitButtonPressed}>
          Update
        </Button>
      </Paper>
    </div>
  );
}
