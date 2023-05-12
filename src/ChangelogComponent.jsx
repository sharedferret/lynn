import React from 'react';
import {
  Box,
  Stack,
  Typography,
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';

import changelog from './changelog.json';

export default function ChangelogComponent() {
  const renderItem = (item) => (
    <TimelineItem>
      <TimelineOppositeContent color="textSecondary">
        <Stack>
          <Typography>
            v
            {item.version}
          </Typography>
          <Typography>
            {new Date(item.timestamp).toLocaleString('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}

          </Typography>
        </Stack>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Stack>
          {
            item.changes.map((i) => (
              <Typography>
                &#x2022;
                {' '}
                {i}
              </Typography>
            ))
          }
        </Stack>
      </TimelineContent>
    </TimelineItem>
  );

  return (
    <Box flexGrow={1} height="100%" sx={{ pt: { xs: 14, md: 5 } }}>
      <Stack>
        <Typography variant="h3" fontWeight={700}>Changelog</Typography>
        <Timeline
          sx={{
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.2,
            },
          }}
        >
          {
            changelog.changes.map((i) => renderItem(i))
          }

        </Timeline>
      </Stack>
    </Box>
  );
}
