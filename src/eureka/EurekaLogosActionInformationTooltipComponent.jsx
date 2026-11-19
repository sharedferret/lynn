import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function EurekaLogosActionInformationTooltipComponent({ logosAction, actionData }) {
  return (
    <Box sx={{
      width: { md: 290 },
    }}
    >
      <Stack
        spacing={1}
        sx={{
          pt: 2,
          pb: 2,
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            pl: 2,
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/logosactions/${actionData.image}.png`}
            width={32}
            height={32}
            alt={logosAction}
          />
          <Box sx={{
            width: 12,
          }}
          />
          <Typography sx={{
            fontWeight: 700,
          }}
          >
            {logosAction}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={3}
          sx={{
            pl: 2,
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 10,
            }}
          >
            {actionData.abilityType}
          </Typography>
          {actionData.duration
            ? (
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 10,
                }}
              >
                Duration:
                {' '}
                {actionData.duration}
              </Typography>
            )
            : null}
          {actionData.castTime
            ? (
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 10,
                }}
              >
                Cast:
                {' '}
                {actionData.castTime}
                s
              </Typography>
            )
            : null}
          {actionData.recastTime
            ? (
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 10,
                }}
              >
                Recast:
                {' '}
                {actionData.recastTime}
                s
              </Typography>
            )
            : null}
          {actionData.mpCost
            ? (
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 10,
                }}
              >
                MP:
                {' '}
                {actionData.mpCost}
              </Typography>
            )
            : null}
          {actionData.charges
            ? (
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 10,
                }}
              >
                Charges:
                {' '}
                {actionData.charges}
              </Typography>
            )
            : null}

        </Stack>

        <Typography
          style={{ whiteSpace: 'pre-wrap' }}
          sx={{
            textAlign: 'left',
            pl: 2,
            pr: 1,
            fontSize: 12,
          }}
        >
          {actionData.actionText}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Typography
            sx={{
              fontWeight: 700,
              pl: 2,
              fontSize: 10,
            }}
          >
            Usable by:
          </Typography>
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
