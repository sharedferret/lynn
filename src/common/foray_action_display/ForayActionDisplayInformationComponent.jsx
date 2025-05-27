import React from 'react';
import {
  Box,
  Paper,
  Stack,
  Typography,
  useTheme,
  alpha,
} from '@mui/material';

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
        <Stack direction="row" alignItems="center" spacing={2}>
          <ScaleIcon />
          <Typography fontWeight={700} variant="h4" pr={3} pl={1}>{actionData.weight}</Typography>
        </Stack>
      );
    }

    return null;
  }

  function getDescriptionExtraComponent() {
    if (forayActionDisplaySettings.name === 'bozja') {
      return (
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
        <Stack direction="row" alignItems="center" spacing={2}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/${forayActionDisplaySettings.assetUriPrefix}/${actionData.image}.${forayActionDisplaySettings.assetUriType}`}
            width={48}
            height={48}
            alt={action}
          />
          <Box width={12} />
          <Typography fontWeight={700} variant="h4">{action}</Typography>
          <Box flexGrow={1} />
          { getTitleExtraComponent() }
        </Stack>
      </Box>

      <Box p={2}>
        <Stack direction="row" pl={3} alignItems="center" spacing={3} pb={2}>
          <Typography fontWeight={700}>{actionData.abilityType}</Typography>
          {actionData.duration
            ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" color="text.secondary">Duration:</Typography>
                <Typography fontWeight={600}>{actionData.duration}</Typography>
              </Box>
            )
            : null}
          {actionData.castTime
            ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" color="text.secondary">Cast:</Typography>
                <Typography fontWeight={600}>
                  {actionData.castTime}
                  s
                </Typography>
              </Box>
            )
            : null}
          {actionData.recastTime
            ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" color="text.secondary">Recast:</Typography>
                <Typography fontWeight={600}>
                  {actionData.recastTime}
                  s
                </Typography>
              </Box>
            )
            : null}
          {actionData.mpCost
            ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" color="text.secondary">MP:</Typography>
                <Typography fontWeight={600}>{actionData.mpCost}</Typography>
              </Box>
            )
            : null}
          {actionData.charges
            ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" color="text.secondary">Charges:</Typography>
                <Typography fontWeight={600}>{actionData.charges}</Typography>
              </Box>
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

        { getDescriptionExtraComponent() }

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
      </Box>
    </Paper>
  );
}
