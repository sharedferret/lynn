import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function OccultBlueSpellComponent({ markerData }) {
  const { t } = useTranslation('map');

  return (
    <Stack>
      <Typography variant="h6">{t('map.captions.blueSpell')}</Typography>
      <Typography variant="h6">{t('map.captions.learnedFrom')}</Typography>
      <Typography variant="button">{t(`map.regions.${markerData.metadata.enemy}`)}</Typography>
      <Typography variant="button">{t(`map.regions.${markerData.metadata.encounter}`)}</Typography>
    </Stack>
  );
}
