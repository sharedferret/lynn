import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import ScaleIcon from '@mui/icons-material/Scale';

export default function BozjaLostActionInformationTooltipComponent({ lostAction, actionData }) {
  return (
    <Box maxWidth={{ md: 400 }}>
      <Stack pt={2} pb={2} spacing={1}>
        <Stack direction="row" alignItems="center" pl={2} pr={1}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/lostactions/${actionData.image}.jpg`}
            width={32}
            height={32}
            alt={lostAction}
          />
          <Box width={12} />
          <Typography fontWeight={700}>{lostAction}</Typography>
          <Box flexGrow={1} />
          <ScaleIcon />
          <Typography fontWeight={700} pr={3} pl={1}>{actionData.weight}</Typography>
        </Stack>

        <Stack direction="row" pl={2} alignItems="center" spacing={2}>
          <Typography fontWeight={700} fontSize={10}>{actionData.abilityType}</Typography>
          {actionData.duration
            ? (
              <Typography fontWeight={700} fontSize={10}>
                Duration:
                {' '}
                {actionData.duration}
              </Typography>
            )
            : null}
          {actionData.castTime
            ? (
              <Typography fontWeight={700} fontSize={10}>
                Cast:
                {' '}
                {actionData.castTime}
                s
              </Typography>
            )
            : null}
          {actionData.recastTime
            ? (
              <Typography fontWeight={700} fontSize={10}>
                Recast:
                {' '}
                {actionData.recastTime}
                s
              </Typography>
            )
            : null}
          {actionData.mpCost
            ? (
              <Typography fontWeight={700} fontSize={10}>
                MP:
                {' '}
                {actionData.mpCost}
              </Typography>
            )
            : null}
          {actionData.charges
            ? (
              <Typography fontWeight={700} fontSize={10}>
                Charges:
                {' '}
                {actionData.charges}
              </Typography>
            )
            : null}

        </Stack>
        <Typography
          textAlign="left"
          pl={2}
          pr={1}
          style={{ whiteSpace: 'pre-wrap' }}
          fontSize={12}
        >
          {actionData.actionText}
        </Typography>
        <Typography fontWeight={700} fontSize={10} textAlign="left" pl={2} pr={1}>
          Rank:
          {' '}
          {actionData.rank}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Typography fontWeight={700} pl={2} fontSize={10}>Usable by:</Typography>
          {
            actionData.roles.map((i) => (
              <Box>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/roles/${i}.png`}
                  width={16}
                  height={16}
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
