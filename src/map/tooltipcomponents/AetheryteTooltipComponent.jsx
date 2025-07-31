import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function AetheryteTooltipComponent({ markerData }) {
  const { t } = useTranslation('map');

  if (markerData.metadata?.unlock) {
    return (
      <Stack>
        <Typography variant="h6">{t('map.captions.unlocksAt')}</Typography>
        <Typography variant="button">{`${t('map.captions.level')} ${markerData.metadata.unlock}`}</Typography>
      </Stack>
    );
  }

  return null;
}
