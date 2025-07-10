import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import EurekaNMTooltipComponent from './tooltipcomponents/EurekaNMTooltipComponent';
import AetheryteTooltipComponent from './tooltipcomponents/AetheryteTooltipComponent';
import BozjaCETooltipComponent from './tooltipcomponents/BozjaCETooltipComponent';
import OccultFateTooltipComponent from './tooltipcomponents/OccultFateTooltipComponent';

export default function TooltipBaseComponent(
  {
    markerData,
    icon,
    type,
  },
) {
  const { t } = useTranslation('map');

  const renderContent = () => {
    switch (type) {
      case 'nms':
        return <EurekaNMTooltipComponent markerData={markerData} />;
      case 'aetherytes':
        return <AetheryteTooltipComponent markerData={markerData} />;
      case 'criticalEngagements':
        return <BozjaCETooltipComponent markerData={markerData} />;
      case 'fates':
        return <OccultFateTooltipComponent markerData={markerData} />;
      default:
        return null;
    }
  };

  return (
    <Box className="tooltip-base-component">
      <Stack width="300px">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box>
            <img
              src={`${process.env.PUBLIC_URL}/assets/maps/markers/${icon}`}
              alt={icon}
              width="48px"
              height="48px"
            />
          </Box>
          <Typography fontWeight={700} variant="h6">
            {t(`map.regions.${markerData.popupTitle ?? markerData.name}`)}
          </Typography>
        </Stack>
        <Box my={1}>
          <Divider variant="middle" light sx={{ bgcolor: '#999', mb: 1 }} />
        </Box>
        {renderContent(markerData.type, markerData, icon)}
      </Stack>
    </Box>
  );
}
