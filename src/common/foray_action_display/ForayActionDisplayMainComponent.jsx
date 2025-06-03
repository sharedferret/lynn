import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme, alpha } from '@mui/material/styles';
import BozjaLostActionSelectorComponent from '../../drs/BozjaLostActionSelectorComponent';
import BozjaLostActionHelperDataComponent from '../../drs/BozjaLostActionHelperDataComponent';
import EurekaLogosActionDataComponentOuterShim from './EurekaLogosActionDataComponentOuterShim';
import EurekaLogosActionSelectorComponent from '../../eureka/EurekaLogosActionSelectorComponent';

export default function ForayActionDisplayMainComponent({ inputAction, forayName = 'bozja' }) {
  const theme = useTheme();

  const forayActionDisplaySettingsMap = {
    eureka: {
      name: 'eureka',
      title: 'Eureka Logos Action Helper',
      uriPrefix: '/eureka/logos',
      actionSelectorLabel: 'Action',
      assetUriPrefix: 'logosactions',
      assetUriType: 'png',
      hasRecipes: false,
    },
    bozja: {
      name: 'bozja',
      title: 'Bozja Lost Action Helper',
      uriPrefix: '/bozja/lostaction',
      actionSelectorLabel: 'Action',
      assetUriPrefix: 'lostactions',
      assetUriType: 'jpg',
      hasRecipes: false,
    },
    occult: {
      name: 'occult',
      title: 'Occult Crescent Phantom Job Helper',
      uriPrefix: '/occult/phantomjob',
      actionSelectorLabel: 'Phantom Job',
      assetUriPrefix: 'phantomjobs',
      assetUriType: 'png',
      hasRecipes: false,
    },
  };

  const forayActionDisplaySettings = forayActionDisplaySettingsMap[forayName] ?? null;

  /**
   * Component State
   */
  let action = inputAction ?? '';
  action = action.replaceAll('_', ' ');
  const [actionState, setActionState] = useState(action);

  const handleActionUpdate = useCallback((event) => {
    const actionUri = event.target.value.replaceAll(' ', '_');
    window.history.pushState(
      actionUri,
      `${event.target.value} - forays.info`,
      `${forayActionDisplaySettings.uriPrefix}/${actionUri}`,
    );

    setActionState(event.target.value);
  }, [window, setActionState, forayActionDisplaySettings]);

  /**
   * Child component switches
   */

  /**
   * Render Logic
   */

  /**
   * TODO: We're calling into the individual foray data components for now, but in the
   * future we should unify them as well.
   */
  function getForayDataComponent() {
    switch (forayActionDisplaySettings.name) {
      case 'eureka':
        return <EurekaLogosActionDataComponentOuterShim action={actionState} />;
      case 'bozja':
        return <BozjaLostActionHelperDataComponent lostAction={actionState} />;
      default:
        return null;
    }
  }

  /**
   * TODO: We're calling into the individual selector components for now, but in the
   * future we should unify them as well.
   */
  function getForayActionSelectorComponent() {
    switch (forayActionDisplaySettings.name) {
      case 'eureka':
        return (
          <EurekaLogosActionSelectorComponent
            logosAction={actionState}
            handleActionUpdate={handleActionUpdate}
          />
        );
      case 'bozja':
        return (
          <BozjaLostActionSelectorComponent
            lostAction={actionState}
            handleActionUpdate={handleActionUpdate}
          />
        );
      default:
        return null;
    }
  }

  return (
    <Box
      component="main"
      margin="auto"
      sx={{ flexGrow: 1, pt: { xs: 14, md: 5 } }}
    >
      <Container maxWidth="lg">
        <Box p={3}>
          <Stack spacing={4} minHeight={100} p={1} alignItems="center">
            {/* Title */}
            <Box>
              <Typography fontWeight={700} variant="h4" textAlign="start">
                {forayActionDisplaySettings.title}
              </Typography>
            </Box>

            {/* Action Grid */}
            <Paper
              elevation={2}
              sx={{
                borderRadius: 2,
                p: 2,
                background: alpha(theme.palette.background.paper, 0.7),
                width: '100%',
                maxWidth: 450,
              }}
            >
              Display Component
            </Paper>

            {/* Action Selector */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems="center"
              sx={{ width: '100%' }}
            >
              <Box flexGrow={1}>
                <Typography fontWeight={600} variant="h6" textAlign="right">
                  {forayActionDisplaySettings.actionSelectorLabel}
                  :
                </Typography>
              </Box>

              <Box sx={{ flexGrow: 1, maxWidth: 400 }}>
                { getForayActionSelectorComponent() }
              </Box>
              <Box flexGrow={1} />
            </Stack>

            <Divider sx={{ width: '50%', margin: '0 auto', mb: 3 }} />

            {/* Data Component */}
            { getForayDataComponent() }
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
