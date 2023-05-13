import React, { useState } from 'react';

import {
  Box, Divider, Stack, Typography,
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

  /**
   * Render Logic
   */
  return (
    <Box sx={{ border: 1, borderRadius: '12px', borderColor: '#ddd' }}>
      <Stack
        direction="row"
        spacing={2}
        height={150}
        p={1}
        alignItems="center"
        justifyContent="center"
      >
        <Box width={25}>
          <Typography
            align="center"
            fontWeight={700}
            width={150}
            sx={{ transform: 'translateX(-40%) rotate(-90deg)', whiteSpace: 'nowrap' }}
          >
            {index === 0
              ? 'PRE-POP'
              : `PLATE ${index}`}
          </Typography>
        </Box>
        <Divider orientation="vertical" variant="middle" />
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
