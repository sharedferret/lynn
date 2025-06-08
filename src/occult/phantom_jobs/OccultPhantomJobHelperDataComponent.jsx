import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import React from 'react';
import OccultPhantomJobInformationComponent from './OccultPhantomJobInformationComponent';
import OccultPhantomJobSupportActionContainerComponent from './OccultPhantomJobSupportActionContainerComponent';
import PhantomJobHelper from '../lib/PhantomJobHelper';
import OccultPhantomJobLevelingComponent from './OccultPhantomJobLevelingComponent';

export default function OccultPhantomJobHelperDataComponent({ phantomJob }) {
  const phantomJobData = PhantomJobHelper.getPhantomJobData(phantomJob);

  return (
    <Container maxWidth="lg" sx={{ width: '100%' }}>
      <Stack spacing={4} alignItems="flex-start" width="100%">
        <Divider sx={{ width: '50%', margin: '0 auto', mb: 3 }} />
        { phantomJobData ? (
          <OccultPhantomJobInformationComponent
            phantomJob={phantomJob}
            phantomJobData={phantomJobData}
          />
        ) : null }
        <OccultPhantomJobLevelingComponent expByLevel={phantomJobData.exp} isFreelancer={phantomJob === 'Freelancer'} />
        { /* TODO: Add Support Actions down here, as its own component. For now, show all of
             them, but if we want them to be selectable we can store that info on the
             helper component. */ }
        <OccultPhantomJobSupportActionContainerComponent
          supportActions={phantomJobData.supportActions}
        />
      </Stack>
    </Container>
  );
}
