import React from 'react';
import { Box, Button, Divider, Drawer, List, ListItem, ListItemIcon } from '@mui/material';
import { useNavigate } from "react-router-dom";
import ResultsFilter from './forecast/lib/ResultsFilter';
import { Scrollbars } from 'react-custom-scrollbars-2';

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

  const mainSidebarContent = (
    <List class="flex flex-col py-4 overflow-x-hidden">
      <ListItem disablePadding class="flex flex-row items-center h-12">
        <Box class="h-6 w-6"></Box>
        <span class="text-md uppercase font-semibold text-white">Baldesion Arsenal</span>
      </ListItem>
      <ListItem disablePadding>
        <Button onClick={(e) => { handleSidebarClick(e, 'ba') }} class="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300"><i class="bx bx-home"></i></span>
          <span class="text-md font-medium">Logos Action Helper</span>
        </Button>
      </ListItem>
      <ListItem disablePadding>
        <Button onClick={(e) => { handleSidebarClick(e, 'portals') }} class="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300"><i class="bx bx-home"></i></span>
          <span class="text-md font-medium">Portal Map</span>
        </Button>
      </ListItem>
      
      <ListItem disablePadding class="flex flex-row items-center h-12">
        <Box class="h-6 w-6"></Box>
        <span class="text-md uppercase font-semibold text-white">Forays</span>
      </ListItem>
      <ListItem disablePadding>
        <Button onClick={(e) => { handleSidebarClick(e, 'forecast') }} class="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300"><i class="bx bx-home"></i></span>
          <span class="text-md font-medium">Expeditionary Forecast</span>
        </Button>
      </ListItem>
      <ListItem disablePadding>
        <Button onClick={(e) => { handleSidebarClick(e, 'weather-finder') }} class="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300"><i class="bx bx-home"></i></span>
          <span class="text-md font-medium">Advanced Weather Finder</span>
        </Button>
      </ListItem>

      <ListItem disablePadding class="flex flex-row items-center h-12">
        <Box class="h-6 w-6"></Box>
        <span class="text-md uppercase font-semibold text-white">About</span>
      </ListItem>
      <ListItem disablePadding>
        <Button onClick={(e) => { handleSidebarClick(e, '#') }} class="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300"><i class="bx bx-home"></i></span>
          <span class="text-md font-medium">Lynn Kaneko @ Exodus</span>
        </Button>
      </ListItem>
    </List>
  );

  const forecastSidebarComponent = (
    <List class="flex flex-col py-4 overflow-x-hidden">
      <ListItem disablePadding class="flex flex-row items-center h-12">
        <Box class="h-6 w-6"></Box>
        <span class="text-md uppercase font-semibold text-white">All</span>
      </ListItem>
      {[
          ResultsFilter.ALL
        ].map((filter) => (
          <ListItem key={filter.name} disablePadding>
            <Button onClick={(e) => { handleSidebarForecastClick(e, filter) }} class="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100">
              <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300"><i class="bx bx-home"></i></span>
              <span class="text-md font-medium">{filter.name}</span>
            </Button>
          </ListItem>
        ))}

      <ListItem disablePadding class="flex flex-row items-center h-12">
        <Box class="h-6 w-6"></Box>
        <span class="text-md uppercase font-semibold text-white">Eureka NMs</span>
      </ListItem>
      {[
          ResultsFilter.EUREKA_NMS, 
          ResultsFilter.COPYCAT_CASSIE, 
          ResultsFilter.KING_ARTHO,
          ResultsFilter.SKOLL
        ].map((filter) => (
          <ListItem key={filter.name} disablePadding>
            <Button onClick={(e) => handleSidebarForecastClick(e, filter)} selected={props.filter === filter} class="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100">
              <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300">
                {filter.collection === false
                  ? 
                  <Box sx={{ width: '24px', height: '24px' }}>
                    <img src={`${process.env.PUBLIC_URL}/assets/nms/${filter.image}`} style={{ width: '100%', objectFit: 'scale-down' }} alt={ filter.name } />
                  </Box>
                 : null
                }
              </span>
              <span class="text-md font-medium">{filter.name}</span>
            </Button>      
          </ListItem>
        ))}

      <ListItem disablePadding class="flex flex-row items-center h-12">
        <Box class="h-6 w-6"></Box>
        <span class="text-md uppercase font-semibold text-white">Eureka Farms</span>
      </ListItem>
      {[
          ResultsFilter.EUREKA_FARMS,
          ResultsFilter.COLD_WARPED_LOCKBOX,
          ResultsFilter.HEAT_WARPED_LOCKBOX,
          ResultsFilter.OFFENSIVE_LOGOGRAM,
        ].map((filter) => (
          <ListItem key={filter.name} disablePadding>
            <Button onClick={(e) => handleSidebarForecastClick(e, filter)} selected={props.filter === filter} class="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100">
              <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300">
                {filter.collection === false
                  ? 
                  <Box sx={{ width: '24px', height: '24px' }}>
                    <img src={`${process.env.PUBLIC_URL}/assets/nms/${filter.image}`} style={{ width: '100%', objectFit: 'scale-down' }} alt={ filter.name } />
                  </Box>
                 : null
                }
              </span>
              <span class="text-md font-medium">{filter.name}</span>
            </Button>      
          </ListItem>
        ))}

      <ListItem disablePadding class="flex flex-row items-center h-12">
        <Box class="h-6 w-6"></Box>
        <span class="text-md uppercase font-semibold text-white">Bozja Fragment Farms</span>
      </ListItem>
      {[
          ResultsFilter.FRAGMENT_FARM,
          ResultsFilter.PREPARATION_FRAGMENT,
          ResultsFilter.CARE_FRAGMENT,
          ResultsFilter.SUPPORT_FRAGMENT,
          ResultsFilter.HISTORY_FRAGMENT,
          ResultsFilter.ARTISTRY_FRAGMENT,
        ].map((filter) => (
          <ListItem key={filter.name} disablePadding>
            <Button onClick={(e) => handleSidebarForecastClick(e, filter)} selected={props.filter === filter} class="flex flex-row grow items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100">
              <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300">
                {filter.collection === false
                  ? 
                  <Box sx={{ width: '24px', height: '24px' }}>
                    <img src={`${process.env.PUBLIC_URL}/assets/nms/${filter.image}`} style={{ width: '100%', objectFit: 'scale-down' }} alt={ filter.name } />
                  </Box>
                 : null
                }
              </span>
              <span class="text-md font-medium">{filter.name}</span>
            </Button>      
          </ListItem>
        ))}
    </List>
  );

  const drawer = (
    <div class="flex flex-col">
      <div class="flex items-center justify-center h-20">
        <a href="/">
          <h1 class="text-3xl text-red-200">lynn.pet!</h1>
        </a>
      </div>
      <Divider variant="middle" light={true} sx={{ bgcolor: "#999" }} />
      { props.page === 'forecast' ? forecastSidebarComponent : mainSidebarContent }
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

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
        <Scrollbars>
        {drawer}
        </Scrollbars>
        
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
          <Scrollbars
          renderTrackVertical={({style, ...props}) =>
            <div {...props} style={{...style,  right: '2px', bottom: '2px', top: '2px', borderRadius: '3px', width: '5px'}}/>
          }
          renderThumbVertical={({style, ...props}) =>
            <div {...props} style={{...style, width: '4px', borderRadius: '4px', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.16)', backgroundColor: '#ddd'}}/>
          }>
        
          {drawer}
        </Scrollbars>
      </Drawer>
    </Box>
    );
}

export default SidebarComponent;
