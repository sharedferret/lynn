import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function OccultFateTooltipComponent({ markerData }) {
  const { t } = useTranslation('map');

  return (
    <Stack>
      <Typography variant="h6">{t('map.captions.boss')}</Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        {markerData.metadata.weakness && (
          <img src={`/assets/icons/weakness-${markerData.metadata.weakness}.png`} alt={`Weak to ${markerData.metadata.weakness}`} width={24} height={32} />
        )}
        <Typography variant="button">{t(`map.regions.${markerData.metadata.boss}`)}</Typography>
      </Stack>
      {
        markerData.metadata.dispeller && (
          <Stack>
            <Typography variant="h6">{t('map.captions.dispeller')}</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <img src={`/assets/maps/markers/dispeller-${markerData.metadata.dispeller}.png`} alt={markerData.metadata.dispeller} width={24} height={24} />
              <Typography variant="button">{t(`map.regions.northhorn.dispeller.${markerData.metadata.dispeller}`)}</Typography>
            </Stack>
          </Stack>
        )
      }
    </Stack>
  );
}
