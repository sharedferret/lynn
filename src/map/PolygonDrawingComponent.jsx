import React, { useState, useEffect } from 'react';
import { useMapEvents, Polygon, Marker } from 'react-leaflet';
import L from 'leaflet';
// Note: leaflet-draw is imported in the main component file

function PolygonDrawingComponent({ onPolygonComplete }) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [vertices, setVertices] = useState([]);
  const [showDoneButton, setShowDoneButton] = useState(false);

  useEffect(() => {
    // Enable the "Done" button if we have at least 3 points (to form a polygon)
    setShowDoneButton(vertices.length >= 3);
  }, [vertices]);

  // Function to handle map clicks for drawing
  useMapEvents({
    click: (e) => {
      if (isDrawing) {
        const newVertex = [e.latlng.lat, e.latlng.lng];
        setVertices([...vertices, newVertex]);
      }
    },
  });

  // Start drawing polygon
  const startDrawing = () => {
    setIsDrawing(true);
    setVertices([]);
    setShowDoneButton(false);
  };

  // Complete polygon drawing
  const completeDrawing = () => {
    setIsDrawing(false);
    if (vertices.length >= 3 && onPolygonComplete) {
      onPolygonComplete(vertices);
    }
  };

  // Cancel drawing and reset
  const cancelDrawing = () => {
    setIsDrawing(false);
    setVertices([]);
    setShowDoneButton(false);
  };

  // Render markers for each vertex
  const vertexMarkers = vertices.map((vertex, index) => (
    <Marker
      // eslint-disable-next-line react/no-array-index-key
      key={`vertex-${index}`}
      position={vertex}
      icon={L.divIcon({
        className: 'vertex-marker',
        html: '<div style="background-color: #ff4081; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white;"></div>',
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      })}
    />
  ));

  return (
    <div>
      {/* Control panel */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 1000,
          backgroundColor: 'white',
          padding: '10px',
          borderRadius: '5px',
          boxShadow: '0 0 10px rgba(0,0,0,0.2)',
        }}
      >
        {!isDrawing ? (
          <button
            type="button"
            onClick={startDrawing}
            style={{ marginRight: '10px', padding: '5px 10px' }}
          >
            Draw Polygon
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={cancelDrawing}
              style={{ marginRight: '10px', padding: '5px 10px' }}
            >
              Cancel
            </button>
            {showDoneButton && (
              <button
                type="button"
                onClick={completeDrawing}
                style={{ padding: '5px 10px' }}
              >
                Done
              </button>
            )}
          </>
        )}
      </div>

      {/* Display polygon while drawing */}
      {vertices.length >= 2 && (
        <Polygon
          positions={vertices}
          pathOptions={{
            color: '#3388ff',
            weight: 2,
            opacity: 0.7,
            fillOpacity: 0.2,
          }}
        />
      )}

      {/* Display markers at each vertex */}
      {vertexMarkers}
    </div>
  );
}

export default PolygonDrawingComponent;
