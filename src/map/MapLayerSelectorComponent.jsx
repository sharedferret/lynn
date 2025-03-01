import {
  Box, Checkbox, FormControlLabel, FormGroup,
  Typography,
} from '@mui/material';
import React from 'react';

export default function MapLayerSelectorComponent({
  selectedLayers,
  availableLayers,
  handleLayerSelectorUpdate,
}) {
  const checkboxesToDisplay = [];

  /**
   * TODO
   * The container needs to be scrollable
   * The container needs to be collapsible
   */

  // TODO: Fix this error.
  // eslint-disable-next-line no-restricted-syntax
  for (const category of availableLayers) {
    // Push parent checkbox
    checkboxesToDisplay.push(
      <FormControlLabel
        label={<Typography fontWeight={700}>{category.name}</Typography>}
        key={category.name}
        control={
          (
            <Checkbox
              checked={category.layers.every((layer) => selectedLayers.includes(layer.id))}
              indeterminate={
                category.layers.some((layer) => selectedLayers.includes(layer.id))
                && !category.layers.every((layer) => selectedLayers.includes(layer.id))
              }
            />
          )
        }
        onChange={(e) => {
          // TODO: This doesn't work yet, need to see why
          const newLayers = [...selectedLayers];
          if (e.target.checked) {
            category.layers.forEach((layer) => {
              if (!newLayers.includes(layer.id)) {
                newLayers.push(layer.id);
              }
            });
          } else {
            category.layers.forEach((layer) => {
              const index = newLayers.indexOf(layer.id);
              if (index > -1) {
                newLayers.splice(index, 1);
              }
            });
          }
          handleLayerSelectorUpdate(newLayers);
        }}
      />,
    );

    // Push child checkboxes
    const categoryLayers = category.layers.map((layer) => (
      <FormControlLabel
        key={layer.name}
        control={
          (
            <Checkbox
              checked={selectedLayers.includes(layer.id)}
            />
          )
        }
        label={layer.name}
        onChange={(e) => handleLayerSelectorUpdate({
          layer: layer.id,
          checked: e.target.checked,
        })}
      />
    ));

    checkboxesToDisplay.push(
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
        {categoryLayers}
      </Box>,
    );
  }

  return (
    <Box className="map-layer-selector" sx={{ mt: { xs: 10, md: 0 } }}>
      <FormGroup>
        {checkboxesToDisplay}
      </FormGroup>
    </Box>
  );
}
