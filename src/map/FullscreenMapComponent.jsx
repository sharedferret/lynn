import React, { useRef, useState } from 'react';

import 'leaflet/dist/leaflet.css';
import {
  Circle,
  ImageOverlay,
  MapContainer, Marker, Polygon, Polyline, Popup, Tooltip,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import TooltipBaseComponent from './TooltipBaseComponent';
import PolygonDrawingComponent from './PolygonDrawingComponent';
import PolygonCoordinatesDisplay from './PolygonCoordinatesDisplay';

// Hack to support leaflet, see https://github.com/PaulLeCam/react-leaflet/issues/255
/* eslint-disable no-underscore-dangle, global-require, comma-dangle */
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
/* eslint-enable no-underscore-dangle, global-require, comma-dangle */

function PopupHelper({ markerRef }) {
  React.useEffect(() => {
    if (markerRef?.current) {
      // Small timeout to ensure marker is fully initialized
      // There has to be a better way to do this...
      setTimeout(() => {
        if (markerRef.current) {
          markerRef.current.openPopup();
        }
      }, 100);
    }
  }, [markerRef]);
  return null;
}

function LocationMarker({ handleMouseMove }) {
  const map = useMapEvents({
    mousemove: (e) => {
      handleMouseMove(e);
    },
    moveend: () => {
      const center = map.getCenter();
      const zoom = map.getZoom();

      const params = new URLSearchParams(window.location.search);
      params.set('x', center.lng.toFixed(2));
      params.set('y', center.lat.toFixed(2));
      params.set('zoom', zoom.toFixed(1));

      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState({ path: newUrl }, '', newUrl);
    },
    zoomend: () => {
      const center = map.getCenter();
      const zoom = map.getZoom();

      const params = new URLSearchParams(window.location.search);
      params.set('x', center.lng.toFixed(2));
      params.set('y', center.lat.toFixed(2));
      params.set('zoom', zoom.toFixed(1));

      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState({ path: newUrl }, '', newUrl);
    },
    popupopen: (e) => {
      // Push popup id to query params
      const params = new URLSearchParams(window.location.search);
      params.set('poi', e.popup.options.id);

      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState({ path: newUrl }, '', newUrl);
    },
    popupclose: () => {
      // Remove popup id from query params
      const params = new URLSearchParams(window.location.search);
      params.delete('poi');

      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState({ path: newUrl }, '', newUrl);
    },
  });

  return null;
}

export default function FullscreenMapComponent({
  mapData,
  mapParameters,
  displayLabels,
  selectedLayers,
  handleMouseMove,
  initialMapPosition,
}) {
  const markers = [];
  const annotations = [];
  const markerRef = useRef(null);

  const shouldDisplayPolygonDrawingComponent = false;

  // State for polygon drawing
  const [polygonCoordinates, setPolygonCoordinates] = useState(null);

  // Handle when polygon drawing is complete
  const handlePolygonComplete = (vertices) => {
    setPolygonCoordinates(vertices);
  };

  // Close the coordinates display
  const handleCloseCoordinates = () => {
    setPolygonCoordinates(null);
  };

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
          ref={marker['@id'] === initialMapPosition?.poi ? markerRef : null}
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
          <Popup m={0} id={marker['@id']}>
            <TooltipBaseComponent
              markerData={marker}
              icon={marker.iconOverride ? marker.iconOverride : mapData[markerType].markerIcon}
              type={markerType}
            />
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
            case 'polygon':
              return (
                <Polygon
                  key={annotation['@id']}
                  pathOptions={{
                    fillColor: annotation.color,
                    color: annotation.color,
                    fillOpacity: 0.2,
                  }}
                  positions={annotation.path.map((point) => [point[1], point[0]])}
                >
                  <Popup m={0} id={annotation['@id']}>
                    <TooltipBaseComponent
                      markerData={annotation.popup}
                      type={markerType}
                      icon={annotation.popup.icon}
                    />
                  </Popup>
                </Polygon>
              );
            default:
              return null;
          }
        }));
      }
    }
  });

  const initialMapSettings = {
    lat: initialMapPosition?.lat || mapParameters.center.lat,
    lon: initialMapPosition?.lon || mapParameters.center.lon,
    zoom: initialMapPosition?.zoom || mapParameters.zoom.default,
  };

  return (
    <MapContainer
      className="full-screen-map"
      crs={L.CRS.Simple}
      center={[initialMapSettings.lat, initialMapSettings.lon]}
      zoom={initialMapSettings.zoom}
      minZoom={mapParameters.zoom.min}
      maxZoom={mapParameters.zoom.max}
      zoomDelta={mapParameters.zoom.delta}
      zoomSnap={mapParameters.zoom.snap}
      wheelPxPerZoomLevel={mapParameters.zoom.scrollPx}
    >
      <PopupHelper markerRef={markerRef} />
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
      {shouldDisplayPolygonDrawingComponent
        ? <PolygonDrawingComponent onPolygonComplete={handlePolygonComplete} />
        : null}
      {shouldDisplayPolygonDrawingComponent
        ? (
          <PolygonCoordinatesDisplay
            coordinates={polygonCoordinates}
            onClose={handleCloseCoordinates}
          />
        )
        : null}

    </MapContainer>
  );
}
