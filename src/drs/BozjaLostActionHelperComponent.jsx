import React, { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Trans } from 'react-i18next';
import BozjaLostActionSelectorComponent from './BozjaLostActionSelectorComponent';
import BozjaLostActionHelperDataComponent from './BozjaLostActionHelperDataComponent';

export default function BozjaLostActionHelperComponent({ lostAction }) {
  /**
   * Component State
   */
  let action = lostAction ?? '';
  action = action.replaceAll('_', ' ');
  const [lostActionState, setLostActionState] = useState(action);

  const handleActionUpdate = useCallback((event) => {
    const lostActionUrl = event.target.value.replaceAll(' ', '_');
    window.history.pushState(
      lostActionUrl,
      `${event.target.value} - forays.info`,
      `/bozja/lostaction/${lostActionUrl}`,
    );

    setLostActionState(event.target.value);
  }, [window, setLostActionState]);

  /**
   * Render Logic
   */
  return (
    <Container maxWidth="lg">

      <Box p={3}>
        <Stack spacing={2} minHeight={100} p={1} alignItems="center">
          <Typography fontWeight={700} variant="h4"><Trans i18nKey="lost-action-helper.title" ns="bsf" /></Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography><Trans i18nKey="lost-action-helper.action-label" ns="bsf" /></Typography>
            <Box width={325}>
              <BozjaLostActionSelectorComponent
                lostAction={lostActionState}
                handleActionUpdate={handleActionUpdate}
              />
            </Box>
          </Stack>
          <BozjaLostActionHelperDataComponent lostAction={lostActionState} />
        </Stack>
      </Box>

    </Container>
  );
}
