import React from 'react';
import { Box } from '@mui/material';
import { Helmet } from 'react-helmet';
import MapPageComponent from './map/MapPageComponent';

export default function BAPortalMapComponent() {
  return (
    <Box flexGrow={1} height="100%">
      <Helmet bodyAttributes={{ style: 'background-color : #000' }}>
        <meta name="description" content="Portal map for Baldesion Arsenal runs on the Primal data center" data-react-helmet="true" />
        <meta property="og:title" content="BA Portal Map" data-react-helmet="true" />
        <meta property="og:image" content="http://forays.info/assets/portalmap.jpg" data-react-helmet="true" />
        <meta property="og:description" content="Portal map for Baldesion Arsenal runs on the Primal data center" data-react-helmet="true" />
        <meta property="og:site_name" content="forays.info" data-react-helmet="true" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" data-react-helmet="true" />
        <meta name="twitter:creator" content="@reflexyui" data-react-helmet="true" />
        <meta charset="utf-8" data-react-helmet="true" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width,initial-scale=1" data-react-helmet="true" />
        <meta name="theme-color" content="#000000" data-react-helmet="true" />
        <meta name="BA Portal Map" content="Portal map for Baldesion Arsenal runs on the Primal data center" data-react-helmet="true" />
        <link rel="apple-touch-icon" href="/logo192.png" data-react-helmet="true" />
        <link rel="manifest" href="/site.webmanifest" />
        <title>BA Portal Map - forays.info</title>
      </Helmet>
      <Box maxWidth={1400} minWidth={800} height="100%" margin="auto" sx={{ backgroundColor: '#000' }}>
        <MapPageComponent
          mapId="hydatos"
          inputSelectedLayers={['baPortals', 'aetherytes']}
        />
      </Box>
    </Box>
  );
}
