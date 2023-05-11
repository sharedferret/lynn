import React, { useCallback } from 'react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars-2';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ResultsFilter from './forecast/lib/ResultsFilter';

function SidebarComponent({
  page,
  mobileOpen,
  handleDrawerToggle,
  handleSidebarClick,
  handleSidebarForecastClick,
  colorModeContext,
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

  const StyledButton = styled(ListItemButton)({
    '&:hover': {
      transform: 'translateX(6px)',
      transition: '0.2s ease-in',
      color: '#fff',
    },
    transition: 'transform 0.2s',
    color: '#e0e0e0',
  });

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

      <StyledButton
        onClick={(e) => { handleSidebarClickFromSidebar(e, 'ba'); }}
      >
        <Box width={32} />
        <Typography>BA Loadouts</Typography>
      </StyledButton>

      <StyledButton
        onClick={(e) => { handleSidebarClickFromSidebar(e, 'portals'); }}
      >
        <Box width={32} />
        <Typography>BA Portal Map</Typography>
      </StyledButton>

      <StyledButton
        onClick={(e) => { handleSidebarClickFromSidebar(e, 'eureka/logos'); }}
      >
        <Box width={32} />
        <Typography>Logos Action Helper</Typography>
      </StyledButton>

      <StyledButton
        onClick={(e) => handleSidebarForecastClickFromSidebar(e, ResultsFilter.EUREKA_NMS)}
      >
        <Box width={32} />
        <Typography>NM Spawn Times</Typography>
      </StyledButton>

      <li className="flex flex-row items-center h-12">
        <Box className="h-6 w-6" />
        <span className="text-md uppercase font-semibold text-white">Bozja and DRS</span>
      </li>

      <a href="/drs/holster">
        <StyledButton>
          <Box width={32} />
          <Typography>DRS Holsters</Typography>
        </StyledButton>
      </a>

      <a href="/drs/holster/c">
        <StyledButton>
          <Box width={32} />
          <Typography>Holster Creator</Typography>
        </StyledButton>
      </a>

      <StyledButton
        onClick={(e) => { handleSidebarClickFromSidebar(e, 'bozja/lostaction'); }}
      >
        <Box width={32} />
        <Typography>Lost Action Helper</Typography>
      </StyledButton>

      <StyledButton
        onClick={(e) => handleSidebarForecastClickFromSidebar(e, ResultsFilter.FRAGMENT_FARM)}
      >
        <Box width={32} />
        <Typography>Fragment Farm Times</Typography>
      </StyledButton>

      <li className="flex flex-row items-center h-12">
        <Box className="h-6 w-6" />
        <span className="text-md uppercase font-semibold text-white">Forays</span>
      </li>

      <StyledButton
        onClick={(e) => handleSidebarForecastClickFromSidebar(e, ResultsFilter.ALL)}
      >
        <Box width={32} />
        <Typography>Expeditionary Forecast</Typography>
      </StyledButton>

      <StyledButton
        onClick={(e) => { handleSidebarClickFromSidebar(e, 'weather-finder'); }}
      >
        <Box width={32} />
        <Typography>Advanced Weather Finder</Typography>
      </StyledButton>

      <li className="flex flex-row items-center h-12">
        <Box className="h-6 w-6" />
        <span className="text-md uppercase font-semibold text-white">About</span>
      </li>

      <StyledButton
        onClick={(e) => { handleSidebarClickFromSidebar(e, '#'); }}
      >
        <Box width={32} />
        <ListItemText>Lynn Kaneko @ Exodus</ListItemText>
      </StyledButton>
    </List>
  );

  const forecastSidebarComponent = (
    <List className="flex flex-col py-4 overflow-x-hidden">
      <StyledButton
        onClick={(e) => { handleSidebarClickFromSidebar(e, ''); }}
      >
        <ListItemAvatar>
          <ArrowBackIcon />
        </ListItemAvatar>
        <ListItemText>Home</ListItemText>
      </StyledButton>

      <li className="flex flex-row items-center h-12">
        <Box className="h-6 w-6" />
        <span className="text-md uppercase font-semibold text-white">All</span>
      </li>
      {[
        ResultsFilter.ALL,
      ].map((resultsfilter) => (
        <StyledButton
          onClick={(e) => { handleSidebarForecastClickFromSidebar(e, resultsfilter); }}
        >
          {resultsfilter.collection === false
            ? (
              <ListItemAvatar>
                <Avatar variant="rounded" src={`${process.env.PUBLIC_URL}/assets/nms/${resultsfilter.image}`} alt={resultsfilter.name} />
              </ListItemAvatar>
            )
            : <ListItemAvatar />}

          <ListItemText>{resultsfilter.name}</ListItemText>
        </StyledButton>
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
        <StyledButton
          onClick={(e) => { handleSidebarForecastClickFromSidebar(e, resultsfilter); }}
        >
          {resultsfilter.collection === false
            ? (
              <ListItemAvatar>
                <Avatar variant="rounded" src={`${process.env.PUBLIC_URL}/assets/nms/${resultsfilter.image}`} alt={resultsfilter.name} />
              </ListItemAvatar>
            )
            : <ListItemAvatar />}

          <ListItemText>{resultsfilter.name}</ListItemText>
        </StyledButton>
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
        <StyledButton
          onClick={(e) => { handleSidebarForecastClickFromSidebar(e, resultsfilter); }}
        >
          {resultsfilter.collection === false
            ? (
              <ListItemAvatar>
                <Avatar variant="rounded" src={`${process.env.PUBLIC_URL}/assets/nms/${resultsfilter.image}`} alt={resultsfilter.name} />
              </ListItemAvatar>
            )
            : <ListItemAvatar />}

          <ListItemText>{resultsfilter.name}</ListItemText>
        </StyledButton>
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
        <StyledButton
          onClick={(e) => { handleSidebarForecastClickFromSidebar(e, resultsfilter); }}
        >
          {resultsfilter.collection === false
            ? (
              <ListItemAvatar>
                <Avatar variant="rounded" src={`${process.env.PUBLIC_URL}/assets/nms/${resultsfilter.image}`} alt={resultsfilter.name} />
              </ListItemAvatar>
            )
            : <ListItemAvatar />}

          <ListItemText>{resultsfilter.name}</ListItemText>
        </StyledButton>
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
  const colorMode = React.useContext(colorModeContext);

  // Disable prop spreading rule for scrollbars
  /* eslint-disable react/jsx-props-no-spreading */
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

          <Stack spacing={2} pt={2}>
            <Button
              onClick={(e) => handleSidebarClickFromSidebar(e, '')}
            >
              <h1 className="text-3xl text-red-200">lynn.pet!</h1>
            </Button>
            <Box>
              <Divider variant="middle" light sx={{ bgcolor: '#999', mb: 1 }} />
            </Box>
          </Stack>
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
          <Stack spacing={2} pt={2}>
            <Button
              onClick={(e) => handleSidebarClickFromSidebar(e, '')}
            >
              <h1 className="text-3xl text-red-200">lynn.pet!</h1>
            </Button>
            <Box>
              <Divider variant="middle" light sx={{ bgcolor: '#999', mb: 1 }} />
            </Box>
          </Stack>
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
