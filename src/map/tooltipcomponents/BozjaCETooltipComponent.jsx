import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function BozjaCETooltipComponent({ markerData }) {
  const { t } = useTranslation('map');

  const renderSpawnedBy = () => {
    if (markerData.metadata.spawnedBy) {
      return (
        <Stack direction="row" alignItems="center">
          <Box>
            <img
              src={`${process.env.PUBLIC_URL}/assets/maps/markers/${markerData.metadata.spawnedBy.type}.png`}
              alt={markerData.metadata.spawnedBy.type}
              width="32px"
              height="32px"
            />
          </Box>
          <Typography variant="button">{t(`map.regions.${markerData.metadata.spawnedBy.name}`)}</Typography>
        </Stack>
      );
    }
    return null;
  };

  const renderRewards = () => {
    if (markerData.metadata.rewards) {
      return markerData.metadata.rewards.map((reward) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box>
            <img
              src={`${process.env.PUBLIC_URL}/assets/maps/markers/${reward.type}.png`}
              alt={reward.type}
              width="32px"
              height="32px"
            />
          </Box>
          <Typography variant="button">{t(`map.regions.${reward.name}`)}</Typography>
        </Stack>
      ));
    }
    return null;
  };

  return (
    <Stack>
      <Typography variant="h6">{t('map.captions.ce')}</Typography>
      <Typography variant="h6">{t('map.captions.boss')}</Typography>
      <Typography variant="button">{t(`map.regions.${markerData.metadata.boss}`)}</Typography>
      {markerData.metadata.spawnedBy ? <Typography variant="h6">{t('map.captions.spawnedBy')}</Typography> : null}
      {renderSpawnedBy()}
      {markerData.metadata.rewards ? <Typography variant="h6">{t('map.captions.rewards')}</Typography> : null}
      {renderRewards()}
    </Stack>
  );
}
