import React, { useState } from 'react';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import universalisPriceHelperInstance from '../acquisition/UniversalisPriceHelper';
import EurekaLogosActionHelper from './lib/EurekaLogosActionHelper';
import EurekaLogogramDataComponent from './EurekaLogogramDataComponent';
import EurekaLogosActionRecipeSelectorComponent from './EurekaLogosActionRecipeSelectorComponent';
import EurekaLogosActionInformationComponent from './EurekaLogosActionInformationComponent';

export default function EurekaLogosActionHelperDataComponent(
  { logosAction, selectedRecipe, handleRecipeUpdate },
) {
  /**
   * Component State
   */
  const [actionPriceData, setActionPriceData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  function updateGuideState(priceData) {
    setActionPriceData(priceData);
    setLastUpdated(new Date());
  }

  // Fetch price data
  if (selectedRecipe) {
    const recipeLogograms = selectedRecipe.map(
      (i) => EurekaLogosActionHelper.getLogogramForMneme(i),
    );

    if (recipeLogograms.length > 0) {
      universalisPriceHelperInstance.fetchIDs(recipeLogograms, updateGuideState);
    }
  }

  /**
   * Render logic
   */
  if (logosAction === '') {
    return null;
  }

  const actionData = EurekaLogosActionHelper.getLogosActionData(logosAction);

  if (actionData === undefined) {
    return null;
  }

  return (
    <Stack
      spacing={2}
      sx={{
        p: 1,
        alignItems: 'flex-start',
        width: 1000,
      }}
    >
      <EurekaLogosActionInformationComponent
        actionData={actionData}
        logosAction={logosAction}
      />
      <Divider variant="middle" />
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
        }}
      >
        Recipes
      </Typography>
      <EurekaLogosActionRecipeSelectorComponent
        recipes={actionData.recipes}
        selectedRecipe={selectedRecipe}
        handleRecipeUpdate={handleRecipeUpdate}
      />
      <Divider />
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
        }}
      >
        Logograms Needed
      </Typography>
      <Stack spacing={2} divider={<Divider variant="middle" />}>
        {
          selectedRecipe ? selectedRecipe.map((i) => {
            const mnemeData = EurekaLogosActionHelper.getMnemeData(i);
            const logogramData = EurekaLogosActionHelper.getLogogramData(mnemeData.logogram);
            return (
              <EurekaLogogramDataComponent
                logogramData={logogramData}
                mnemeData={mnemeData}
                mneme={i}
                priceData={actionPriceData ? actionPriceData[mnemeData.logogram] : null}
                lastUpdated={lastUpdated}
                key={crypto.randomUUID()}
              />
            );
          })
            : null
        }
      </Stack>

    </Stack>
  );
}
