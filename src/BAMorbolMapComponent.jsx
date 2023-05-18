import React from 'react';
import { Box } from '@mui/material';
import { Helmet } from 'react-helmet';

export default function BAMorbolMapComponent() {
  return (
    <Box flexGrow={1} height="100%" sx={{ pt: { xs: 14, md: 5 } }}>
      <Helmet bodyAttributes={{ style: 'background-color : #000' }}>
        <meta name="description" content="Morbol map for Baldesion Arsenal runs on the Primal data center" data-react-helmet="true" />
        <meta property="og:title" content="BA Morbol Map" data-react-helmet="true" />
        <meta property="og:image" content="http://lynn.pet/assets/morbolmap.jpg" data-react-helmet="true" />
        <meta property="og:description" content="Morbol map for Baldesion Arsenal runs on the Primal data center" data-react-helmet="true" />
        <meta property="og:site_name" content="lynn.pet!" data-react-helmet="true" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" data-react-helmet="true" />
        <meta name="twitter:creator" content="@reflexyui" data-react-helmet="true" />
        <meta charset="utf-8" data-react-helmet="true" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width,initial-scale=1" data-react-helmet="true" />
        <meta name="theme-color" content="#000000" data-react-helmet="true" />
        <meta name="BA Morbol Map" content="Morbol map for Baldesion Arsenal runs on the Primal data center" data-react-helmet="true" />
        <link rel="apple-touch-icon" href="/logo192.png" data-react-helmet="true" />
        <link rel="manifest" href="/site.webmanifest" />
        <title>BA Morbol Map - lynn.pet!</title>
      </Helmet>
      <Box maxWidth={1400} minWidth={800} height="100%" margin="auto" sx={{ backgroundColor: '#000' }}>
        <img src={`${process.env.PUBLIC_URL}/assets/morbolmap.jpg`} alt="BA Morbol Map" style={{ maxWidth: '100%' }} />
      </Box>
    </Box>
  );
}
