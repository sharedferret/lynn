import './App.css';
import { Helmet } from 'react-helmet';
import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';

import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from 'react-router-dom';

import i18n from './i18n';

import MainPageComponent from './MainPageComponent';
import ForecastMainComponent from './forecast/ForecastMainComponent';
import BAMainComponent from './ba/BAMainComponent';
import MainComponent from './MainComponent';
import FavorableWeatherFinderContainerComponent from './weather_finder/FavorableWeatherFinderContainerComponent';
import BAPortalMapComponent from './BAPortalMapComponent';
import ResultsFilter from './forecast/lib/ResultsFilter';
import LynnReferenceComponent from './reference/LynnReferenceComponent';
import BozjaLostActionHelperContainerComponent from './drs/BozjaLostActionHelperContainerComponent';
import EurekaLoadoutMainComponent from './eureka/EurekaLoadoutMainComponent';
import EurekaLogosActionHelperContainerComponent from './eureka/EurekaLogosActionHelperContainerComponent';
import ChangelogComponent from './ChangelogComponent';
import DRSNewHolsterMainComponent from './drs/DRSNewHolsterMainComponent';
import DRSRunHolsterCreatorContainerComponent from './drs/create/DRSRunHolsterCreatorContainerComponent';
import BAMorbolMapComponent from './BAMorbolMapComponent';
import MapPageComponent from './map/MapPageComponent';
import OccultCrescentGuideContainer from './occult/OccultCrescentGuideContainer';
import OccultPhantomJobHelperContainerComponent from './occult/phantom_jobs/OccultPhantomJobHelperContainerComponent';
import DRSAnyprogGuideContainer from './drs/anyprog/DRSAnyprogGuideContainer';

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function WrappedMainComponent({ component, page }) {
  const params = useParams();

  if (page === 'forecast') {
    const forecastFilter = ResultsFilter.getFilter(params.forecastfilter);
    return (
      <MainComponent
        component={component}
        page={page}
        forecastFilter={forecastFilter}
        colorModeContext={ColorModeContext}
      />
    );
  } if (page === 'occult') {
    return (
      <MainComponent
        component={component}
        page={page}
        guidePage={params.guidepage}
        colorModeContext={ColorModeContext}
      />
    );
  } if (page === 'occultphantomjob') {
    return (
      <MainComponent
        component={component}
        phantomJob={params.phantomjob}
        colorModeContext={ColorModeContext}
      />
    );
  } if (page === 'reference') {
    return (
      <MainComponent
        component={component}
        page={page}
        type={params.type}
        colorModeContext={ColorModeContext}
      />
    );
  } if (page === 'drsholster') {
    return (
      <MainComponent
        component={component}
        holster={
          {
            host: params.host,
            name: params.holstername,
            type: params.holstertype,
          }
        }
        encodedHolster={params.holsterstring}
        colorModeContext={ColorModeContext}
      />
    );
  } if (page === 'bozjalostaction') {
    return (
      <MainComponent
        component={component}
        lostAction={params.lostaction}
        colorModeContext={ColorModeContext}
      />
    );
  } if (page === 'eurekalogosaction') {
    return (
      <MainComponent
        component={component}
        logosAction={params.logosaction}
        colorModeContext={ColorModeContext}
      />
    );
  } if (page === 'eurekaloadout') {
    return (
      <MainComponent
        component={component}
        encodedHolster={params.holsterstring}
        colorModeContext={ColorModeContext}
      />
    );
  } if (page === 'ba') {
    return (
      <MainComponent
        component={component}
        holster={
          {
            role: params.role,
            tray: params.tray,
          }
        }
        encodedHolster={params.holsterstring}
        colorModeContext={ColorModeContext}
      />
    );
  } if (page === 'map') {
    return (
      <MainComponent
        component={component}
        mapId={params.mapId}
        page={page}
        colorModeContext={ColorModeContext}
      />
    );
  }

  return (
    <MainComponent component={component} page={page} colorModeContext={ColorModeContext} />
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <WrappedMainComponent component={<MainPageComponent />} page="main" />,
  },
  {
    path: '/occult/phantomjob',
    element: <WrappedMainComponent component={<OccultPhantomJobHelperContainerComponent />} page="occultphantomjob" />,
    children: [
      {
        path: '/occult/phantomjob/:phantomjob',
        element: <WrappedMainComponent component={<OccultPhantomJobHelperContainerComponent />} page="occultphantomjob" />,
      },
    ],
  },
  {
    path: '/occult/guide',
    element: <WrappedMainComponent component={<OccultCrescentGuideContainer />} page="occult" />,
    children: [
      {
        path: '/occult/guide/:guidepage',
        element: <WrappedMainComponent component={<OccultCrescentGuideContainer />} page="occult" />,
      },
    ],
  },
  {
    path: '/forecast',
    element: <WrappedMainComponent component={<ForecastMainComponent />} page="forecast" />,
    children: [
      {
        path: '/forecast/:forecastfilter',
        element: <WrappedMainComponent component={<ForecastMainComponent />} page="forecast" />,
      },
    ],
  },
  {
    path: '/ba',
    element: <WrappedMainComponent component={<BAMainComponent />} page="ba" />,
    children: [
      {
        path: '/ba/:role/:tray',
        element: <WrappedMainComponent component={<BAMainComponent />} page="ba" />,
      },
    ],
  },
  {
    path: '/eureka/loadout',
    element: <WrappedMainComponent component={<EurekaLoadoutMainComponent />} page="eurekaloadout" />,
    children: [
      {
        path: '/eureka/loadout/:holsterstring',
        element: <WrappedMainComponent component={<EurekaLoadoutMainComponent />} page="eurekaloadout" />,
      },
    ],
  },
  {
    path: '/eureka/logos',
    element: <WrappedMainComponent component={<EurekaLogosActionHelperContainerComponent />} page="eurekalogosaction" />,
    children: [
      {
        path: '/eureka/logos/:logosaction',
        element: <WrappedMainComponent component={<EurekaLogosActionHelperContainerComponent />} page="eurekalogosaction" />,
      },
    ],
  },
  {
    path: '/createdrsholsters',
    element: <WrappedMainComponent component={<DRSRunHolsterCreatorContainerComponent />} page="drsholster" />,
  },
  {
    path: '/drs',
    element: <WrappedMainComponent component={<DRSNewHolsterMainComponent />} page="drsholster" />,
    children: [
      {
        path: '/drs/holster',
        element: <WrappedMainComponent component={<DRSNewHolsterMainComponent />} page="drsholster" />,
        children: [
          {
            path: '/drs/holster/c',
            element: <WrappedMainComponent component={<DRSNewHolsterMainComponent />} page="drsholster" />,
          },
          {
            path: '/drs/holster/c/:holsterstring',
            element: <WrappedMainComponent component={<DRSNewHolsterMainComponent />} page="drsholster" />,
          },
          {
            path: '/drs/holster/:host/:holstertype/:holstername',
            element: <WrappedMainComponent component={<DRSNewHolsterMainComponent />} page="drsholster" />,
          },
        ],
      },
    ],
  },
  {
    path: '/drs/anyprog',
    element: <WrappedMainComponent component={<DRSAnyprogGuideContainer />} page="drsanyprogguide" />,
  },
  {
    path: '/bozja/lostaction',
    element: <WrappedMainComponent component={<BozjaLostActionHelperContainerComponent />} page="bozjalostaction" />,
    children: [
      {
        path: '/bozja/lostaction/:lostaction',
        element: <WrappedMainComponent component={<BozjaLostActionHelperContainerComponent />} page="bozjalostaction" />,
      },
    ],
  },
  {
    path: '/map',
    element: <WrappedMainComponent component={<MapPageComponent />} page="map" />,
    children: [
      {
        path: '/map/:mapId',
        element: <WrappedMainComponent component={<MapPageComponent />} page="map" />,
      },
    ],
  },
  {
    path: '/weather-finder',
    element: <WrappedMainComponent component={<FavorableWeatherFinderContainerComponent />} page="weatherfinder" />,
  },
  {
    path: '/portals',
    element: <WrappedMainComponent component={<BAPortalMapComponent />} page="portals" />,
  },
  {
    path: '/morbols',
    element: <WrappedMainComponent component={<BAMorbolMapComponent />} page="portals" />,
  },
  {
    path: '/reference',
    element: <WrappedMainComponent component={<LynnReferenceComponent />} page="reference" />,
    children: [
      {
        path: '/reference/:type',
        element: <WrappedMainComponent component={<LynnReferenceComponent />} page="reference" />,
      },
    ],
  },
  {
    path: '/changelog',
    element: <WrappedMainComponent component={<ChangelogComponent />} page="changelog" />,
  },
]);

