import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import EurekaLogogramRecipeComponent from './EurekaLogogramRecipeComponent';

export default function EurekaLogosActionRecipeSelectorComponent(
  { recipes, selectedRecipe, handleRecipeUpdate },
) {
  return (
    <Box>
      <ToggleButtonGroup
        value={selectedRecipe.join(',')}
        exclusive
        size="large"
        onChange={handleRecipeUpdate}
        orientation="vertical"
      >
        {recipes.map((i) => (
          <ToggleButton
            style={{ justifyContent: 'flex-start' }}
            value={i.join(',')}
            sx={{ minWidth: 300, width: 600, alignItems: 'flex-start' }}
            key={uuidv4()}
          >
            <Stack>
              <EurekaLogogramRecipeComponent logogram={i[0]} />
              <EurekaLogogramRecipeComponent logogram={i[1]} />
              <EurekaLogogramRecipeComponent logogram={i[2]} />
            </Stack>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>

  );
}
