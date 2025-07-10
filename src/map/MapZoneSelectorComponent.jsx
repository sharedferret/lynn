import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import useTheme from '@mui/material/styles/useTheme';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { useTranslation } from 'react-i18next';

export default function MapZoneSelectorComponent({
  currentZone,
  handleZoneSelectorUpdate,
}) {
  const theme = useTheme();
  const { t } = useTranslation('map');

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
            <FormLabel>{t('occult.name', { ns: 'zones' })}</FormLabel>
            <FormControlLabel value="southhorn" control={<Radio />} label={t('occult.southhorn.short', { ns: 'zones' })} />
            <FormLabel>{t('bozja.name', { ns: 'zones' })}</FormLabel>
            <FormControlLabel value="zadnor" control={<Radio disabled />} label={t('bozja.zadnor.full', { ns: 'zones' })} />
            <FormControlLabel value="bsf" control={<Radio />} label={t('bozja.bsf.full', { ns: 'zones' })} />
            <FormLabel>{t('eureka.name', { ns: 'zones' })}</FormLabel>
            <FormControlLabel value="hydatos" control={<Radio />} label={t('eureka.hydatos.full', { ns: 'zones' })} />
            <FormControlLabel value="pyros" control={<Radio disabled />} label={t('eureka.pyros.full', { ns: 'zones' })} />
            <FormControlLabel value="pagos" control={<Radio disabled />} label={t('eureka.pagos.full', { ns: 'zones' })} />
            <FormControlLabel value="anemos" control={<Radio disabled />} label={t('eureka.anemos.full', { ns: 'zones' })} />
          </RadioGroup>
        </FormGroup>
      </Scrollbars>
    </Box>
  );
}
