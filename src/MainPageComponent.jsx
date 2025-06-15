import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet';
import { useTranslation, Trans } from 'react-i18next';

export default function MainPageComponent() {
  const { t } = useTranslation('common');

  function getSiteName() {
    const host = window.location.hostname;

    if (host.indexOf('bozja.info') !== -1) {
      return 'bozja.info';
    }
    if (host.indexOf('forays.info') !== -1) {
      return 'forays.info';
    }
    return 'lynn.pet';
  }

  /**
   function daysIntoYear(date) {
    return (
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
      ) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
  }
  */

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
    // const dayOfMonth = daysIntoYear(new Date());
    // return themeOptions[(dayOfMonth) % themeOptions.length];
    const themeToDisplay = Math.floor(Math.random() * 7);
    return themeOptions[themeToDisplay];
  }

  const renderIntroParagraph = ((textSize, pageTheme) => (
    <Paper elevation={3}>
      <Stack p={5} spacing={2}>
        <Typography textAlign="left" fontSize={textSize}>
          <Trans i18nKey="main.intro.p1" ns="common" values={{ sitename: getSiteName() }} />
        </Typography>
        <Typography textAlign="left" fontSize={textSize}>
          <Trans
            i18nKey="main.intro.p2"
            ns="common"
            components={[
              <a
                href="https://discord.gg/thehelplines"
                target="_blank"
                rel="noreferrer"
              >
                The Help Lines
              </a>,
            ]}
          />
        </Typography>
        <Typography textAlign="left" fontSize={textSize}>
          <Trans i18nKey="main.intro.p3" ns="common" />
        </Typography>
        <Typography textAlign="left" fontSize={textSize}>
          <Trans
            i18nKey="main.intro.p4"
            ns="common"
            components={[
              <a
                href={pageTheme.imageCreditLink}
                target="_blank"
                rel="noreferrer"
              >
                {pageTheme.imageCredit}
                !
              </a>,
            ]}
            values={{
              artist: pageTheme.imageCredit,
            }}
          />
        </Typography>
      </Stack>
    </Paper>
  ));

  /**
   * <Box maxWidth={600} margin="auto">

      </Box>
   */
  const pageTheme = getPageThemeData();
  return (
    <Box flexGrow={1} height="100%" sx={{ pt: { xs: 14, md: 5 } }}>
      <Helmet bodyAttributes={{ style: `background-color : ${pageTheme.color}` }}>
        <meta name="description" content="Tools for FFXIV Occult Crescent, Forked Tower, Baldesion Arsenal, Delubrum Reginae Savage, and Eureka by Lynn Kaneko @ Exodus" />
        <meta name="keywords" content="FFXIV, Final Fantasy 14, Occult Crescent, Forked Tower, South Horn, Final Fantasy XIV, Eureka, Eureka Anemos, Eureka Pagos, Eureka Pyros, Eureka Hydatos, Bozjan Southern Front, Zadnor, Delubrum Reginae, Delubrum Reginae Savage, DRS Holsters, BA Loadout, NM Tracker, Fragment Farm" />
        <meta property="og:title" content={getSiteName()} />
        <meta property="og:url" content="https://lynn.pet/" />
        <meta property="og:image" content="https://lynn.pet/logo.png" />
        <meta property="og:description" content="Tools for FFXIV Baldesion Arsenal, Delubrum Reginae Savage, and Eureka by Lynn Kaneko @ Exodus" />
        <meta property="og:site_name" content="lynn.pet" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@reflexyui" />
        <title>
          {t('main.header.title', { sitename: getSiteName() })}
        </title>
      </Helmet>
      <Box>
        <Typography variant="h3" fontWeight={700}><Trans i18nKey="main.title" ns="common" /></Typography>
      </Box>
      <Box pl={5} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Stack direction="row">
          <Box minWidth={400} width={600} maxWidth={600} pt={10}>
            {renderIntroParagraph(18, pageTheme)}
          </Box>

          <Box maxWidth="70%" p={2}>
            <img
              src={pageTheme.image}
              alt="forays.info"
            />
          </Box>

        </Stack>
      </Box>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Stack width="100%" spacing={2} pt={5}>
          {renderIntroParagraph(20, pageTheme)}
          <Box width="100%">
            <img
              src={pageTheme.image}
              alt="lynn.pet"
            />
          </Box>
        </Stack>
      </Box>

    </Box>
  );
}
