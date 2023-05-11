import './App.css';
import { Helmet } from 'react-helmet';
import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from 'react-router-dom';

import MainPageComponent from './MainPageComponent';
import ForecastMainComponent from './forecast/ForecastMainComponent';
import BAMainComponent from './ba/BAMainComponent';
import MainComponent from './MainComponent';
import FavorableWeatherFinderComponent from './weather_finder/FavorableWeatherFinder';
import BAPortalMapComponent from './BAPortalMapComponent';
import ResultsFilter from './forecast/lib/ResultsFilter';
import LynnReferenceComponent from './reference/LynnReferenceComponent';
import DRSHolsterMainComponent from './drs/DRSHolsterMainComponent';
import BozjaLostActionHelperComponent from './drs/BozjaLostActionHelperComponent';
import EurekaLoadoutMainComponent from './eureka/EurekaLoadoutMainComponent';
import EurekaLogosActionHelperComponent from './eureka/EurekaLogosActionHelperComponent';

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
  },
  {
    path: '/eureka/loadout',
    element: <WrappedMainComponent component={<EurekaLoadoutMainComponent />} page="eurekaloadout" />,
  },
  {
    path: '/eureka/logos',
    element: <WrappedMainComponent component={<EurekaLogosActionHelperComponent />} page="eurekalogosaction" />,
    children: [
      {
        path: '/eureka/logos/:logosaction',
        element: <WrappedMainComponent component={<EurekaLogosActionHelperComponent />} page="eurekalogosaction" />,
      },
    ],
  },
  {
    path: '/drs/holster',
    element: <WrappedMainComponent component={<DRSHolsterMainComponent />} page="drsholster" />,
    children: [
      {
        path: '/drs/holster/c',
        element: <WrappedMainComponent component={<DRSHolsterMainComponent />} page="drsholster" />,
      },
      {
        path: '/drs/holster/c/:holsterstring',
        element: <WrappedMainComponent component={<DRSHolsterMainComponent />} page="drsholster" />,
      },
      {
        path: '/drs/holster/:holstertype/:holstername',
        element: <WrappedMainComponent component={<DRSHolsterMainComponent />} page="drsholster" />,
      },
    ],
  },
  {
    path: '/bozja/lostaction',
    element: <WrappedMainComponent component={<BozjaLostActionHelperComponent />} page="bozjalostaction" />,
    children: [
      {
        path: '/bozja/lostaction/:lostaction',
        element: <WrappedMainComponent component={<BozjaLostActionHelperComponent />} page="bozjalostaction" />,
      },
    ],
  },
  {
    path: '/weather-finder',
    element: <WrappedMainComponent component={<FavorableWeatherFinderComponent />} page="weatherfinder" />,
  },
  {
    path: '/portals',
    element: <WrappedMainComponent component={<BAPortalMapComponent />} page="portals" />,
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
]);

function App() {
  const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
  const [mode, setMode] = React.useState(darkThemeMq.matches ? 'dark' : 'light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
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

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Helmet>
          <title>lynn.pet!</title>
          <meta name="description" content="A collection of tools for Final Fantasy XIV side content created by Lynn Kaneko @ Exodus" />
          <meta property="og:title" content="lynn.pet!" />
          <meta property="og:url" content="https://lynn.pet/" />
          <meta property="og:image" content="https://lynn.pet/logo.png" />
          <meta property="og:description" content="A collection of tools for Final Fantasy XIV side content created by Lynn Kaneko @ Exodus" />
          <meta property="og:site_name" content="lynn.pet!" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:creator" content="@reflexyui" />
        </Helmet>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}

export default App;
