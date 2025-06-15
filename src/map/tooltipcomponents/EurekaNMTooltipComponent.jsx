import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function EurekaNMTooltipComponent({ markerData }) {
  const { t } = useTranslation('map');

  const renderSpawnedBy = () => {
    if (markerData.metadata.spawnedBy) {
      return (
        <Stack direction="row" alignItems="center">
          <Box>
            <img
              src={`${process.env.PUBLIC_URL}/assets/eureka/eureka_${markerData.metadata.spawnedBy.element.toLowerCase()}.png`}
              alt={markerData.name}
              width="32px"
              height="32px"
            />
          </Box>
          <Typography variant="button">{`Lv${markerData.metadata.spawnedBy.level} ${t(`map.regions.${markerData.metadata.spawnedBy.name}`)}`}</Typography>
        </Stack>
      );
    }
    return null;
  };

  return (
    <Stack>
      <Typography variant="h6">{t('map.captions.nm')}</Typography>
      <Stack direction="row" alignItems="center">
        <Box>
          <img
            src={`${process.env.PUBLIC_URL}/assets/eureka/eureka_${markerData.metadata.element.toLowerCase()}.png`}
            alt={markerData.name}
            width="32px"
            height="32px"
          />
        </Box>
        <Typography variant="button">{t(`map.regions.${markerData.name}`)}</Typography>
      </Stack>
      {markerData.metadata.spawnedBy ? <Typography variant="h6">{t('map.captions.spawnedBy')}</Typography> : null}
      {renderSpawnedBy()}
    </Stack>
  );
}
