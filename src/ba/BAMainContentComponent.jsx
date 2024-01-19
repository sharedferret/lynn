import React from 'react';

import { Stack, Typography } from '@mui/material';
import BANewLogosRecommenderWorkflow from './BANewLogosRecommenderWorkflow';

export default function BAMainContentComponent({
  holster,
  encodedHolster,
  resetTimer,
}) {
  /**
   * Render Logic
   */

  return (
    <Stack>
      <Typography variant="h4" fontWeight={700}>BA Logos Action Helper</Typography>
      <BANewLogosRecommenderWorkflow
        holster={holster}
        encodedHolster={encodedHolster}
        resetTimer={resetTimer}
      />
    </Stack>
  );
}
