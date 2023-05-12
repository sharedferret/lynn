import React from 'react';
import {
  Box, Paper, Stack, Typography,
} from '@mui/material';
import { Helmet } from 'react-helmet';

export default function MainPageComponent() {
  const renderIntroParagraph = ((textSize) => (
    <Paper elevation={3}>
      <Stack p={5} spacing={2}>
        <Typography textAlign="left" fontSize={textSize}>
          Welcome to lynn.pet, a home for tools to help with Final Fantasy XIV side
          content - primarily Eureka (Baldesion Arsenal) and Bozja (Delubrum Reginae
          Savage). Find out how to build and gather materials for Lost Actions and
          Logos Actions, what to bring for Baldesion Arsenal or Delubrum Reginae
          Savage runs, when the next Cassie or Crab spawn is, and more!
        </Typography>
        <Typography textAlign="left" fontSize={textSize}>
          Looking for a group to run BA or DRS with? Most of the content on this site
          was designed for runs on
          {' '}
          <a
            href="https://discord.gg/thehelplines"
            target="_blank"
            rel="noreferrer"
          >
            The Help Lines

          </a>
          {' '}
          on Primal.
        </Typography>
        <Typography textAlign="left" fontSize={textSize}>
          Built by Lynn Kaneko @ Exodus. Issues/suggestions? You can reach out to me
          on Discord (Lynn#0001).
        </Typography>
      </Stack>
    </Paper>
  ));

  /**
   * <Box maxWidth={600} margin="auto">

      </Box>
   */
  return (
    <Box flexGrow={1} height="100%" sx={{ pt: { xs: 14, md: 5 } }}>
      <Helmet bodyAttributes={{ style: 'background-color : #ffb0a9' }}>
        <meta name="description" content="A collection of tools for Final Fantasy XIV side content created by Lynn Kaneko @ Exodus" />
        <meta property="og:title" content="lynn.pet!" />
        <meta property="og:url" content="https://lynn.pet/" />
        <meta property="og:image" content="https://lynn.pet/logo.png" />
        <meta property="og:description" content="A collection of tools for Final Fantasy XIV side content created by Lynn Kaneko @ Exodus" />
        <meta property="og:site_name" content="lynn.pet!" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@reflexyui" />
        <title>lynn.pet!</title>
      </Helmet>
      <Box>
        <Typography variant="h3" fontWeight={700}>FFXIV Field Operations Assistant</Typography>
      </Box>
      <Box pl={5} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Stack direction="row">
          <Box minWidth={400} width={600} maxWidth={600} pt={10}>
            {renderIntroParagraph(18)}
          </Box>

          <Box maxWidth="70%">
            <img
              src={`${process.env.PUBLIC_URL}/assets/lynn.jpg`}
              alt="lynn.pet!"
            />
          </Box>

        </Stack>
      </Box>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Stack width="100%" spacing={2} pt={5}>
          {renderIntroParagraph(20)}
          <Box width="100%">
            <img
              src={`${process.env.PUBLIC_URL}/assets/lynn.jpg`}
              alt="lynn.pet!"
            />
          </Box>
        </Stack>
      </Box>

    </Box>
  );
}
