import React from 'react';
import { Box } from '@mui/material';
import './MapContainerComponent.css';

import 'leaflet/dist/leaflet.css';
import {
  ImageOverlay,
  MapContainer, Marker, Popup, Tooltip,
} from 'react-leaflet';
import L from 'leaflet';
// import MarkerClusterGroup from 'react-leaflet-cluster';

import data from './lib/poi/bsf.json';

// Hack to support leaflet, see https://github.com/PaulLeCam/react-leaflet/issues/255
/* eslint-disable no-underscore-dangle, global-require, comma-dangle */
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
/* eslint-enable no-underscore-dangle, global-require, comma-dangle */

export default function MapContainerComponent() {
  const aetheryteIcon = L.icon({
    iconUrl: `${process.env.PUBLIC_URL}/assets/maps/markers/aetheryte.png`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -8],
    tooltipAnchor: [4, 0],
  });

  const aetheryteMarkers = data.mapData.aetherytes.waymarks.map((aetheryte) => (
    <Marker
      key={aetheryte['@id']}
      position={[aetheryte.position.y, aetheryte.position.x]}
      icon={aetheryteIcon}
    >
      <Popup>
        {aetheryte.name}
      </Popup>
      <Tooltip permanent>
        {aetheryte.name}
      </Tooltip>
    </Marker>
  ));

  const mapParameters = data.parameters;

  return (
    <Box
      component="main"
      margin="auto"
      sx={{ flexGrow: 1, pt: { xs: 10, md: 0 } }}
    >
      <MapContainer
        className="full-screen-map"
        crs={L.CRS.Simple}
        center={[mapParameters.center.lat, mapParameters.center.lon]}
        zoom={mapParameters.zoom.default}
        minZoom={mapParameters.zoom.min}
        maxZoom={mapParameters.zoom.max}
        zoomDelta={mapParameters.zoom.delta}
        zoomSnap={mapParameters.zoom.snap}
        wheelPxPerZoomLevel={mapParameters.zoom.scrollPx}
      >
        <ImageOverlay
          url={`${process.env.PUBLIC_URL}/assets/maps/${mapParameters.imageUrl}`}
          noWrap
          bounds={
            [
              [mapParameters.bounds.min.lat,
                mapParameters.bounds.min.lon,
              ], [
                mapParameters.bounds.max.lat,
                mapParameters.bounds.max.lon,
              ],
            ]
          }
        />
        {aetheryteMarkers}
      </MapContainer>
    </Box>

  );
}

/**
 * Some notes on this:
 * - We'll need a layer selector. Probably also need a map switcher.
 * - Need to add support for regions as well as points, for CE/FATE boundaries and mob spawn areas.
 * - Need to make an inline version of this for the forecast/ section.
 */
