import React, { useState } from 'react';

import {
  Box, Divider, Stack, Typography, useMediaQuery, useTheme,
} from '@mui/material';

import BALogosActionTrayLogosComponent from './BALogosActionTrayLogosComponent';
import BALogosActionRecipeContainerComponent from './BALogosActionRecipeContainerComponent';

/**
 * One tray.
 * 2 | [Tray logos] [Recipe]
 */
export default function BALogosActionTrayComponent({
  inputTray,
  inputIndex,
  handleLogosActionUpdate,
}) {
  /**
   * Component State
   *
   */
  const [index] = useState(inputIndex);
  const theme = useTheme();

  /**
   * Render Logic
   */

  function getPlateName() {
    if (index === 0) {
      return 'HYDATOS';
    }
    if (index === 1) {
      return 'INITIAL';
    }
    return `PLATE ${index - 1}`;
  }

  return (
    <Box sx={{ border: 1, borderRadius: '12px', borderColor: '#ddd' }}>
      <Stack
        direction={{ lg: 'row' }}
        spacing={{ xs: 1, md: 2 }}
        height={{ lg: 150 }}
        p={1}
        alignItems="center"
        justifyContent="center"
      >
        <Box width={{ lg: 25 }}>
          <Typography
            align="center"
            fontWeight={700}
            width={{ lg: 150 }}
            sx={{ transform: { lg: 'translateX(-40%) rotate(-90deg)' }, whiteSpace: { lg: 'nowrap' } }}
          >
            {getPlateName()}
          </Typography>
        </Box>
        <Divider
          orientation={useMediaQuery(theme.breakpoints.down('lg')) ? 'horizontal' : 'vertical'}
          variant="middle"
          flexItem
        />
        <BALogosActionTrayLogosComponent
          tray={inputTray}
          index={index}
          handleLogosActionUpdate={handleLogosActionUpdate}
        />
        <Box>
          <BALogosActionRecipeContainerComponent tray={inputTray} />
        </Box>
      </Stack>
    </Box>
  );
}
