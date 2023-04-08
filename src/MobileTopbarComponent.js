import React, { Component } from 'react';

import { AppBar, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

class MobileTopbarComponent extends Component {
  render() {
    return (
      <AppBar
        position="fixed"
        sx={{
          bgcolor: 'rgb(31,41,55)',
          display: { md: 'none'}
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={this.props.handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <div className="flex items-center justify-center h-20">
            <a href="./">
              <h1 className="text-3xl text-red-200">lynn.pet!</h1>
            </a>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default MobileTopbarComponent;
