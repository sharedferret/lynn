import React from 'react';

import { Box, Stack, Typography } from '@mui/material';
import EurekaLogosActionHelper from './lib/EurekaLogosActionHelper';

export default function EurekaLogogramRecipeComponent({ logogram }) {
  const logograms = require('../ba/lib/Logograms.json').mnemes;

  let logogramName = '';
  if (logograms[logogram]) {
    logogramName = EurekaLogosActionHelper.getLogogramData(logograms[logogram].logogram).name;
  }

  if (logogram == null) {
    return <Box height={20} />
  }

  return (
    <Box height={25}>
      <Stack direction='row' justifyContent={'flex-start'} alignItems={'center'} spacing={1}>
        <img src={`${process.env.PUBLIC_URL}/assets/logograms/${logograms[logogram].type}.png`} width={16} height={16} alt={logograms[logogram].type} />
        <Typography fontSize={18}>{logogram}</Typography>
        <Box width={10} />
        <Typography fontSize={14} fontStyle={'italic'}>(from: { logogramName })</Typography>
      </Stack>
    </Box>
  );
}
