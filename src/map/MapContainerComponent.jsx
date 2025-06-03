import React, { useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import LayersIcon from '@mui/icons-material/Layers';
import MapIcon from '@mui/icons-material/Map';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import AbcIcon from '@mui/icons-material/Abc';
import InfoIcon from '@mui/icons-material/Info';
import CancelIcon from '@mui/icons-material/Cancel';
import './MapContainerComponent.css';

import FullscreenMapComponent from './FullscreenMapComponent';
import MapLayerSelectorComponent from './MapLayerSelectorComponent';

// TODO: Attempt to lazy-load these
import bsfMapData from './lib/poi/bsf.json';
import hydMapData from './lib/poi/hydatos.json';
import oshMapData from './lib/poi/southhorn.json';
import MapZoneSelectorComponent from './MapZoneSelectorComponent';
import FooterComponent from '../FooterComponent';
// import MapData from './MapData';

export default function MapContainerComponent({ mapId, inputSelectedLayers }) {
  const theme = useTheme();

  // TODO: Have a mapping so we can use multiple identifiers for each zone
  const mapData = {};
  mapData.hydatos = hydMapData;
  mapData.bsf = bsfMapData;
  mapData.southhorn = oshMapData;

  // const mapDataManager = MapData.getInstance();

  const [selectedMapId, setSelectedMapId] = React.useState(mapId ?? 'hydatos');

  const initialSelectedLayers = inputSelectedLayers
    ?? mapData[selectedMapId].layers.map((layer) => layer.id);
  const [selectedLayers, setSelectedLayers] = React.useState(initialSelectedLayers);
  const [displayLayerSelector, setDisplayLayerSelector] = React.useState(false);
  const [displayZoneSelector, setDisplayZoneSelector] = React.useState(false);
  const [displayLabels, setDisplayLabels] = React.useState(true);
  const [displayFooter, setDisplayFooter] = React.useState(false);
  const [mouseCoordinates, setMouseCoordinates] = React.useState({ lat: 1, lon: -1 });
  const availableLayers = mapData[selectedMapId].categories;

  const params = new URLSearchParams(window.location.search);
  let initialMapPosition;
  if (params.has('x') && params.has('y') && params.has('zoom')) {
    initialMapPosition = {
      lat: parseFloat(params.get('y')),
      lon: parseFloat(params.get('x')),
      zoom: parseFloat(params.get('zoom')),
      poi: params.get('poi') || null,
    };
  }

  const handleLayerSelectorUpdate = useCallback((newLayers) => {
    setSelectedLayers(newLayers);
  }, [selectedLayers, setSelectedLayers]);

  const handleZoneSelectorUpdate = useCallback((data) => {
    setSelectedMapId(data);

    // Close selector
    setDisplayZoneSelector(false);

    // Update current href
    window.history.pushState(
      {},
      'FFXIV Field Operations Assistant - forays.info',
      `/map/${data}`,
    );
  }, [setSelectedMapId, setDisplayZoneSelector]);

  const handleFooterSelectorUpdate = useCallback(() => {
    setDisplayFooter(!displayFooter);
  }, [displayFooter, setDisplayFooter]);

  const handleMouseMove = useCallback((e) => {
    setMouseCoordinates({ lat: e.latlng.lat, lon: e.latlng.lng });
  }, [setMouseCoordinates]);

  const displayMap = useMemo(() => (
    <FullscreenMapComponent
      mapId={selectedMapId}
      mapData={mapData[selectedMapId].mapData}
      mapParameters={mapData[selectedMapId].parameters}
      initialMapPosition={initialMapPosition}
      selectedLayers={selectedLayers}
      displayLabels={displayLabels}
      handleLayerSelectorUpdate={handleLayerSelectorUpdate}
      handleMouseMove={handleMouseMove}
    />
  ), [displayLabels, selectedMapId, selectedLayers, handleLayerSelectorUpdate, handleMouseMove]);

  return (
    <Box
      component="main"
      margin="auto"
      className="map-container"
      sx={{
        height: { xs: 'calc(100dvh - 80px)', md: '100dvh' },
      }}
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
      {
        displayZoneSelector
          && (
          <MapZoneSelectorComponent
            currentZone={selectedMapId}
            handleZoneSelectorUpdate={handleZoneSelectorUpdate}
          />
          )
      }
      <Box className="layer-selector-button">
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            startIcon={displayLabels ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
            endIcon={<AbcIcon />}
            onClick={() => {
              setDisplayLabels(!displayLabels);
            }}
          />
          <Button
            variant="contained"
            startIcon={displayZoneSelector ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            endIcon={<MapIcon />}
            onClick={() => {
              setDisplayZoneSelector(!displayZoneSelector);
              setDisplayLayerSelector(false);
            }}
          >
            <Typography
              display={{ xs: 'none', md: 'block' }}
            >
              { mapData[selectedMapId].name }
            </Typography>
          </Button>
          <Button
            variant="contained"
            startIcon={displayLayerSelector ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            endIcon={<LayersIcon />}
            onClick={() => {
              setDisplayZoneSelector(false);
              setDisplayLayerSelector(!displayLayerSelector);
            }}
          >
            {
              /* { displayLayerSelector ? 'Close' : 'Change Layers' } */
              ''
            }
          </Button>
        </Stack>
      </Box>
      <Box className="mouse-coordinates" sx={{ backgroundColor: theme.palette.background.paper }}>
        {`${mouseCoordinates.lon.toFixed(1)}, ${(mouseCoordinates.lat * -1.0).toFixed(1)}`}
      </Box>
      <Box className="map-footer" sx={{ display: { xs: 'none', md: 'block' } }}>
        <Stack direction="row" spacing={3}>
          { displayFooter
            ? (
              <Box className="map-footer-component">
                <FooterComponent includePadding={false} />
              </Box>
            )
            : null }
          <Fab onClick={handleFooterSelectorUpdate}>
            { displayFooter ? <CancelIcon /> : <InfoIcon /> }
          </Fab>
        </Stack>

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
