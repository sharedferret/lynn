import React, { useCallback, useState } from 'react';
import { Box, CssBaseline, Stack } from '@mui/material';
import SidebarComponent from './SidebarComponent';

import MobileTopbarComponent from './MobileTopbarComponent';
import ResultsFilter from './forecast/lib/ResultsFilter';
import FooterComponent from './FooterComponent';

export default function MainComponent({
  forecastFilter,
  component,
  page,
  type,
  holster,
  encodedHolster,
  lostAction,
  logosAction,
  mapId,
  colorModeContext,
}) {
  /**
   * Component State
   */
  const [mobileOpen, setMobileOpen] = useState(false);
  const [forecastFilterState, setForecastFilterState] = useState(
    forecastFilter ?? ResultsFilter.ALL,
  );
  const [resetTimer, setResetTimer] = useState(new Date().getTime());

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen, setMobileOpen]);

  const handleSidebarClick = useCallback(() => {
    setMobileOpen(false);
    setResetTimer(new Date().getTime());

    // Reset window scroll
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [setMobileOpen, setResetTimer]);

  const handleSidebarForecastClick = useCallback((filter) => {
    setForecastFilterState(filter);
    setMobileOpen(false);

    // Reset window scroll
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [window, setForecastFilterState, setMobileOpen]);

  const passedFilter = forecastFilterState ?? forecastFilter;
  const host = window.location.hostname;

  /**
   * Render Logic
   */
  return (
    <Stack direction="row" alignItems="center" sx={{ textAlign: 'center' }}>
      <SidebarComponent
        mobileOpen={mobileOpen}
        handleSidebarClick={handleSidebarClick}
        handleSidebarForecastClick={handleSidebarForecastClick}
        handleDrawerToggle={handleDrawerToggle}
        colorModeContext={colorModeContext}
        page={page}
        host={host}
      />
      <Box
        flexGrow={1}
        height="100%"
        sx={{
          width: {
            sm: 'calc(100% - 280px)',
          },
        }}
      >
        <Stack>
          <CssBaseline />
          <Box display="flex">
            <MobileTopbarComponent
              handleDrawerToggle={handleDrawerToggle}
              host={host}
            />
            {React.cloneElement(component, {
              passedFilter,
              type,
              holster,
              encodedHolster,
              lostAction,
              logosAction,
              mapId,
              resetTimer,
            })}

          </Box>
          { (page !== 'map' && page !== 'portals') ? <FooterComponent /> : null}
        </Stack>
      </Box>
    </Stack>
  );
}
