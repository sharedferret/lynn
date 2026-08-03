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
      {
        markerData.metadata.enemy.type === 'ce' && (
          <Stack direction="row" spacing={1} alignItems="center">
            <img src="/assets/maps/markers/fate-nm.png" alt="Critical Engagement" width={24} height={24} />
            <Typography variant="button">{t(`map.regions.${markerData.metadata.enemy.encounter}`)}</Typography>
          </Stack>
        )
      }
      <Stack direction="row" spacing={1} alignItems="center">
        <img src="/assets/maps/markers/mob.png" alt={markerData.metadata.enemy.name} width={24} height={24} />
        <Typography variant="button">{t(`map.regions.${markerData.metadata.enemy.name}`)}</Typography>
      </Stack>
    </Stack>
  );
}
