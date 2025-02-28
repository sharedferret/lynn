import React from 'react';

import 'leaflet/dist/leaflet.css';
import {
  ImageOverlay,
  MapContainer, Marker, Popup, Tooltip,
} from 'react-leaflet';
import L from 'leaflet';

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

export default function FullscreenMapComponent({ selectedLayers }) {
  const markers = [];

  // Add all json markers to a flat markers array to display on the map
  // TODO: When we add the LayerSelector we'll need to update this to include/exclude layers
  // TODO: Watch performance on this, since we need to update the full markers array every time
  // TODO: Only include icon if it's included, otherwise adjust the tooltip anchor appropriately
  Object.keys(data.mapData).forEach((markerType) => {
    if (selectedLayers.includes(markerType)) {
      // Push all markers of this type to the markers array
      markers.push(...(data.mapData[markerType].waymarks.map((marker) => (
        <Marker
          key={marker['@id']}
          position={[marker.position.y, marker.position.x]}
          icon={
            L.icon({
              iconUrl: `${process.env.PUBLIC_URL}/assets/maps/markers/${data.mapData[markerType].markerIcon}`,
              iconSize: [32, 32],
              iconAnchor: [16, 16],
              popupAnchor: [0, -8],
              tooltipAnchor: [4, 0],
            })
          }
        >
          <Popup>
            {marker.name}
          </Popup>
          <Tooltip permanent>
            {marker.name}
          </Tooltip>
        </Marker>
      ))));
    }
  });

  const mapParameters = data.parameters;

  return (
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
      {markers}
    </MapContainer>
  );
}
