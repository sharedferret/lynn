import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import EurekaLogosActionHelper from './lib/EurekaLogosActionHelper';
import data from '../ba/lib/Logograms.json';

export default function EurekaLogogramRecipeComponent({ logogram }) {
  const logograms = data.mnemes;

  let logogramName = '';
  if (logograms[logogram]) {
    logogramName = EurekaLogosActionHelper.getLogogramData(logograms[logogram].logogram).name;
  }

  if (logogram == null) {
    return (
      <Box sx={{
        height: 20,
      }}
      />
    );
  }

  return (
    <Box sx={{
      height: 25,
    }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/assets/logograms/${logograms[logogram].type}.png`}
          width={16}
          height={16}
          alt={logograms[logogram].type}
        />
        <Typography sx={{
          fontSize: 18,
        }}
        >
          {logogram}
        </Typography>
        <Box sx={{
          width: 10,
        }}
        />
        <Typography
          sx={{
            fontSize: 14,
            fontStyle: 'italic',
          }}
        >
          (from:
          {' '}
          {logogramName}
          )
        </Typography>
      </Stack>
    </Box>
  );
}
