import {
  Box, Divider, Stack, Typography,
} from '@mui/material';
import React from 'react';

/**
 * [img] Title        [x]
 * --------
 * [Custom subcomponent]
 */
export default function MapItemInfoContainerComponent({
  entity, textX, textY, textVisible, theme,
}) {
  if (!entity) {
    return <Box />;
  }
  return (
    <Box
      position="absolute"
      top={textY - 25}
      left={textX + 25}
      width="300px"
      height="100px"
      bgcolor={theme.palette.mode === 'light' ? 'white' : '#333'}
      opacity={0.9}
      display={textVisible ? 'block' : 'none'}
      borderRadius="12px"
      boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2)"
    >
      <Stack>
        <Typography>
          {entity.name ? `${entity.type.name}: ` : `${entity.type.name}`}
          {entity.name}
        </Typography>
        <Divider />
        <Typography>
          Coordinates:
          {' '}
          {entity.coordinates.x}
          {', '}
          {entity.coordinates.y}
        </Typography>
      </Stack>
    </Box>
  );
}
