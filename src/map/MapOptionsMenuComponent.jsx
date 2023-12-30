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
    nms: 'Notorious Monsters',
    mobPacks: 'Mob Packs',
  };

  const menuItems = Object.keys(options);

  return (
    <Box
      borderRadius="12px"
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
    >
      <nav>
        <List dense disablePadding>
          {
            menuItems.map((value) => (
              <ListItem
                dense
                disablePadding
                onClick={handleToggle(value)}
              >
                <ListItemButton dense>
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
