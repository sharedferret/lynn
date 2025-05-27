import {
  Box, Grid, Tooltip, useMediaQuery, useTheme,
} from '@mui/material';
import React from 'react';
import OccultPhantomJobInformationTooltipComponent from './OccultPhantomJobInformationTooltipComponent';

const phantomJobs = require('../lib/PhantomJobs.json');

export default function OccultPhantomJobIconSelectorComponent({ handleJobUpdate }) {
  const theme = useTheme();
  const jobNames = Object.keys(phantomJobs.phantomJobs);

  return (
    <Grid
      container
      columns={10}
      maxWidth={375}
    >
      {jobNames.map((i) => {
        const job = phantomJobs.phantomJobs[i];
        return (
          <Grid item xs={1}>
            <Box
              onClick={() => handleJobUpdate({ target: { value: i } })}
              style={{ cursor: 'pointer' }}
            >
              <Tooltip
                arrow
                placement={useMediaQuery(theme.breakpoints.up('md')) ? 'bottom' : 'top'}
                enterDelay={200}
                disableInteractive
                title={
                    useMediaQuery(theme.breakpoints.up('md'))
                      ? (
                        <OccultPhantomJobInformationTooltipComponent
                          phantomJob={job.name}
                          jobData={job}
                        />
                      )
                      : ''
                  }
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/phantomjobs/${job.image}.png`}
                  width={64}
                  height={48}
                  alt={i}
                />
              </Tooltip>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
}
