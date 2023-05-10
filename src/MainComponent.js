import React from 'react';
import SidebarComponent from './SidebarComponent';

import { Box, CssBaseline } from '@mui/material';
import MobileTopbarComponent from './MobileTopbarComponent';
import ResultsFilter from './forecast/lib/ResultsFilter';
import { useState } from 'react';

export default function MainComponent(props) {
  /**
   * Component State
   */
  const [mobileOpen, setMobileOpen] = useState(false);
  const [forecastFilter, setForecastFilter] = useState(props.forecastFilter ?? ResultsFilter.ALL);
  const [timestamp, setTimestamp] = useState(new Date());

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  function handleSidebarClick() {
    setMobileOpen(false);
  }

  function handleSidebarForecastClick(filter) {
    setForecastFilter(filter);
    setMobileOpen(false);

    // Reset window scroll
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }

  /**
   * Render Logic
   */
  return (
    <div className="App h-screen flex items-center">
      <SidebarComponent
        mobileOpen={mobileOpen}
        handleSidebarClick={handleSidebarClick}
        handleSidebarForecastClick={handleSidebarForecastClick}
        handleDrawerToggle={handleDrawerToggle}
        page={props.page}
      />
      <Box flexGrow={1} height={'100%'} sx={{width: { sm: `calc(100% - 280px)` }}}>
        <CssBaseline />
        <Box display={'flex'}>
          <MobileTopbarComponent
            handleDrawerToggle={handleDrawerToggle}
          />
          {React.cloneElement(props.component, {
            forecastFilter: forecastFilter,
            type: props.type,
            holster: props.holster,
            encodedHolster: props.encodedHolster,
            lostAction: props.lostAction,
            logosAction: props.logosAction
          })}
        </Box>
      </Box>
    </div>
  );
}
