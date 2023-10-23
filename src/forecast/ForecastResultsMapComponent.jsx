import React from 'react';
import {
  Accordion, AccordionDetails, AccordionSummary, Box, Typography,
} from '@mui/material';
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
