import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function EurekaLogosActionInformationTooltipComponent({ logosAction, actionData }) {
  return (
    <Box width={{ md: 290 }}>
      <Stack spacing={1} pt={2} pb={2}>
        <Stack direction="row" alignItems="center" pl={2}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/logosactions/${actionData.image}.png`}
            width={32}
            height={32}
            alt={logosAction}
          />
          <Box width={12} />
          <Typography fontWeight={700}>{logosAction}</Typography>
        </Stack>

        <Stack direction="row" pl={2} alignItems="center" spacing={3}>
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
        <Stack direction="row" spacing={1}>
          <Typography fontWeight={700} pl={2} fontSize={10}>Usable by:</Typography>
          {
            actionData.allowedRoles.map((i) => (
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
