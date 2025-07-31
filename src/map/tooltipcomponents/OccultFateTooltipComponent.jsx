import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function OccultFateTooltipComponent({ markerData }) {
  const { t } = useTranslation('map');

  return (
    <Stack>
      <Typography variant="h6">{t('map.captions.boss')}</Typography>
      <Typography variant="button">{t(`map.regions.${markerData.metadata.boss}`)}</Typography>
    </Stack>
  );
}
