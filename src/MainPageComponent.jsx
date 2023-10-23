import React from 'react';
import {
  Box, Paper, Stack, Typography,
} from '@mui/material';
import { Helmet } from 'react-helmet';

export default function MainPageComponent() {
  function daysIntoYear(date) {
    return (
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
      ) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
  }

  function getPageThemeData() {
    const themeOptions = [
      {
        image: `${process.env.PUBLIC_URL}/assets/lynn.jpg`,
        imageCredit: 'Julian Mamanen',
        imageCreditLink: 'https://twitter.com/donotfeedlala',
        color: '#ffb0a9',
      },
      {
        image: `${process.env.PUBLIC_URL}/assets/bg2.jpg`,
        imageCredit: 'Temmie',
        imageCreditLink: 'https://twitter.com/tuyoki',
        color: '#e7fae2',
      },
      {
        image: `${process.env.PUBLIC_URL}/assets/bg3.jpg`,
        imageCredit: 'コマ🍀',
        imageCreditLink: 'https://www.tumblr.com/komama',
        color: '#e8c3ad',
      },
      {
        image: `${process.env.PUBLIC_URL}/assets/bg4.jpg`,
        imageCredit: 'つなこーん',
        imageCreditLink: 'https://www.pixiv.net/en/users/215544',
        color: '#ffede8',
      },
      {
        image: `${process.env.PUBLIC_URL}/assets/bg5.jpg`,
        imageCredit: 'みーしゃ/19',
        imageCreditLink: 'https://twitter.com/misiaaa19',
        color: '#bcd7ea',
      },
      {
        image: `${process.env.PUBLIC_URL}/assets/bg6.jpg`,
        imageCredit: 'そらに',
        imageCreditLink: 'https://twitter.com/srn_111',
        color: '#bbbbb8',
      },
      {
        image: `${process.env.PUBLIC_URL}/assets/bg7.jpg`,
        imageCredit: 'Shirogane Ryo',
        imageCreditLink: 'https://twitter.com/shiroganeryo',
        color: '#e2ced1',
      },
    ];
    const dayOfMonth = daysIntoYear(new Date());
    return themeOptions[(dayOfMonth) % themeOptions.length];
  }

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
          on Discord (@lynnkaneko).
        </Typography>
        <Typography textAlign="left" fontSize={textSize}>
          Home page artwork by
          {' '}
          <a href={getPageThemeData().imageCreditLink}>
            {getPageThemeData().imageCredit}
            !
          </a>
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
      <Helmet bodyAttributes={{ style: `background-color : ${getPageThemeData().color}` }}>
        <meta name="description" content="A collection of tools for Final Fantasy XIV side content created by Lynn Kaneko @ Exodus" />
        <meta property="og:title" content="lynn.pet!" />
        <meta property="og:url" content="https://lynn.pet/" />
        <meta property="og:image" content="https://lynn.pet/logo.png" />
        <meta property="og:description" content="A collection of tools for Final Fantasy XIV side content created by Lynn Kaneko @ Exodus" />
        <meta property="og:site_name" content="lynn.pet!" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@reflexyui" />
        <title>lynn.pet! - FFXIV Field Operations Assistant</title>
      </Helmet>
      <Box>
        <Typography variant="h3" fontWeight={700}>FFXIV Field Operations Assistant</Typography>
      </Box>
      <Box pl={5} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Stack direction="row">
          <Box minWidth={400} width={600} maxWidth={600} pt={10}>
            {renderIntroParagraph(18)}
          </Box>

          <Box maxWidth="70%" p={2}>
            <img
              src={getPageThemeData().image}
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
              src={getPageThemeData().image}
              alt="lynn.pet!"
            />
          </Box>
        </Stack>
      </Box>

    </Box>
  );
}
