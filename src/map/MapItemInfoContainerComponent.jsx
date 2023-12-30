import {
  Box, Divider, Stack, Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import MapInfoAetheryteComponent from './MapInfoAetheryteComponent';
import MapInfoDefaultComponent from './MapInfoDefaultComponent';
import MapInfoNMComponent from './MapInfoNMComponent';

/**
 * [img] Title        [x]
 * --------
 * [Custom subcomponent]
 */
export default function MapItemInfoContainerComponent({
  entity, textX, textY, textVisible, theme, handleCloseButton,
}) {
  const getInfoContents = (type) => {
    switch (type) {
      case 'aetherytes':
        return <MapInfoAetheryteComponent entity={entity} />;
      case 'nms':
        return <MapInfoNMComponent entity={entity} />;
      default:
        return <MapInfoDefaultComponent entity={entity} />;
    }
  };

  if (!entity) {
    return <Box />;
  }

  return (
    <Box
      position="absolute"
      top={textY - 25}
      left={textX + 25}
      width="350px"
      minHeight="100px"
      bgcolor={theme.palette.mode === 'light' ? 'white' : '#333'}
      opacity={0.9}
      display={textVisible ? 'block' : 'none'}
      borderRadius="12px"
      boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2)"
    >
      <Stack
        p={2}
        spacing={1}
      >
        <Stack
          direction="row"
          width="100%"
        >
          <Typography textAlign="left" fontWeight={700}>
            {entity.name ? `${entity.type.name}: ` : `${entity.type.name}`}
            {entity.name}
          </Typography>
          <Box flexGrow={1} />
          <Box
            height={24}
            onClick={handleCloseButton}
          >
            <CloseIcon />
          </Box>
        </Stack>
        <Divider />
        <Box maxHeight="200px" sx={{ overflow: 'auto' }}>
          {getInfoContents(entity.type.type)}
        </Box>
      </Stack>
    </Box>
  );
}
