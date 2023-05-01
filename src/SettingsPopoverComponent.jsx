import React, { useCallback } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';

import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import UniversalisRegionPicker from './UniversalisRegionPicker';

export default function SettingsPopoverComponent({ setColorMode }) {
  const [open, setOpen] = React.useState(false);

  const handleSettingsButtonClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const settingsButton = (
    <Stack
      direction="row"
      m={1}
      p={1}
      spacing={1}
      alignItems="center"
      flexGrow={1}
      style={{ cursor: 'pointer' }}
      onClick={(e) => handleSettingsButtonClick(e)}
    >
      <SettingsApplicationsIcon sx={{ color: 'white' }} />
      <Box>
        <Typography color="#fff" fontWeight={600} fontSize={16}>Settings</Typography>
      </Box>
    </Stack>
  );

  const [theme, setTheme] = React.useState(localStorage.getItem('theme'));

  const handleThemeChange = useCallback((event, newTheme) => {
    if (newTheme) {
      localStorage.setItem('theme', newTheme);
      setColorMode(newTheme);
      setTheme(newTheme);
    }
  }, [localStorage, setTheme]);

  return (
    <>
      <Box flexGrow={1}>
        {settingsButton}
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <DialogContentText>Site Theme</DialogContentText>
          <ToggleButtonGroup
            value={theme}
            exclusive
            onChange={handleThemeChange}
          >
            <ToggleButton value="light">
              Light
            </ToggleButton>
            <ToggleButton value="dark">
              Dark
            </ToggleButton>
            <ToggleButton value="system">
              System
            </ToggleButton>
          </ToggleButtonGroup>
          <DialogContentText pt={2}>Universalis Region</DialogContentText>
          <UniversalisRegionPicker />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>

  );
}
