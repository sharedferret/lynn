import React, { Suspense } from 'react';
import Box from '@mui/material/Box';
import { Helmet } from 'react-helmet';

const BAMainContentComponent = React.lazy(() => import('./BAMainContentComponent'));

export default function BAMainComponent({
  holster,
  encodedHolster,
  resetTimer,
}) {
  return (
    <Box
      component="main"
      margin="auto"
      sx={{ flexGrow: 1, pt: { xs: 14, md: 5 } }}
    >

      <Helmet>
        <title>BA Logos Action Helper - forays.info</title>
        <meta name="description" content="Going on a Baldesion Arsenal run? Start here to find out what logos actions you should bring, and how to make them." />
        <meta property="og:title" content="BA Logos Action Helper" />
        <meta property="og:url" content="https://forays.info/ba" />
        <meta property="og:image" content="https://forays.info/assets/logosactions/doubleedge.png" />
        <meta property="og:description" content="Going on a Baldesion Arsenal run? Start here to find out what logos actions you should bring, and how to make them." />
        <meta property="og:site_name" content="forays.info" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@reflexyui" />
      </Helmet>

      <Suspense fallback={<div>Loading...</div>}>
        <BAMainContentComponent
          holster={holster}
          encodedHolster={encodedHolster}
          resetTimer={resetTimer}
        />
      </Suspense>

    </Box>

  );
}
