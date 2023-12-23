/**
 * The menu (for now) for selecting what content should be displayed on the map.
 *
 * Will pass options up to MapContainer (again, for now) to display on the main canvas.
 */

import {
  Box, Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material';
import React from 'react';

export default function MapOptionsMenuComponent({ options, updateOptions }) {
  const handleToggle = (value) => () => {
    const newOptions = { ...options };
    newOptions[value] = !(options[value]);
    updateOptions(newOptions);
  };

  const menuItemCaptions = {
    elementals: 'Elementals',
    aetherytes: 'Aetherytes',
    bunnyCoffers: 'Bunny FATE Coffers',
    quests: 'Quest Locations',
    portals: 'Baldesion Arsenal Portals',
  };

  const menuItems = Object.keys(options);

  return (
    <Box
      borderRadius="12px"
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
    >
      <nav>
        <List>
          {
            menuItems.map((value) => (
              <ListItem
                dense
                onClick={handleToggle(value)}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={options[value] === true}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText primary={menuItemCaptions[value]} />
                </ListItemButton>
              </ListItem>
            ))
          }

        </List>
      </nav>
    </Box>
  );
}
