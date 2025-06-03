import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import useTheme from '@mui/material/styles/useTheme';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

export default function MapZoneSelectorComponent({
  currentZone,
  handleZoneSelectorUpdate,
}) {
  const theme = useTheme();
  return (
    <Box
      className="map-zone-selector"
      sx={{
        mt: { xs: 4, md: 0 },
        height: { xs: 'calc(80dvh - 112px)', md: 'calc(80dvh - 32px)' },
        top: { xs: '40px', md: '80px' },
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Scrollbars universal>
        <FormGroup>
          <RadioGroup
            value={currentZone}
            onChange={(e) => handleZoneSelectorUpdate(e.target.value)}
          >
            <FormLabel>Occult Crescent</FormLabel>
            <FormControlLabel value="southhorn" control={<Radio />} label="South Horn" />
            <FormLabel>Bozja</FormLabel>
            <FormControlLabel value="zadnor" control={<Radio disabled />} label="Zadnor" />
            <FormControlLabel value="bsf" control={<Radio />} label="The Bozjan Southern Front" />
            <FormLabel>Eureka</FormLabel>
            <FormControlLabel value="hydatos" control={<Radio />} label="Eureka Hydatos" />
            <FormControlLabel value="pyros" control={<Radio disabled />} label="Eureka Pyros" />
            <FormControlLabel value="pagos" control={<Radio disabled />} label="Eureka Pagos" />
            <FormControlLabel value="anemos" control={<Radio disabled />} label="Eureka Anemos" />
          </RadioGroup>
        </FormGroup>
      </Scrollbars>
    </Box>
  );
}
