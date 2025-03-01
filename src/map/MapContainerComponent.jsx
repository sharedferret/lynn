import React, { useCallback } from 'react';
import { Box } from '@mui/material';
import './MapContainerComponent.css';

import FullscreenMapComponent from './FullscreenMapComponent';
import MapLayerSelectorComponent from './MapLayerSelectorComponent';

// TODO: Update this when we support multiple maps
import bsfMapData from './lib/poi/bsf.json';

export default function MapContainerComponent() {
  const initialSelectedLayers = bsfMapData.layers.map((layer) => layer.id);
  const [selectedLayers, setSelectedLayers] = React.useState(initialSelectedLayers);
  const availableLayers = bsfMapData.categories;

  const handleLayerSelectorUpdate = useCallback((data) => {
    const newLayers = [...selectedLayers];
    if (data.checked) {
      newLayers.push(data.layer);
    } else {
      const index = newLayers.indexOf(data.layer);
      if (index > -1) {
        newLayers.splice(index, 1);
      }
    }
    setSelectedLayers(newLayers);
  }, [selectedLayers, setSelectedLayers]);

  return (
    <Box
      component="main"
      margin="auto"
      className="map-container"
      sx={{ pt: { xs: 10, md: 0 } }}
    >
      <FullscreenMapComponent
        selectedLayers={selectedLayers}
        handleLayerSelectorUpdate={handleLayerSelectorUpdate}
      />
      <MapLayerSelectorComponent
        selectedLayers={selectedLayers}
        availableLayers={availableLayers}
        handleLayerSelectorUpdate={handleLayerSelectorUpdate}
      />
    </Box>

  );
}

/**
 * Some notes on this:
 * - We'll need a layer selector. Probably also need a map switcher.
 * - Need to add support for regions as well as points, for CE/FATE boundaries and mob spawn areas.
 * - Need to make an inline version of this for the forecast/ section.
 */
