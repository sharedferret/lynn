import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import data from './lib/Logograms.json';

export default function BALogogramComponent({ logogram }) {
  const logograms = data.mnemes;

  if (logogram == null) {
    return <Box height={20} />;
  }

  return (
    <Box height={20}>
      <Stack direction="row" justifyContent="left" alignItems="center" spacing={1}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/logograms/${logograms[logogram].type}.png`}
          width={16}
          height={16}
          alt={logograms[logogram].type}
        />
        <Typography fontSize={14}>{logogram}</Typography>
      </Stack>
    </Box>
  );
}
