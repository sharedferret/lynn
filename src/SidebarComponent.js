import React from 'react';
import { Box, Divider, Drawer, IconButton, List, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import ResultsFilter from './forecast/lib/ResultsFilter';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { ColorModeContext } from './App';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function SidebarComponent(props) {
  const { window } = props;
  const navigate = useNavigate();

  const drawerWidth = 280;

  const handleSidebarClick = (event, item) => {
    navigate('/' + item);
    props.handleSidebarClick();
  }

  const handleSidebarForecastClick = (event, filter) => {
    navigate('/forecast/' + filter.uri);
    props.handleSidebarForecastClick(filter);
  }

  const handleDarkModeClick = (event, colorMode) => {
    colorMode.toggleColorMode();
    props.handleSidebarClick();
  }

  /**
   * <li>
        <div onClick={(e) => { handleSidebarClick(e, 'eureka/loadout') }} style={{cursor: 'pointer'}} className="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100">
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300"><i className="bx bx-home"></i></span>
          <span className="text-md font-medium">Loadout Creator</span>
        </div>
      </li>
      <li>
        <div onClick={(e) => { handleSidebarClick(e, 'eureka/logos') }} style={{cursor: 'pointer'}} className="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100">
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300"><i className="bx bx-home"></i></span>
          <span className="text-md font-medium">Logos Action Helper</span>
        </div>
      </li>
   */

  const mainSidebarContent = (
    <List className="flex flex-col py-4 overflow-x-hidden">
      <li className="flex flex-row items-center h-12">
        <Box className="h-6 w-6"></Box>
        <span className="text-md uppercase font-semibold text-white">Eureka and BA</span>
      </li>
      <li>
        <div onClick={(e) => { handleSidebarClick(e, 'ba') }} style={{cursor: 'pointer'}} className="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100">
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300"><i className="bx bx-home"></i></span>
          <span className="text-md font-medium">BA Loadouts</span>
        </div>
      </li>
      <li>
        <div onClick={(e) => { handleSidebarClick(e, 'portals') }} style={{cursor: 'pointer'}} className="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100">
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300"><i className="bx bx-home"></i></span>
          <span className="text-md font-medium">BA Portal Map</span>
        </div>
      </li>
      

      <li className="flex flex-row items-center h-12">
        <Box className="h-6 w-6"></Box>
        <span className="text-md uppercase font-semibold text-white">Bozja and DRS</span>
      </li>
      <li>
        <a href='/drs/holster'>
          <div style={{cursor: 'pointer'}} className="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100">
            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300"><i className="bx bx-home"></i></span>
            <span className="text-md font-medium">DRS Holsters</span>
          </div>
        </a>
      </li>
      <li>
        <a href='/drs/holster/c'>
          <div style={{cursor: 'pointer'}} className="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100">
            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300"><i className="bx bx-home"></i></span>
            <span className="text-md font-medium">Holster Creator</span>
          </div>
        </a>
      </li>
      <li>
        <div onClick={(e) => { handleSidebarClick(e, 'bozja/lostaction') }} style={{cursor: 'pointer'}} className="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100">
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300"><i className="bx bx-home"></i></span>
          <span className="text-md font-medium">Lost Action Helper</span>
        </div>
      </li>
      
      <li className="flex flex-row items-center h-12">
        <Box className="h-6 w-6"></Box>
        <span className="text-md uppercase font-semibold text-white">Forays</span>
      </li>
      <li>
        <div onClick={(e) => { handleSidebarClick(e, 'forecast') }} style={{cursor: 'pointer'}} className="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100">
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300"><i className="bx bx-home"></i></span>
          <span className="text-md font-medium">Expeditionary Forecast</span>
        </div>
      </li>
      <li>
        <div onClick={(e) => { handleSidebarClick(e, 'weather-finder') }} style={{cursor: 'pointer'}} className="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100">
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300"><i className="bx bx-home"></i></span>
          <span className="text-md font-medium">Advanced Weather Finder</span>
        </div>
      </li>

      <li className="flex flex-row items-center h-12">
        <Box className="h-6 w-6"></Box>
        <span className="text-md uppercase font-semibold text-white">About</span>
      </li>
      <li>
        <div onClick={(e) => { handleSidebarClick(e, '#') }} style={{cursor: 'pointer'}} className="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100">
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300"><i className="bx bx-home"></i></span>
          <span className="text-md font-medium">Lynn Kaneko @ Exodus</span>
        </div>
      </li>
    </List>
  );

  const forecastSidebarComponent = (
    <List className="flex flex-col py-4 overflow-x-hidden">
      <li className="flex flex-row items-center h-12">
        <Box className="h-6 w-6"></Box>
        <span className="text-md uppercase font-semibold text-white">All</span>
      </li>
      {[
          ResultsFilter.ALL
        ].map((filter) => (
          <li key={filter.name}>
            <div onClick={(e) => { handleSidebarForecastClick(e, filter) }} style={{cursor: 'pointer'}} className="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100">
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300"><i className="bx bx-home"></i></span>
              <span className="text-md font-medium">{filter.name}</span>
            </div>
          </li>
        ))}

      <li className="flex flex-row items-center h-12">
        <Box className="h-6 w-6"></Box>
        <span className="text-md uppercase font-semibold text-white">Eureka NMs</span>
      </li>
      {[
          ResultsFilter.EUREKA_NMS, 
          ResultsFilter.COPYCAT_CASSIE, 
          ResultsFilter.KING_ARTHO,
          ResultsFilter.SKOLL,
          ResultsFilter.PAZUZU,
          ResultsFilter.PENTHESILEA,
        ].map((filter) => (
          <li key={filter.name}>
            <div onClick={(e) => handleSidebarForecastClick(e, filter)} selected={props.filter === filter} style={{cursor: 'pointer'}} className="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100">
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300">
                {filter.collection === false
                  ? 
                  <Box sx={{ width: '24px', height: '24px' }}>
                    <img src={`${process.env.PUBLIC_URL}/assets/nms/${filter.image}`} style={{ width: '100%', objectFit: 'scale-down' }} alt={ filter.name } />
                  </Box>
                 : null
                }
              </span>
              <span className="text-md font-medium">{filter.name}</span>
            </div>      
          </li>
        ))}

      <li className="flex flex-row items-center h-12">
        <Box className="h-6 w-6"></Box>
        <span className="text-md uppercase font-semibold text-white">Eureka Farms</span>
      </li>
      {[
          ResultsFilter.EUREKA_FARMS,
          ResultsFilter.COLD_WARPED_LOCKBOX,
          ResultsFilter.HEAT_WARPED_LOCKBOX,
          ResultsFilter.OFFENSIVE_LOGOGRAM,
        ].map((filter) => (
          <li key={filter.name}>
            <div onClick={(e) => handleSidebarForecastClick(e, filter)} selected={props.filter === filter} style={{cursor: 'pointer'}} className="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100">
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300">
                {filter.collection === false
                  ? 
                  <Box sx={{ width: '24px', height: '24px' }}>
                    <img src={`${process.env.PUBLIC_URL}/assets/nms/${filter.image}`} style={{ width: '100%', objectFit: 'scale-down' }} alt={ filter.name } />
                  </Box>
                 : null
                }
              </span>
              <span className="text-md font-medium">{filter.name}</span>
            </div>      
          </li>
        ))}

      <li className="flex flex-row items-center h-12">
        <Box className="h-6 w-6"></Box>
        <span className="text-md uppercase font-semibold text-white">Bozja Fragment Farms</span>
      </li>
      {[
          ResultsFilter.FRAGMENT_FARM,
          ResultsFilter.PREPARATION_FRAGMENT,
          ResultsFilter.CARE_FRAGMENT,
          ResultsFilter.SUPPORT_FRAGMENT,
          ResultsFilter.HISTORY_FRAGMENT,
          ResultsFilter.ARTISTRY_FRAGMENT,
        ].map((filter) => (
          <li key={filter.name}>
            <div onClick={(e) => handleSidebarForecastClick(e, filter)} selected={props.filter === filter} style={{cursor: 'pointer'}} className="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100">
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300">
                {filter.collection === false
                  ? 
                  <Box sx={{ width: '24px', height: '24px' }}>
                    <img src={`${process.env.PUBLIC_URL}/assets/nms/${filter.image}`} style={{ width: '100%', objectFit: 'scale-down' }} alt={ filter.name } />
                  </Box>
                 : null
                }
              </span>
              <span className="text-md font-medium">{filter.name}</span>
            </div>      
          </li>
        ))}
    </List>
  );

  const drawer = (
    <div className="flex flex-col">
      { props.page === 'forecast' ? forecastSidebarComponent : mainSidebarContent }
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
        open={props.mobileOpen}
        onClose={props.handleDrawerToggle}
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
        <Stack width='100%' height='100%'>
          <div className="flex items-center justify-center h-20" onClick={(e) => handleSidebarClick(e, '')} style={{cursor: 'pointer'}}>
            <h1 className="text-3xl text-red-200">lynn.pet!</h1>
          </div>
          <Divider variant="middle" light={true} sx={{ bgcolor: "#999", mb: 1 }} />
          <Box flexGrow={1}>
            <Scrollbars universal={true}>
              {drawer}
            </Scrollbars>
          </Box>
          <Box>
            <Stack width='100%' height='100%'>
              <Divider variant="middle" light={true} sx={{ bgcolor: "#999", mt: 1 }} />
              <Stack direction={'row'} flexGrow={1}>
                <Box flexGrow={1}>
                </Box>
                <IconButton sx={{ m: 1 }} onClick={(e) => handleDarkModeClick(e, colorMode)} color="inherit">
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
            <div className="flex items-center justify-center h-20" onClick={(e) => handleSidebarClick(e, '')} style={{cursor: 'pointer'}}>
                <h1 className="text-3xl text-red-200">lynn.pet!</h1>
            </div>
            <Divider variant="middle" light={true} sx={{ bgcolor: "#999", mb: 1 }} />
          </Box>
          <Box flexGrow={1}>
            <Scrollbars
              universal={true}
              renderTrackVertical={({style, ...props}) =>
                <div {...props} style={{...style,  right: '2px', bottom: '2px', top: '2px', borderRadius: '3px', width: '5px'}}/>
              }
              renderThumbVertical={({style, ...props}) =>
                <div {...props} style={{...style, width: '4px', borderRadius: '4px', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.16)', backgroundColor: '#ddd'}}/>
              }>
            
              {drawer}
            </Scrollbars>
          </Box>
          <Box>
            <Stack width='100%' height='100%'>
              <Divider variant="middle" light={true} sx={{ bgcolor: "#999", mt: 1 }} />
              <Stack direction={'row'} flexGrow={1}>
                <Box flexGrow={1}>
                </Box>
                <IconButton sx={{ m: 1 }} onClick={(e) => handleDarkModeClick(e, colorMode)} color="inherit">
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
