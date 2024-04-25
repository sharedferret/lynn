import React from 'react';

import {
  AppBar, Box, IconButton, Toolbar, Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function MobileTopbarComponent({ handleDrawerToggle, host }) {
  function getSiteName() {
    if (host.indexOf('bozja.info') !== -1) {
      return 'bozja.info';
    }
    if (host.indexOf('forays.info') !== -1) {
      return 'forays.info';
    }
    return 'lynn.pet!';
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: 'rgb(31,41,55)',
        display: { md: 'none' },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Box height={80} />
        <Box>
          <a href="./">
            <Typography fontSize="30px" color="#fecaca">{getSiteName()}</Typography>
          </a>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
