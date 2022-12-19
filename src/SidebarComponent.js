import React from 'react';
import { Box, Button, Divider } from '@mui/material';
import { useNavigate } from "react-router-dom";

function SidebarComponent(props) {
  const navigate = useNavigate();

  const handleSidebarClick = (event, item) => {
    navigate('/' + item);
  }

  const mainSidebarContent = (
    <ul class="flex flex-col py-4">
      <li class="flex flex-row items-center h-12">
        <Box class="h-6 w-6"></Box>
        <span class="text-md uppercase font-semibold text-white">Baldesion Arsenal</span>
      </li>
      <li>
        <Button onClick={(e) => { handleSidebarClick(e, 'ba') }} class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300"><i class="bx bx-home"></i></span>
          <span class="text-md font-medium">Logos Action Helper</span>
        </Button>
      </li>
      <li>
        <Button onClick={(e) => { handleSidebarClick(e, 'portals') }} class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300"><i class="bx bx-home"></i></span>
          <span class="text-md font-medium">Portal Map</span>
        </Button>
      </li>
      
      <li class="flex flex-row items-center h-12">
        <Box class="h-6 w-6"></Box>
        <span class="text-md uppercase font-semibold text-white">Forays</span>
      </li>
      <li>
        <Button onClick={(e) => { handleSidebarClick(e, 'forecast') }} class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300"><i class="bx bx-home"></i></span>
          <span class="text-md font-medium">Expeditionary Forecast</span>
        </Button>
      </li>
      <li>
        <Button onClick={(e) => { handleSidebarClick(e, 'weather-finder') }} class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300"><i class="bx bx-home"></i></span>
          <span class="text-md font-medium">Advanced Weather Finder</span>
        </Button>
      </li>

      <li class="flex flex-row items-center h-12">
        <Box class="h-6 w-6"></Box>
        <span class="text-md uppercase font-semibold text-white">About</span>
      </li>
      <li>
        <Button onClick={(e) => { handleSidebarClick(e, '#') }} class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-300 hover:text-gray-100">
          <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-300"><i class="bx bx-home"></i></span>
          <span class="text-md font-medium">Lynn Kaneko @ Exodus</span>
        </Button>
      </li>
    </ul>
  );

  return (
    <Box>
      <div class="min-h-screen flex flex-row">
        <div class="flex flex-col w-64 bg-gray-800 overflow-hidden">
          <div class="flex items-center justify-center h-20">
            <a href="./">
              <h1 class="text-3xl text-red-200">lynn.pet!</h1>
            </a>
          </div>
          <Divider variant="middle" light={true} sx={{ bgcolor: "#999" }} />
          { mainSidebarContent }
        </div>
      </div>
    </Box>
    );
}

export default SidebarComponent;
