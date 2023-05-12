import React, { useState, useCallback } from 'react';

import { Box, Stack, Typography } from '@mui/material';
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
      `lynn.pet! - ${event.target.value}`,
      `/bozja/lostaction/${lostActionUrl}`,
    );

    setLostActionState(event.target.value);
  }, [window, setLostActionState]);

  /**
   * Render Logic
   */
  return (
    <Box width={1000} minHeight={600}>
      <Stack spacing={2} minHeight={100} p={1} alignItems="center">
        <Typography fontWeight={700} variant="h4">Bozja Lost Action Helper</Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography>Action: </Typography>
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
  );
}
