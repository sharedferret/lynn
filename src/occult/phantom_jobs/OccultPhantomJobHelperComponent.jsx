import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import OccultPhantomJobSelectorComponent from './OccultPhantomJobSelectorComponent';
import OccultPhantomJobHelperDataComponent from './OccultPhantomJobHelperDataComponent';
import OccultPhantomJobIconSelectorComponent from './OccultPhantomJobIconSelectorComponent';

export default function OccultPhantomJobHelperComponent({ phantomJob }) {
  /**
   * Component state
   *
   */
  let job = phantomJob ?? 'Freelancer';
  job = job.replaceAll('_', ' ');

  const [jobState, setJobState] = useState(job);

  /**
   * TODO: If actions are selectable, add the ability to keep state for them here.
   */

  const handleJobUpdate = useCallback((event) => {
    const jobUri = event.target.value.replaceAll(' ', '_');
    window.history.pushState(
      jobUri,
      `${event.target.value} - forays.info`,
      `/occult/phantomjob/${jobUri}`,
    );

    setJobState(event.target.value);
  }, [window, setJobState]);

  /**
   * Render logic
   */
  return (
    <Box
      component="main"
      margin="auto"
      sx={{ flexGrow: 1, pt: { xs: 14, md: 5 } }}
    >
      <Container maxWidth="lg">

        <Box p={3}>
          <Stack spacing={2} minHeight={100} p={1} alignItems="center">
            <Typography fontWeight={700} variant="h4">Occult Crescent Phantom Job Helper</Typography>
            <OccultPhantomJobIconSelectorComponent handleJobUpdate={handleJobUpdate} />
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography>Phantom Job: </Typography>
              <Box width={325}>
                <OccultPhantomJobSelectorComponent
                  phantomJob={jobState}
                  handleJobUpdate={handleJobUpdate}
                />
              </Box>
            </Stack>
            { jobState ? <OccultPhantomJobHelperDataComponent phantomJob={jobState} /> : null }
          </Stack>
        </Box>

      </Container>
    </Box>
  );
}
