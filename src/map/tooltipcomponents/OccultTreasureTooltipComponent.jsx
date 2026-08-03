import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function OccultTreasureTooltipComponent({ type }) {
  const { t } = useTranslation('map');

  const imgSrc = type !== 'reroll' ? '/assets/maps/markers/fate-enemies.png' : '/assets/maps/markers/coffer-gold.png';

  return (
    <Stack>
      <Typography variant="h6">Magic Pot FATE</Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <img src={imgSrc} alt="Magic Pot FATE" width={24} height={24} />
        <Typography variant="button">{t(`map.regions.northhorn.magicPotZone.${type}`)}</Typography>
      </Stack>
    </Stack>
  );
}
