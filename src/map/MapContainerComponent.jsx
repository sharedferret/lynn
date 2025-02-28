import React, { useCallback } from 'react';
import { Box } from '@mui/material';
import './MapContainerComponent.css';

import FullscreenMapComponent from './FullscreenMapComponent';

export default function MapContainerComponent() {
  const [selectedLayers, setSelectedLayers] = React.useState(['namedLocations', 'aetherytes']);

  const handleLayerSelectorUpdate = useCallback((data) => {
    setSelectedLayers(data);
  }, [setSelectedLayers]);

  return (
    <Box
      component="main"
      margin="auto"
      sx={{ flexGrow: 1, pt: { xs: 10, md: 0 } }}
    >
      <FullscreenMapComponent
        selectedLayers={selectedLayers}
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
