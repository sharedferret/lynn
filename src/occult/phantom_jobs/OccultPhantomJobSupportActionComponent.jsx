import {
  Box, Container, Stack, Typography, useTheme, alpha,
} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import React from 'react';

export default function OccultPhantomJobSupportActionComponent({ action }) {
  const theme = useTheme();

  function renderEnhancement(enhancement) {
    return (
      <Typography fontStyle="italic" textAlign="start" pl={3}>
        Lv
        {' '}
        { enhancement.level }
        {' '}
        Trait:
        {' '}
        { enhancement.effect }
      </Typography>
    );
  }

  return (
    <Container sx={{
      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      borderRadius: '12px',
    }}
    >
      <Box p={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/occultactions/${action.image}`}
            width={48}
            height={48}
            alt={action.name}
          />
          <Box width={12} />
          <Typography fontWeight={700} variant="h5">{ action.name }</Typography>
          <Box flexGrow={1} />
          <LockOpenIcon />
          <Typography fontWeight={700} variant="h5">{ `Lv ${action.unlockLevel}` }</Typography>
        </Stack>
        <Box
          pt={2}
          pl={9}
        >
          <Stack direction="row" pl={3} alignItems="center" spacing={3} pb={1}>
            <Typography fontWeight={700}>{action.abilityType}</Typography>
            {action.duration
              ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">Duration:</Typography>
                  <Typography fontWeight={600}>{action.duration}</Typography>
                </Box>
              )
              : null}
            {action.castTime
              ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">Cast:</Typography>
                  <Typography fontWeight={600}>
                    {action.castTime}
                    s
                  </Typography>
                </Box>
              )
              : null}
            {action.recastTime
              ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">Recast:</Typography>
                  <Typography fontWeight={600}>
                    {action.recastTime}
                    s
                  </Typography>
                </Box>
              )
              : null}
            {action.mpCost
              ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">MP:</Typography>
                  <Typography fontWeight={600}>{action.mpCost}</Typography>
                </Box>
              )
              : null}
            {action.charges
              ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">Charges:</Typography>
                  <Typography fontWeight={600}>{action.charges}</Typography>
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
            {action.description}
          </Typography>
          <Box height={8} />
          {
            action.enhancements
              ? action.enhancements.map((enhancement) => renderEnhancement(enhancement))
              : null
          }
        </Box>
      </Box>
    </Container>
  );
}
