import React from 'react';

import { Box, Stack, Typography } from '@mui/material';
import BozjaLostActionSelectorComponent from './BozjaLostActionSelectorComponent';
import BozjaLostActionHelperDataComponent from './BozjaLostActionHelperDataComponent';
import { useState } from 'react';

export default function BozjaLostActionHelperComponent(props) {
  /**
   * Component State
   */
  let action = props.lostAction ?? '';
  action = action.replaceAll('_', ' ');
  const [lostAction, setLostAction] = useState(action);

  function handleActionUpdate(event) {
    const lostActionUrl = event.target.value.replaceAll(' ', '_');
    window.history.pushState(lostActionUrl, 'lynn.pet! - ' + event.target.value, '/bozja/lostaction/' + lostActionUrl)

    setLostAction(event.target.value);
  }

  /**
   * Render Logic
   */
  return (
    <Box width={1000}>
      <Stack spacing={2} minHeight={100} p={1} alignItems={'center'}>
        <Typography fontWeight={700} variant={'h4'}>Bozja Lost Action Helper</Typography>
        <Stack direction={'row'} spacing={2} alignItems={'center'}>
          <Typography>Action: </Typography>
          <Box width={325}>
            <BozjaLostActionSelectorComponent
              lostAction={ lostAction }
              handleActionUpdate={ handleActionUpdate }
            />
          </Box>
        </Stack>
        <BozjaLostActionHelperDataComponent lostAction={ lostAction } />
      </Stack>
    </Box>
  );
}
