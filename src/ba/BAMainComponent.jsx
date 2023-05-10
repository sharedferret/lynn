import React from 'react';
import { Box } from '@mui/material';
import { Helmet } from 'react-helmet';

import BAMainContentComponent from './BAMainContentComponent';

export default function BAMainComponent() {
  return (
    <Box
      component="main"
      margin="auto"
      sx={{ flexGrow: 1, pt: { xs: 14, md: 5 } }}
    >

      <Helmet>
        <title>BA Logos Action Helper - lynn.pet</title>
        <meta name="description" content="Going on a Baldesion Arsenal run? Start here to find out what logos actions you should bring, and how to make them." />
        <meta property="og:title" content="BA Logos Action Helper" />
        <meta property="og:url" content="https://lynn.pet/ba" />
        <meta property="og:image" content="https://lynn.pet/assets/logosactions/doubleedge.png" />
        <meta property="og:description" content="Going on a Baldesion Arsenal run? Start here to find out what logos actions you should bring, and how to make them." />
        <meta property="og:site_name" content="lynn.pet!" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@reflexyui" />
      </Helmet>

      <BAMainContentComponent />
    </Box>

  );
}
