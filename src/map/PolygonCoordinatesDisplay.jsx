import React from 'react';

function PolygonCoordinatesDisplay({ coordinates, onClose }) {
  if (!coordinates || coordinates.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        zIndex: 1000,
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
        maxHeight: '300px',
        overflowY: 'auto',
        maxWidth: '500px',
      }}
    >
      <h3 style={{ margin: '0 0 10px 0' }}>Polygon Coordinates</h3>
      <div style={{ marginBottom: '10px' }}>
        <button
          type="button"
          onClick={() => {
            const coordText = coordinates
              .map((coord) => `[${coord[1].toFixed(2)}, ${coord[0].toFixed(2)}]`)
              .join(',\n');
            navigator.clipboard.writeText(`[\n${coordText}\n]`);
          }}
          style={{ marginRight: '10px' }}
        >
          Copy to Clipboard
        </button>
        <button type="button" onClick={onClose}>Close</button>
      </div>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Point</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>X</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Y</th>
          </tr>
        </thead>
        <tbody>
          {coordinates.map((coord, index) => (
            <tr key={`point-${coord[0]}-${coord[1]}`}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{coord[1].toFixed(2)}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{coord[0].toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PolygonCoordinatesDisplay;
