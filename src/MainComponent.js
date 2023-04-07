import React, { Component } from 'react';
import SidebarComponent from './SidebarComponent';

import { Box, CssBaseline } from '@mui/material';
import MobileTopbarComponent from './MobileTopbarComponent';
import ResultsFilter from './forecast/lib/ResultsFilter';

class MainComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileOpen: false,
      forecastFilter: this.props.forecastfilter ?? ResultsFilter.ALL,
    }

    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.handleSidebarClick = this.handleSidebarClick.bind(this);
    this.handleSidebarForecastClick = this.handleSidebarForecastClick.bind(this);
  }

  handleDrawerToggle() {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }

  handleSidebarClick() {
    this.setState({
      mobileOpen: false,
    });
  }

  handleSidebarForecastClick(filter) {
    this.setState({
      forecastFilter: filter,
      mobileOpen: false,
    });

    // Reset window scroll
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }

  render() {
    return (
      <div className="App h-screen flex items-center">
        <SidebarComponent
          mobileOpen={this.state.mobileOpen}
          handleSidebarClick={this.handleSidebarClick}
          handleSidebarForecastClick={this.handleSidebarForecastClick}
          handleDrawerToggle={this.handleDrawerToggle}
          page={this.props.page}
        />
        <Box flexGrow={1} height={'100%'} sx={{width: { sm: `calc(100% - 280px)` }}}>
          <CssBaseline />
          <Box display={'flex'}>
            <MobileTopbarComponent
              handleDrawerToggle={this.handleDrawerToggle}
            />
            {React.cloneElement(this.props.component, {
              forecastFilter: this.state.forecastFilter,
              type: this.props.type,
              holster: this.props.holster
            })}
          </Box>
        </Box>
      </div>
    );
  }
}

export default MainComponent;
