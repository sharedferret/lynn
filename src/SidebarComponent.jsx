import React, { useCallback } from 'react';
import {
  Box, Divider, Drawer, IconButton, List, Stack,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars-2';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ColorModeContext } from './App';
import ResultsFilter from './forecast/lib/ResultsFilter';

function SidebarComponent({
  filter,
  page,
  mobileOpen,
  handleDrawerToggle,
  handleSidebarClick,
  handleSidebarForecastClick,
  window,
}) {
  const navigate = useNavigate();

  const drawerWidth = 280;

  const handleSidebarClickFromSidebar = useCallback((event, item) => {
    navigate(`/${item}`);
    handleSidebarClick();
  }, [navigate, handleSidebarClick]);

  const handleSidebarForecastClickFromSidebar = useCallback((event, forecastFilter) => {
    navigate(`/forecast/${forecastFilter.uri}`);
    handleSidebarForecastClick(forecastFilter);
  }, [navigate, handleSidebarForecastClick]);

  const handleDarkModeClick = useCallback((event, colorMode) => {
    colorMode.toggleColorMode();
    handleSidebarClick();
  }, [handleSidebarClick]);

  /**
   * eureka/loadout: Loadout Creator
   * eureka/logos: Logos Action Helper
   */

  const mainSidebarContent = (
    <List className="flex flex-col py-4 overflow-x-hidden">
      <li className="flex flex-row items-center h-12">
        <Box className="h-6 w-6" />
        <span className="text-md uppercase font-semibold text-white">Eureka and BA</span>
      </li>
      <li>
        <div
          onClick={(e) => { handleSidebarClickFromSidebar(e, 'ba'); }}
          style={{ cursor: 'pointer' }}
          className="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100"
        >
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300">
            <i className="bx bx-home" />
          </span>
          <span className="text-md font-medium">BA Loadouts</span>
        </div>
      </li>
      <li>
        <div
          onClick={(e) => { handleSidebarClickFromSidebar(e, 'portals'); }}
          style={{ cursor: 'pointer' }}
          className="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100"
        >
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300">
            <i className="bx bx-home" />

          </span>
          <span className="text-md font-medium">BA Portal Map</span>
        </div>
      </li>
      <li>
        <div
          onClick={(e) => { handleSidebarClickFromSidebar(e, 'eureka/logos'); }}
          style={{ cursor: 'pointer' }}
          className="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100"
        >
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300">
            <i className="bx bx-home" />

          </span>
          <span className="text-md font-medium">Logos Action Helper</span>
        </div>
      </li>
      <li>
        <div
          onClick={(e) => handleSidebarForecastClickFromSidebar(e, ResultsFilter.EUREKA_NMS)}
          style={{ cursor: 'pointer' }}
          className="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100"
        >
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300">
            <i className="bx bx-home" />

          </span>
          <span className="text-md font-medium">NM Spawn Times</span>
        </div>
      </li>

      <li className="flex flex-row items-center h-12">
        <Box className="h-6 w-6" />
        <span className="text-md uppercase font-semibold text-white">Bozja and DRS</span>
      </li>
      <li>
        <a href="/drs/holster">
          <div
            style={{ cursor: 'pointer' }}
            className="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100"
          >
            <span
              className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300"
            >
              <i className="bx bx-home" />

            </span>
            <span className="text-md font-medium">DRS Holsters</span>
          </div>
        </a>
      </li>
      <li>
        <a href="/drs/holster/c">
          <div
            style={{ cursor: 'pointer' }}
            className="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100"
          >
            <span
              className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300"
            >
              <i className="bx bx-home" />

            </span>
            <span className="text-md font-medium">Holster Creator</span>
          </div>
        </a>
      </li>
      <li>
        <div
          onClick={(e) => { handleSidebarClickFromSidebar(e, 'bozja/lostaction'); }}
          style={{ cursor: 'pointer' }}
          className="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100"
        >
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300">
            <i className="bx bx-home" />

          </span>
          <span className="text-md font-medium">Lost Action Helper</span>
        </div>
      </li>
      <li>
        <div
          onClick={(e) => handleSidebarForecastClickFromSidebar(e, ResultsFilter.FRAGMENT_FARM)}
          style={{ cursor: 'pointer' }}
          className="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100"
        >
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300">
            <i className="bx bx-home" />

          </span>
          <span className="text-md font-medium">Fragment Farm Times</span>
        </div>
      </li>

      <li className="flex flex-row items-center h-12">
        <Box className="h-6 w-6" />
        <span className="text-md uppercase font-semibold text-white">Forays</span>
      </li>
      <li>
        <div
          onClick={(e) => handleSidebarForecastClickFromSidebar(e, ResultsFilter.ALL)}
          style={{ cursor: 'pointer' }}
          className="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100"
        >
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300">
            <i className="bx bx-home" />

          </span>
          <span className="text-md font-medium">Expeditionary Forecast</span>
        </div>
      </li>
      <li>
        <div
          onClick={(e) => { handleSidebarClickFromSidebar(e, 'weather-finder'); }}
          style={{ cursor: 'pointer' }}
          className="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100"
        >
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300">
            <i className="bx bx-home" />

          </span>
          <span className="text-md font-medium">Advanced Weather Finder</span>
        </div>
      </li>

      <li className="flex flex-row items-center h-12">
        <Box className="h-6 w-6" />
        <span className="text-md uppercase font-semibold text-white">About</span>
      </li>
      <li>
        <div
          onClick={(e) => { handleSidebarClickFromSidebar(e, '#'); }}
          style={{ cursor: 'pointer' }}
          className="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100"
        >
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300">
            <i className="bx bx-home" />

          </span>
          <span className="text-md font-medium">Lynn Kaneko @ Exodus</span>
        </div>
      </li>
    </List>
  );

  const forecastSidebarComponent = (
    <List className="flex flex-col py-4 overflow-x-hidden">
      <li>
        <div
          onClick={(e) => { handleSidebarClickFromSidebar(e, ''); }}
          style={{ cursor: 'pointer' }}
          className="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100"
        >
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300">
            <ArrowBackIcon />
          </span>
          <span className="text-md font-medium">Home</span>
        </div>
      </li>

      <li className="flex flex-row items-center h-12">
        <Box className="h-6 w-6" />
        <span className="text-md uppercase font-semibold text-white">All</span>
      </li>
      {[
        ResultsFilter.ALL,
      ].map((resultsfilter) => (
        <li key={resultsfilter.name}>
          <div
            onClick={(e) => { handleSidebarForecastClickFromSidebar(e, resultsfilter); }}
            style={{ cursor: 'pointer' }}
            className="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100"
          >
            <span
              className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300"
            >
              <i className="bx bx-home" />

            </span>
            <span className="text-md font-medium">{resultsfilter.name}</span>
          </div>
        </li>
      ))}

      <li className="flex flex-row items-center h-12">
        <Box className="h-6 w-6" />
        <span className="text-md uppercase font-semibold text-white">Eureka NMs</span>
      </li>
      {[
        ResultsFilter.EUREKA_NMS,
        ResultsFilter.COPYCAT_CASSIE,
        ResultsFilter.KING_ARTHO,
        ResultsFilter.SKOLL,
        ResultsFilter.PAZUZU,
        ResultsFilter.PENTHESILEA,
      ].map((resultsfilter) => (
        <li key={resultsfilter.name}>
          <div
            onClick={(e) => handleSidebarForecastClickFromSidebar(e, resultsfilter)}
            selected={filter === resultsfilter}
            style={{ cursor: 'pointer' }}
            className="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100"
          >
            <span
              className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300"
            >
              {resultsfilter.collection === false
                ? (
                  <Box sx={{ width: '24px', height: '24px' }}>
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/nms/${resultsfilter.image}`}
                      style={{ width: '100%', objectFit: 'scale-down' }}
                      alt={resultsfilter.name}
                    />
                  </Box>
                )
                : null}
            </span>
            <span className="text-md font-medium">{resultsfilter.name}</span>
          </div>
        </li>
      ))}

      <li className="flex flex-row items-center h-12">
        <Box className="h-6 w-6" />
        <span className="text-md uppercase font-semibold text-white">Eureka Farms</span>
      </li>
      {[
        ResultsFilter.EUREKA_FARMS,
        ResultsFilter.COLD_WARPED_LOCKBOX,
        ResultsFilter.HEAT_WARPED_LOCKBOX,
        ResultsFilter.OFFENSIVE_LOGOGRAM,
      ].map((resultsfilter) => (
        <li key={resultsfilter.name}>
          <div
            onClick={(e) => handleSidebarForecastClickFromSidebar(e, resultsfilter)}
            selected={filter === resultsfilter}
            style={{ cursor: 'pointer' }}
            className="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100"
          >
            <span
              className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300"
            >
              {resultsfilter.collection === false
                ? (
                  <Box sx={{ width: '24px', height: '24px' }}>
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/nms/${resultsfilter.image}`}
                      style={{ width: '100%', objectFit: 'scale-down' }}
                      alt={resultsfilter.name}
                    />
                  </Box>
                )
                : null}
            </span>
            <span className="text-md font-medium">{resultsfilter.name}</span>
          </div>
        </li>
      ))}

      <li className="flex flex-row items-center h-12">
        <Box className="h-6 w-6" />
        <span className="text-md uppercase font-semibold text-white">Bozja Fragment Farms</span>
      </li>
      {[
        ResultsFilter.FRAGMENT_FARM,
        ResultsFilter.PREPARATION_FRAGMENT,
        ResultsFilter.CARE_FRAGMENT,
        ResultsFilter.SUPPORT_FRAGMENT,
        ResultsFilter.HISTORY_FRAGMENT,
        ResultsFilter.ARTISTRY_FRAGMENT,
      ].map((resultsfilter) => (
        <li key={resultsfilter.name}>
          <div
            onClick={(e) => handleSidebarForecastClickFromSidebar(e, resultsfilter)}
            selected={filter === resultsfilter}
            style={{ cursor: 'pointer' }}
            className="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100"
          >
            <span
              className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300"
            >
              {resultsfilter.collection === false
                ? (
                  <Box sx={{ width: '24px', height: '24px' }}>
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/nms/${resultsfilter.image}`}
                      style={{ width: '100%', objectFit: 'scale-down' }}
                      alt={resultsfilter.name}
                    />
                  </Box>
                )
                : null}
            </span>
            <span className="text-md font-medium">{resultsfilter.name}</span>
          </div>
        </li>
      ))}
    </List>
  );

  const drawer = (
    <div className="flex flex-col">
      {page === 'forecast' ? forecastSidebarComponent : mainSidebarContent}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="folders"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        PaperProps={{
          style: {
            backgroundColor: 'rgb(31,41,55)',
          },
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Stack width="100%" height="100%">
          <div
            className="flex items-center justify-center h-20"
            onClick={(e) => handleSidebarClickFromSidebar(e, '')}
            style={{ cursor: 'pointer' }}
          >
            <h1 className="text-3xl text-red-200">lynn.pet!</h1>
          </div>
          <Divider variant="middle" light sx={{ bgcolor: '#999', mb: 1 }} />
          <Box flexGrow={1}>
            <Scrollbars universal>
              {drawer}
            </Scrollbars>
          </Box>
          <Box>
            <Stack width="100%" height="100%">
              <Divider variant="middle" light sx={{ bgcolor: '#999', mt: 1 }} />
              <Stack direction="row" flexGrow={1}>
                <Box flexGrow={1} />
                <IconButton
                  sx={{ m: 1 }}
                  onClick={(e) => handleDarkModeClick(e, colorMode)}
                  color="inherit"
                >
                  {theme.palette.mode === 'dark' ? <Brightness7Icon sx={{ color: 'white' }} /> : <Brightness4Icon sx={{ color: 'white' }} />}
                </IconButton>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Drawer>
      <Drawer
        variant="permanent"
        PaperProps={{
          style: {
            backgroundColor: 'rgb(31,41,55)',
          },
        }}
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        <Stack width="100%" height="100%">
          <Box>
            <div
              className="flex items-center justify-center h-20"
              onClick={(e) => handleSidebarClickFromSidebar(e, '')}
              style={{ cursor: 'pointer' }}
            >
              <h1 className="text-3xl text-red-200">lynn.pet!</h1>
            </div>
            <Divider variant="middle" light sx={{ bgcolor: '#999', mb: 1 }} />
          </Box>
          <Box flexGrow={1}>
            <Scrollbars
              universal
              renderTrackVertical={({ style, ...props }) => (
                <div
                  {...props}
                  style={{
                    ...style, right: '2px', bottom: '2px', top: '2px', borderRadius: '3px', width: '5px',
                  }}
                />
              )}
              renderThumbVertical={({ style, ...props }) => (
                <div
                  {...props}
                  style={{
                    ...style,
                    width: '4px',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.16)',
                    backgroundColor: '#ddd',
                  }}
                />
              )}
            >

              {drawer}
            </Scrollbars>
          </Box>
          <Box>
            <Stack width="100%" height="100%">
              <Divider variant="middle" light sx={{ bgcolor: '#999', mt: 1 }} />
              <Stack direction="row" flexGrow={1}>
                <Box flexGrow={1} />
                <IconButton
                  sx={{ m: 1 }}
                  onClick={(e) => handleDarkModeClick(e, colorMode)}
                  color="inherit"
                >
                  {theme.palette.mode === 'dark' ? <Brightness7Icon sx={{ color: 'white' }} /> : <Brightness4Icon sx={{ color: 'white' }} />}
                </IconButton>
              </Stack>
            </Stack>
          </Box>
        </Stack>

      </Drawer>
    </Box>
  );
}

export default SidebarComponent;
