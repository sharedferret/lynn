import {
  Box, Container, Stack, Typography,
} from '@mui/material';
import React from 'react';

export default function OccultPhantomJobSupportActionComponent({ action }) {
  // const theme = useTheme();
  return (
    <Container>
      <Box>
        <Stack direction="row" alignItems="center" spacing={2}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/lostactions/Dynamis_Dice.jpg`}
            width={48}
            height={48}
            alt="test"
          />
          <Box width={12} />
          <Typography fontWeight={700} variant="h5">{ action.name }</Typography>
        </Stack>
        <Box
          p={2}
          pl={9}
        >
          <Stack direction="row" pl={3} alignItems="center" spacing={3} pb={2}>
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
          <Typography
            textAlign="left"
            pl={3}
            pr={2}
            fontWeight={700}
          >
            Unlock Level:
            {' '}
            {action.unlockLevel}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
