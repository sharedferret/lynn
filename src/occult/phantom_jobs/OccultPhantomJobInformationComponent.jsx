import {
  alpha,
  Box,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';

export default function OccultPhantomJobInformationComponent({ phantomJob, phantomJobData }) {
  const theme = useTheme();

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
            src={`${process.env.PUBLIC_URL}/assets/phantomjobs/${phantomJobData.sprite}.png`}
            width={48}
            height={48}
            alt={phantomJob}
          />
          <Box width={12} />
          <Typography fontWeight={700} variant="h4">{phantomJob}</Typography>
          <Box flexGrow={1} />
        </Stack>
      </Box>

      <Box p={2}>
        <Stack direction="row" pl={3} alignItems="center" spacing={3} pb={2}>
          <Typography fontWeight={700}>{phantomJobData.abilityType}</Typography>
        </Stack>

        <Typography
          textAlign="left"
          pl={3}
          pr={2}
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {phantomJobData.jobText}
        </Typography>
      </Box>
    </Paper>
  );
}
