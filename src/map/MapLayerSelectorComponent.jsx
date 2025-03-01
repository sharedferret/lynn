import {
  Box, Checkbox, FormControlLabel, FormGroup,
} from '@mui/material';
import React from 'react';

export default function MapLayerSelectorComponent({
  selectedLayers,
  availableLayers,
  handleLayerSelectorUpdate,
}) {
  const checkboxesToDisplay = availableLayers.map((layer) => (
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

  return (
    <Box className="map-layer-selector" sx={{ mt: { xs: 10, md: 0 } }}>
      <FormGroup>
        {checkboxesToDisplay}
      </FormGroup>
    </Box>
  );
}
