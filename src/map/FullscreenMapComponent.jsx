import React from 'react';

import 'leaflet/dist/leaflet.css';
import {
  Circle,
  ImageOverlay,
  MapContainer, Marker, Polyline, Popup, Tooltip,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';

// Hack to support leaflet, see https://github.com/PaulLeCam/react-leaflet/issues/255
/* eslint-disable no-underscore-dangle, global-require, comma-dangle */
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
/* eslint-enable no-underscore-dangle, global-require, comma-dangle */

function LocationMarker({ handleMouseMove }) {
  useMapEvents({
    mousemove: (e) => {
      handleMouseMove(e);
    },
  });
}

export default function FullscreenMapComponent({
  mapData,
  mapParameters,
  displayLabels,
  selectedLayers,
  handleMouseMove,
}) {
  const markers = [];
  const annotations = [];

  // Add all json markers to a flat markers array to display on the map
  Object.keys(mapData).forEach((markerType) => {
    if (selectedLayers.includes(markerType)) {
      // Push all markers of this type to the markers array
      /**
       * Most options for these markers are set in the map's json file.
       * - markerIcon: The icon image displayed. Can be overridden for a specific marker with
       *     iconOverride.
       * - circle: If present, draws a circle around the marker.
       *     (e.g. FATE/Skirmish/CE/NM boundaries)
       * - position: Corresponds to the x/y values in-game. Since we're using leaflet (and have
       *     to pretend that we're using latitude/longitude values), the y value needs to be
       *     provided as negative.
       *
       * TODO: Eventually we'll add support for actual tooltips, but for now it just shows
       *   the marker's name.
       * NOTE: For region names, the marker will be slightly offset due to lacking an icon.
       */
      markers.push(...(mapData[markerType].waymarks.map((marker) => (
        <Marker
          key={marker['@id']}
          position={[marker.position.y, marker.position.x]}
          icon={
            L.icon({
              iconUrl: `${process.env.PUBLIC_URL}/assets/maps/markers/${
                marker.iconOverride ? marker.iconOverride : mapData[markerType].markerIcon
              }`,
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
            {displayLabels ? marker.name : ''}
          </Tooltip>
          {
            mapData[markerType].circle && (
              <Circle
                center={[marker.position.y, marker.position.x]}
                pathOptions={{
                  color: mapData[markerType].circle.color,
                  fillColor: mapData[markerType].circle.color,
                  fillOpacity: 0.2,
                  dashArray: '4, 4',
                }}
                radius={mapData[markerType].circle.radius}
              />
            )
          }
        </Marker>
      ))));

      /**
       * Add annotations, if they exist. These are things drawn on the map that aren't associated
       * with a specific marker.
       */
      if (mapData[markerType].annotations) {
        annotations.push(...mapData[markerType].annotations.map((annotation) => {
          switch (annotation.type) {
            case 'polyline':
              return (
                <Polyline
                  key={annotation['@id']}
                  pathOptions={{
                    color: '#fff',
                    fillColor: '#fff',
                    fillOpacity: 0.2,
                    dashArray: '4, 12',
                  }}
                  positions={annotation.path.map((point) => (
                    [point.y, point.x]
                  ))}
                />
              );
            case 'largeText':
              // TODO: Adjust font size with zoom. Or make these images, maybe?
              return (
                <Marker
                  key={annotation['@id']}
                  position={[annotation.position.y, annotation.position.x]}
                  icon={L.divIcon({
                    className: 'large-text',
                    html: `<div style="font-size:48pt;font-weight:bold;">${annotation.text}</div>`,
                    iconSize: [0, 0],
                    iconAnchor: [0, 0],
                    popupAnchor: [0, 0],
                    tooltipAnchor: [0, 0],
                  })}
                />
              );
            default:
              return null;
          }
        }));
      }
    }
  });

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
      <LocationMarker handleMouseMove={handleMouseMove} />
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
      {annotations}
    </MapContainer>
  );
}
