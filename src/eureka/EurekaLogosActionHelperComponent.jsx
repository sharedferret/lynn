import React, { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import EurekaLogosActionSelectorComponent from './EurekaLogosActionSelectorComponent';
import EurekaLogosActionHelperDataComponent from './EurekaLogosActionHelperDataComponent';
import EurekaLogosActionHelper from './lib/EurekaLogosActionHelper';
import EurekaLogosActionIconSelectorComponent from './EurekaLogosActionIconSelectorComponent';

export default function EurekaLogosActionHelperComponent({ logosAction }) {
  /**
   * Component State
   */

  let action = logosAction ?? '';
  action = action.replaceAll('_', ' ');

  const logosActionData = EurekaLogosActionHelper.getLogosActionData(action);
  let initialSelectedRecipe = null;
  if (logosActionData) {
    [initialSelectedRecipe] = logosActionData.recipes;
  }

  const [logosActionState, setLogosActionState] = useState(action);
  const [selectedRecipe, setSelectedRecipe] = useState(initialSelectedRecipe);

  const handleActionUpdate = useCallback((event) => {
    const newLogosActionData = EurekaLogosActionHelper.getLogosActionData(event.target.value);
    const logosActionUrl = event.target.value.replaceAll(' ', '_');
    window.history.pushState(
      logosActionUrl,
      `${logosActionUrl} - forays.info`,
      `/eureka/logos/${event.target.value.replaceAll(' ', '_')}`,
    );

    setLogosActionState(event.target.value);
    if (newLogosActionData) {
      setSelectedRecipe(newLogosActionData.recipes[0]);
    }
  }, [window, setLogosActionState, setSelectedRecipe]);

  const handleRecipeUpdate = useCallback((event, value) => {
    if (value) {
      setSelectedRecipe(value.split(','));
    }
  }, [setSelectedRecipe]);

  /**
   * Render Logic
   */
  return (
    <Box
      component="main"
      margin="auto"
      sx={{ flexGrow: 1, pt: { xs: 14, md: 5 } }}
    >
      <Box minHeight={600}>
        <Stack spacing={2} minHeight={100} p={1} alignItems="center">
          <Typography fontWeight={700} variant="h4">Eureka Logos Action Helper</Typography>
          <EurekaLogosActionIconSelectorComponent
            handleActionUpdate={handleActionUpdate}
          />
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography>Action: </Typography>
            <Box width={325}>
              <EurekaLogosActionSelectorComponent
                logosAction={logosActionState}
                handleActionUpdate={handleActionUpdate}
              />
            </Box>
          </Stack>
          <EurekaLogosActionHelperDataComponent
            logosAction={logosActionState}
            selectedRecipe={selectedRecipe}
            handleRecipeUpdate={handleRecipeUpdate}
          />
        </Stack>
      </Box>
    </Box>
  );
}
