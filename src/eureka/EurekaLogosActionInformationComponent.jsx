import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function EurekaLogosActionInformationComponent({ logosAction, actionData }) {
  return (
    <Box
      sx={{
        width: { md: 600 },
        border: 1,
        borderRadius: '12px',
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
            width={48}
            height={48}
            alt={logosAction}
          />
          <Box sx={{
            width: 12,
          }}
          />
          <Typography
            variant="h4"
            sx={{
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
            pl: 3,
            alignItems: 'center',
          }}
        >
          <Typography sx={{
            fontWeight: 700,
          }}
          >
            {actionData.abilityType}
          </Typography>
          {actionData.duration
            ? (
              <Typography sx={{
                fontWeight: 700,
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
              <Typography sx={{
                fontWeight: 700,
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
              <Typography sx={{
                fontWeight: 700,
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
              <Typography sx={{
                fontWeight: 700,
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
              <Typography sx={{
                fontWeight: 700,
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
            pl: 3,
            pr: 2,
          }}
        >
          {actionData.actionText}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Typography
            sx={{
              fontWeight: 700,
              pl: 3,
            }}
          >
            Usable by:
          </Typography>
          {
            actionData.allowedRoles.map((i) => (
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
