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
    console.log('updating value', value);
    const newOptions = { ...options };
    newOptions[value.key] = !(options[value.key]);
    updateOptions(newOptions);
  };

  const menuItems = [
    {
      index: 0,
      name: 'Elementals',
      key: 'elementals',
    },
    {
      index: 1,
      name: 'Aetherytes',
      key: 'aetherytes',
    },
  ];

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
                      checked={options[value.key] === true}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText primary={value.name} />
                </ListItemButton>
              </ListItem>
            ))
          }

        </List>
      </nav>
    </Box>
  );
}
