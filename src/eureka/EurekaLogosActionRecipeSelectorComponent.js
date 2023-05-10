import { Box, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import EurekaLogogramRecipeComponent from './EurekaLogogramRecipeComponent';
import { v4 as uuidv4 } from 'uuid';

export default function EurekaLogosActionRecipeSelectorComponent({ recipes, selectedRecipe, handleRecipeUpdate }) {
  return (
    <Box>
      <ToggleButtonGroup
        value={selectedRecipe.join(',')}
        exclusive
        size={'large'}
        onChange={handleRecipeUpdate}
        orientation={'vertical'}
      >
        { recipes.map(i => {
          return (
            <ToggleButton
              style={{justifyContent: "flex-start"}}
              value={i.join(',')}
              sx={{ minWidth: 300, width: 600, alignItems: 'flex-start' }}
              key={ uuidv4() }
            >
              <Stack>
                <EurekaLogogramRecipeComponent logogram={i[0]} />
                <EurekaLogogramRecipeComponent logogram={i[1]} />
                <EurekaLogogramRecipeComponent logogram={i[2]} />
              </Stack>
          </ToggleButton>
          )
          
        })}
      </ToggleButtonGroup>
    </Box>
    
  );
}
