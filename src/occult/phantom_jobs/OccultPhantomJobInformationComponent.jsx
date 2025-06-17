import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import React from 'react';
import { Trans } from 'react-i18next';

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
          <Typography fontWeight={700} variant="h4">
            <Trans i18nKey={`phantom-job.${phantomJobData.key}.name`} ns="occult" />
          </Typography>
          <Box flexGrow={1} />
          {
            phantomJobData.totalExp
              ? (
                <Stack direction="row" alignItems="center" spacing={2}>
                  <AutoGraphIcon />
                  <Typography fontWeight={700} variant="h5">{ `${phantomJobData.totalExp} EXP` }</Typography>
                </Stack>
              )
              : null
          }

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
          <Trans i18nKey={`phantom-job.${phantomJobData.key}.text`} ns="occult" />
        </Typography>
        <Stack direction="row" spacing={2} pt={3} alignItems="center">
          <Typography
            textAlign="left"
            pl={3}
            fontWeight={700}
          >
            <Trans i18nKey="action-detail-label.unlock" />
          </Typography>
          <Typography
            textAlign="left"
            style={{ whiteSpace: 'pre-wrap' }}
          >
            <Trans i18nKey={`phantom-job.${phantomJobData.key}.unlock`} ns="occult" />
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
}
