import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme, alpha } from '@mui/material/styles';

import ScaleIcon from '@mui/icons-material/Scale';

export default function ForayActionDisplayInformationComponent({
  forayActionDisplaySettings,
  action,
  actionData,
}) {
  const theme = useTheme();

  function getTitleExtraComponent() {
    if (forayActionDisplaySettings.name === 'bozja') {
      return (
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: 'center',
          }}
        >
          <ScaleIcon />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              pr: 3,
              pl: 1,
            }}
          >
            {actionData.weight}
          </Typography>
        </Stack>
      );
    }

    return null;
  }

  function getDescriptionExtraComponent() {
    if (forayActionDisplaySettings.name === 'bozja') {
      return (
        <Typography
          sx={{
            textAlign: 'left',
            pl: 3,
            pr: 2,
            fontWeight: 700,
          }}
        >
          Rank:
          {' '}
          {actionData.rank}
        </Typography>
      );
    }

    return null;
  }

  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.1)}, ${alpha(theme.palette.background.paper, 0.6)})`,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      }}
    >
      <Box
        sx={{
          background: `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.15)}, transparent)`,
          py: 1,
          px: 2,
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: 'center',
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/${forayActionDisplaySettings.assetUriPrefix}/${actionData.image}.${forayActionDisplaySettings.assetUriType}`}
            width={48}
            height={48}
            alt={action}
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
            {action}
          </Typography>
          <Box sx={{
            flexGrow: 1,
          }}
          />
          { getTitleExtraComponent() }
        </Stack>
      </Box>

      <Box sx={{
        p: 2,
      }}
      >
        <Stack
          direction="row"
          spacing={3}
          sx={{
            pl: 3,
            alignItems: 'center',
            pb: 2,
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                  }}
                >
                  Duration:
                </Typography>
                <Typography sx={{
                  fontWeight: 600,
                }}
                >
                  {actionData.duration}
                </Typography>
              </Box>
            )
            : null}
          {actionData.castTime
            ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                  }}
                >
                  Cast:
                </Typography>
                <Typography sx={{
                  fontWeight: 600,
                }}
                >
                  {actionData.castTime}
                  s
                </Typography>
              </Box>
            )
            : null}
          {actionData.recastTime
            ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                  }}
                >
                  Recast:
                </Typography>
                <Typography sx={{
                  fontWeight: 600,
                }}
                >
                  {actionData.recastTime}
                  s
                </Typography>
              </Box>
            )
            : null}
          {actionData.mpCost
            ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                  }}
                >
                  MP:
                </Typography>
                <Typography sx={{
                  fontWeight: 600,
                }}
                >
                  {actionData.mpCost}
                </Typography>
              </Box>
            )
            : null}
          {actionData.charges
            ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                  }}
                >
                  Charges:
                </Typography>
                <Typography sx={{
                  fontWeight: 600,
                }}
                >
                  {actionData.charges}
                </Typography>
              </Box>
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

        { getDescriptionExtraComponent() }

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
      </Box>
    </Paper>
  );
}
