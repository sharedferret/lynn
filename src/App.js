import logo from './logo.svg';
import './App.css';
import SidebarComponent from './SidebarComponent';
import { Box, Drawer } from '@mui/material';

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

const theme = createTheme({
  typography: {
    fontFamily: [
      'Noto Sans',
      'sans-serif',
    ].join(','),
  }
});

const WrappedMainComponent = props => {
  const params = useParams();

  if (props.page === 'forecast') {
    const forecastFilter = ResultsFilter.getFilter(params.forecastfilter);
    return (
      <MainComponent component={props.component} page={props.page} forecastfilter={forecastFilter} />
    );
  } else if (props.page === 'reference') {
    return (
      <MainComponent component={props.component} page={props.page} type={params.type} />
    );
  }

  return (
    <MainComponent component={props.component} page={props.page} />
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <WrappedMainComponent component={<MainPageComponent />} page='main' />,
  },
  {
    path: '/forecast',
    element: <WrappedMainComponent component={<ForecastMainComponent />} page='forecast' />,
    children: [
      {
        path: '/forecast/:forecastfilter',
        element: <WrappedMainComponent component={<ForecastMainComponent />} page='forecast' />,
      }
    ]
  },
  {
    path: '/ba',
    element: <WrappedMainComponent component={<BAMainComponent />} page='ba' />,
  },
  {
    path: '/weather-finder',
    element: <WrappedMainComponent component={<FavorableWeatherFinderComponent />} page='weatherfinder' />
  },
  {
    path: '/portals',
    element: <WrappedMainComponent component={<BAPortalMapComponent />} page='portals' />
  },
  {
    path: '/reference',
    element: <WrappedMainComponent component={<LynnReferenceComponent />} page='reference' />,
    children: [
      {
        path: '/reference/:type',
        element: <WrappedMainComponent component={<LynnReferenceComponent />} page='reference' />,
      }
    ]
  }
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
