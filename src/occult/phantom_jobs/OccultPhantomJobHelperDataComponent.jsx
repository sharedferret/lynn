import { Container, Divider, Stack } from '@mui/material';
import React from 'react';
import OccultPhantomJobInformationComponent from './OccultPhantomJobInformationComponent';

export default function OccultPhantomJobHelperDataComponent({ phantomJob = 'None' }) {
  const phantomJobData = {
    abilityType: 'Test',
    actionText: 'Action text',
    roles: ['caster'],
    image: '',
  };

  return (
    <Container maxWidth="lg" sx={{ width: '100%' }}>
      <Stack spacing={4} alignItems="flex-start" width="100%">
        <Divider sx={{ width: '50%', margin: '0 auto', mb: 3 }} />
        <OccultPhantomJobInformationComponent
          phantomJob={phantomJob}
          phantomJobData={phantomJobData}
        />
      </Stack>
    </Container>
  );
}
