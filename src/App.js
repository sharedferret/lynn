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
  const forecastFilter = ResultsFilter.getFilter(params.forecastfilter);
  console.log('params', forecastFilter);

  return (
    <MainComponent component={props.component} page={props.page} forecastfilter={forecastFilter} />
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
