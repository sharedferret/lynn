import React, { useState } from 'react';
import { Divider, Stack, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import EurekaLogosActionHelper from '../../eureka/lib/EurekaLogosActionHelper';
import universalisPriceHelperInstance from '../../acquisition/UniversalisPriceHelper';
import EurekaLogosActionRecipeSelectorComponent from '../../eureka/EurekaLogosActionRecipeSelectorComponent';
import EurekaLogogramDataComponent from '../../eureka/EurekaLogogramDataComponent';

export default function EurekaLogosActionDataComponentInnerShim({
  logosAction,
  selectedRecipe,
  handleRecipeUpdate,
}) {
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
    <Stack spacing={2} p={1} alignItems="flex-start" width={1000}>
      <Typography fontWeight={700} variant="h5">Recipes</Typography>
      <EurekaLogosActionRecipeSelectorComponent
        recipes={actionData.recipes}
        selectedRecipe={selectedRecipe}
        handleRecipeUpdate={handleRecipeUpdate}
      />
      <Divider />
      <Typography fontWeight={700} variant="h5">Logograms Needed</Typography>
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
                key={uuidv4()}
              />
            );
          })
            : null
        }
      </Stack>

    </Stack>
  );
}
