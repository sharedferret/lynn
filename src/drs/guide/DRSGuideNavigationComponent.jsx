import {
  Box, Button, Container, Stack, Typography,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React from 'react';

import { findIndex } from 'underscore';
import guideSequence from './GuideData.json';

export default function DRSGuideNavigationComponent({ currentPage, updatePage }) {
  // get full name from sequence
  const pageIndex = findIndex(guideSequence.encounters, { id: currentPage });
  if (pageIndex < 0) {
    return <Container />;
  }

  const lastEntry = pageIndex > 0
    ? (
      <Button
        variant="outlined"
        startIcon={<ArrowBackIosIcon />}
        onClick={() => updatePage(guideSequence.encounters[pageIndex - 1].id)}
      >
        { guideSequence.encounters[pageIndex - 1].name }
      </Button>
    )
    : null;

  const nextEntry = pageIndex < guideSequence.encounters.length - 1
    ? (
      <Button
        variant="outlined"
        endIcon={<ArrowForwardIosIcon />}
        onClick={() => updatePage(guideSequence.encounters[pageIndex + 1].id)}
      >
        { guideSequence.encounters[pageIndex + 1].name }
      </Button>
    )
    : null;

  return (
    <Container>
      <Stack direction="row" alignItems="center">
        { lastEntry }
        <Box flexGrow="1">
          <Typography fontWeight="700" fontSize="2.5em">{ guideSequence.encounters[pageIndex].name }</Typography>
        </Box>
        { nextEntry }
      </Stack>
    </Container>
  );
}
