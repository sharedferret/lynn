import {
  Container, Tab, Tabs, Typography, Box,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import DRSGuideNavigationComponent from './DRSGuideNavigationComponent';
import DRSGuideExplanationsComponent from './DRSGuideExplanationsComponent';

export default function DRSGuideMain({ guidePage }) {
  const [currentTab, setCurrentTab] = useState('explanation');
  const [currentPage, setCurrentPage] = useState(guidePage ?? 'trinity-seeker');

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const updatePage = useCallback((newValue) => {
    setCurrentPage(newValue);
    window.history.pushState(
      {},
      'FFXIV Field Operations Assistant - forays.info',
      `/drs/guide/${newValue}`,
    );
  }, [setCurrentPage]);

  return (
    <Container maxWidth="lg">
      <Typography fontWeight="700" fontSize="3em" pb={3}>Delubrum Reginae (Savage) Guide</Typography>
      <DRSGuideNavigationComponent currentPage={currentPage} updatePage={updatePage} />
      <Box sx={{ width: '100%' }} pt={2}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'capitalize',
              fontWeight: 'medium',
            },
          }}
        >
          <Tab value="explanation" label="Info and Explanations" />
          <Tab disabled value="timeline" label="Timeline" />
        </Tabs>
        <Box sx={{ mt: 2 }}>
          {currentTab === 'explanation' && <DRSGuideExplanationsComponent guidePage={currentPage} />}
          {currentTab === 'timeline' && <div>Coming soon, I guess?</div>}
        </Box>
      </Box>
    </Container>
  );
}
