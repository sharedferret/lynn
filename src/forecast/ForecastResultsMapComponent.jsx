import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function ForecastResultsMapComponent({ filter }) {
  return (
    <Box width="90%" maxWidth={800}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>Map</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box className="MapBox">
            <img
              className="MapImage"
              src={`${process.env.PUBLIC_URL}/assets/maps/${filter.map}`}
              alt={filter.name}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default ForecastResultsMapComponent;
