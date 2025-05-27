import React, { useCallback, useState } from 'react';
import EurekaLogosActionHelper from '../../eureka/lib/EurekaLogosActionHelper';
import EurekaLogosActionDataComponentInnerShim from './EurekaLogosActionDataComponentInnerShim';

export default function EurekaLogosActionDataComponentOuterShim({ action }) {
  const logosActionData = EurekaLogosActionHelper.getLogosActionData(action);
  let initialSelectedRecipe = null;
  if (logosActionData) {
    [initialSelectedRecipe] = logosActionData.recipes;
  }

  const [selectedRecipe, setSelectedRecipe] = useState(initialSelectedRecipe);

  const handleRecipeUpdate = useCallback((event, value) => {
    if (value) {
      setSelectedRecipe(value.split(','));
    }
  }, [setSelectedRecipe]);

  return (
    <EurekaLogosActionDataComponentInnerShim
      logosAction={action}
      selectedRecipe={selectedRecipe}
      handleRecipeUpdate={handleRecipeUpdate}
    />
  );
}
