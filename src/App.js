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

const theme = createTheme({
  typography: {
    fontFamily: [
      'Noto Sans',
      'sans-serif',
    ].join(','),
  }
});

const WrappedMainComponent = props => {
  return (
    <div className="App h-screen flex items-center justify-center">
    <Drawer variant="permanent">
      <SidebarComponent />
    </Drawer>
    
    <Box flexGrow={1} height={'100%'} sx={{backgroundColor: '#ddd'}} >
      {props.component}
    </Box>
  </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <WrappedMainComponent component={<MainPageComponent />} />,
  },
  {
    path: '/forecast',
    element: <WrappedMainComponent component={<ForecastMainComponent />} />,
    children: [
      {
        path: '/forecast/:filter',
        element: <WrappedMainComponent component={<ForecastMainComponent />} />,
      }
    ]
  },
  {
    path: '/ba',
    element: <WrappedMainComponent component={<BAMainComponent />} />,
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