function setupLocalStorage() {
  useEffect(() => {
    const existingThemePref = localStorage.getItem('theme');
    if (!existingThemePref) {
      const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
      localStorage.setItem('theme', darkThemeMq.matches ? 'system' : 'light');
    }

    const existingUniversalisServerPref = localStorage.getItem('universalisServer');
    if (!existingUniversalisServerPref) {
      localStorage.setItem('universalisServer', 'North America');
    }
  });
}

function App() {
  setupLocalStorage();

  let modeToSet = localStorage.getItem('theme') ?? 'light';
  if (localStorage.getItem('theme') === 'system') {
    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
    modeToSet = darkThemeMq.matches ? 'dark' : 'light';
  }

  const [mode, setMode] = React.useState(modeToSet);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        localStorage.setItem('theme', mode === 'light' ? 'dark' : 'light');
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      setColorMode: (newMode) => {
        if (newMode === 'system') {
          const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
          setMode(darkThemeMq.matches ? 'dark' : 'light');
        } else {
          setMode(newMode);
        }
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () => createTheme({
      palette: {
        mode,
      },
      typography: {
        fontFamily: [
          'Noto Sans',
          'sans-serif',
        ].join(','),
        button: {
          textTransform: 'none',
          fontSize: 16,
        },
      },
      button: {
        fontSize: 16,
      },
      components: {
        // Name of the component
        MuiButton: {
          styleOverrides: {
            // Name of the slot
            root: {
              // Some CSS
              fontSize: '16',
            },
          },
        },
      },
    }),
    [mode],
  );

  useEffect(() => {
    document.body.setAttribute('data-theme', mode);
  }, [mode]);

  // Set up analytics
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/um.js';
    script.defer = true;
    script.setAttribute('data-website-id', 'b8340562-63d2-4def-b4f5-f1d4bf5eb06f');
    script.setAttribute('data-host-url', 'https://api-gateway.umami.dev/api/send');
    script.setAttribute('data-exclude-search', true);

    document.body.appendChild(script);
  });

  return (
    <I18nextProvider i18n={i18n}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Helmet>
            <title>FFXIV Field Operations Assistant - forays.info</title>
            <meta name="description" content="A collection of tools for Final Fantasy XIV side content created by Lynn Kaneko @ Exodus" />
            <meta property="og:title" content="forays.info" />
            <meta property="og:url" content="https://forays.info/" />
            <meta property="og:image" content="https://forays.info/logo.png" />
            <meta property="og:description" content="A collection of tools for Final Fantasy XIV side content created by Lynn Kaneko @ Exodus" />
            <meta property="og:site_name" content="forays.info" />
          </Helmet>
          <RouterProvider router={router} />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </I18nextProvider>
  );
}

export default App;
