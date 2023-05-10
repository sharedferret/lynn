import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import EurekaLogosActionSelectorComponent from './EurekaLogosActionSelectorComponent';
import EurekaLogosActionHelperDataComponent from './EurekaLogosActionHelperDataComponent';
import EurekaLogosActionHelper from './lib/EurekaLogosActionHelper';
import { useState } from 'react';

export default function EurekaLogosActionHelperComponent(props) {
  /**
   * Component State
   */

  let action = props.logosAction ?? '';
    action = action.replaceAll('_', ' ');

    const logosActionData = EurekaLogosActionHelper.getLogosActionData(action);
    let initialSelectedRecipe = null;
    if (logosActionData) {
      initialSelectedRecipe = logosActionData.recipes[0];
    }

  const [logosAction, setLogosAction] = useState(action);
  const [selectedRecipe, setSelectedRecipe] = useState(initialSelectedRecipe);

  function handleActionUpdate(event) {
    const logosActionData = EurekaLogosActionHelper.getLogosActionData(event.target.value);
    const logosActionUrl = event.target.value.replaceAll(' ', '_');
    window.history.pushState(logosActionUrl, 'lynn.pet! - ' + logosActionUrl, '/eureka/logos/' + event.target.value.replaceAll(' ', '_'))

    setLogosAction(event.target.value);
    if (logosActionData) {
      setSelectedRecipe(logosActionData.recipes[0]);
    }
  }

  function handleRecipeUpdate(event, value) {
    if (value) {
      setSelectedRecipe(value.split(','));
    }
  }

  /**
   * Render Logic
   */
  return (
    <Box width={1000}>
      <Stack spacing={2} minHeight={100} p={1} alignItems={'center'}>
        <Typography fontWeight={700} variant={'h4'}>Eureka Logos Action Helper</Typography>
        <Stack direction={'row'} spacing={2} alignItems={'center'}>
          <Typography>Action: </Typography>
          <Box width={325}>
            <EurekaLogosActionSelectorComponent
              logosAction={ logosAction }
              handleActionUpdate={ handleActionUpdate }
            />
          </Box>
        </Stack>
        <EurekaLogosActionHelperDataComponent
          logosAction={ logosAction }
          selectedRecipe={ selectedRecipe }
          handleRecipeUpdate={ handleRecipeUpdate}
        />
      </Stack>
    </Box>
  );
}