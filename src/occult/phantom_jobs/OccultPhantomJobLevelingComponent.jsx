import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useTheme, alpha } from '@mui/material/styles';
import { Trans } from 'react-i18next';

import React from 'react';
import {
  Step, StepLabel, Stepper,
} from '@mui/material';

function CustomStepIcon(props) {
  const { icon } = props;
  const theme = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        width: 36,
        height: 24,
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.75rem',
      }}
    >
      {`Lv ${icon}`}
    </div>
  );
}

export default function OccultPhantomJobLevelingComponent({ expByLevel, isFreelancer }) {
  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        background: alpha(theme.palette.background.paper, 0.85),
        backdropFilter: 'blur(10px)',
      }}
    >
      <Box
        sx={{
          py: 1,
          px: 2,
        }}
      >
        <Stack spacing={3} pt={2}>
          <Typography textAlign="start" fontWeight={700} variant="h4">
            <Trans i18nKey="job-helper.leveling-up" ns="occult" />
          </Typography>
          <Divider sx={{
            width: '80%',
            margin: '0 auto',
            mb: 3,
            alignSelf: 'center',
          }}
          />
          <Box sx={{ width: '100%' }} pb={2}>
            { isFreelancer
              ? (
                <Typography textAlign="start">
                  <Trans i18nKey="job-helper.freelancer-leveling" ns="occult" />
                </Typography>
              )
              : (
                <Stepper
                  alternativeLabel
                  sx={{
                    '& .MuiStepConnector-line': {
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  {
                Object.entries(expByLevel).map(([level, exp]) => (
                  <Step key={`levelStep${level}`}>
                    {
                      exp > 0 ? (
                        <StepLabel StepIconComponent={CustomStepIcon}>
                          {`${exp.toLocaleString()} EXP`}
                        </StepLabel>
                      ) : <StepLabel StepIconComponent={CustomStepIcon} />
                    }
                  </Step>
                ))
              }
                </Stepper>
              )}

          </Box>

        </Stack>
      </Box>
    </Paper>
  );
}
