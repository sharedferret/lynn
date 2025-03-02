import React, { useCallback, useMemo } from 'react';
import {
  Box,
  Button,
  Stack,
  useTheme,
} from '@mui/material';
import LayersIcon from '@mui/icons-material/Layers';
import MapIcon from '@mui/icons-material/Map';
import './MapContainerComponent.css';

import FullscreenMapComponent from './FullscreenMapComponent';
import MapLayerSelectorComponent from './MapLayerSelectorComponent';

// TODO: Update this when we support multiple maps
import bsfMapData from './lib/poi/bsf.json';

export default function MapContainerComponent() {
  const theme = useTheme();

  const initialSelectedLayers = bsfMapData.layers.map((layer) => layer.id);
  const [selectedLayers, setSelectedLayers] = React.useState(initialSelectedLayers);
  const [displayLayerSelector, setDisplayLayerSelector] = React.useState(true);
  const [mouseCoordinates, setMouseCoordinates] = React.useState({ lat: 1, lon: -1 });
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

  const handleMouseMove = useCallback((e) => {
    setMouseCoordinates({ lat: e.latlng.lat, lon: e.latlng.lng });
  }, [setMouseCoordinates]);

  const displayMap = useMemo(() => (
    <FullscreenMapComponent
      selectedLayers={selectedLayers}
      handleLayerSelectorUpdate={handleLayerSelectorUpdate}
      handleMouseMove={handleMouseMove}
    />
  ), [selectedLayers, handleLayerSelectorUpdate, handleMouseMove]);

  return (
    <Box
      component="main"
      margin="auto"
      className="map-container"
      sx={{ pt: { xs: 10, md: 0 } }}
    >
      { displayMap }
      {
        displayLayerSelector
          && (
          <MapLayerSelectorComponent
            selectedLayers={selectedLayers}
            availableLayers={availableLayers}
            handleLayerSelectorUpdate={handleLayerSelectorUpdate}
          />
          )
      }
      <Box className="layer-selector-button">
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            endIcon={<MapIcon />}
            onClick={() => setDisplayLayerSelector(!displayLayerSelector)}
            disabled
          >
            The Bozjan Southern Front
          </Button>
          <Button
            variant="contained"
            endIcon={<LayersIcon />}
            onClick={() => setDisplayLayerSelector(!displayLayerSelector)}
          >
            { displayLayerSelector ? 'Close' : 'Change Layers' }
          </Button>
        </Stack>
      </Box>
      <Box className="mouse-coordinates" sx={{ backgroundColor: theme.palette.background.paper }}>
        {`${mouseCoordinates.lon.toFixed(1)}, ${(mouseCoordinates.lat * -1.0).toFixed(1)}`}
      </Box>
    </Box>

  );
}

/**
 * Some notes on this:
 * - We'll need a layer selector. Probably also need a map switcher.
 * - Need to add support for regions as well as points, for CE/FATE boundaries and mob spawn areas.
 * - Need to make an inline version of this for the forecast/ section.
 */
