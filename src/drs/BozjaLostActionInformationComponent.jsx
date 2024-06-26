import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import ScaleIcon from '@mui/icons-material/Scale';

export default function BozjaLostActionInformationComponent({ lostAction, actionData }) {
  return (
    <Box width={{ md: 700 }} border={1} borderRadius="12px">
      <Stack spacing={1} pt={2} pb={2}>
        <Stack direction="row" alignItems="center" pl={2}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/lostactions/${actionData.image}.jpg`}
            width={48}
            height={48}
            alt={lostAction}
          />
          <Box width={12} />
          <Typography fontWeight={700} variant="h4">{lostAction}</Typography>
          <Box flexGrow={1} />
          <ScaleIcon />
          <Typography fontWeight={700} variant="h4" pr={3} pl={1}>{actionData.weight}</Typography>
        </Stack>

        <Stack direction="row" pl={3} alignItems="center" spacing={3}>
          <Typography fontWeight={700}>{actionData.abilityType}</Typography>
          {actionData.duration
            ? (
              <Typography fontWeight={700}>
                Duration:
                {' '}
                {actionData.duration}
              </Typography>
            )
            : null}
          {actionData.castTime
            ? (
              <Typography fontWeight={700}>
                Cast:
                {' '}
                {actionData.castTime}
                s
              </Typography>
            )
            : null}
          {actionData.recastTime
            ? (
              <Typography fontWeight={700}>
                Recast:
                {' '}
                {actionData.recastTime}
                s
              </Typography>
            )
            : null}
          {actionData.mpCost
            ? (
              <Typography fontWeight={700}>
                MP:
                {' '}
                {actionData.mpCost}
              </Typography>
            )
            : null}
          {actionData.charges
            ? (
              <Typography fontWeight={700}>
                Charges:
                {' '}
                {actionData.charges}
              </Typography>
            )
            : null}

        </Stack>

        <Typography
          textAlign="left"
          pl={3}
          pr={2}
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {actionData.actionText}
        </Typography>
        <Typography
          textAlign="left"
          pl={3}
          pr={2}
          fontWeight={700}
        >
          Rank:
          {' '}
          {actionData.rank}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Typography fontWeight={700} pl={3}>Usable by:</Typography>
          {
            actionData.roles.map((i) => (
              <Box>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/roles/${i}.png`}
                  width={24}
                  height={24}
                  alt={i}
                />
              </Box>
            ))
          }
        </Stack>
      </Stack>
    </Box>
  );
}
