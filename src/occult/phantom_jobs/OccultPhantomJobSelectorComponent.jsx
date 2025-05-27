import {
  Box, FormControl, MenuItem, Select, Stack, Tooltip, Typography,
} from '@mui/material';
import React, { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import OccultPhantomJobInformationTooltipComponent from './OccultPhantomJobInformationTooltipComponent';
import PhantomJobHelper from '../lib/PhantomJobHelper';

export default function OccultPhantomJobSelectorComponent({ phantomJob, handleJobUpdate }) {
  function renderJob(job) {
    return (
      <MenuItem value={job.name} key={`selector-${uuidv4()}`}>
        <Tooltip
          arrow
          placement="left"
          enterDelay={500}
          title={(
            <OccultPhantomJobInformationTooltipComponent
              phantomJob={job.name}
              jobData={job}
            />
            )}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <img
              src={`${process.env.PUBLIC_URL}/assets/phantomjobs/${job.image}.png`}
              alt={job.name}
            />
            <Typography>{job.name}</Typography>
          </Stack>
        </Tooltip>
      </MenuItem>
    );
  }

  function renderSelectorMenu() {
    const phantomJobs = PhantomJobHelper.getPhantomJobs();

    const menuItems = [];

    menuItems.push(<MenuItem value="" key={`selector-${uuidv4()}`}>None</MenuItem>);
    menuItems.push(...Object.values(phantomJobs).map((job) => renderJob(job)));

    return menuItems;
  }

  const renderSelectedJob = useCallback((jobName) => {
    if (jobName === '') {
      return (
        <Stack direction="row" spacing={2} alignItems="center">
          <Box width={32} height={32} />
          <Typography>None</Typography>
        </Stack>
      );
    }
    console.log('selector job name', jobName);
    const job = PhantomJobHelper.getPhantomJobData(jobName);

    return (
      <Tooltip
        arrow
        placement="top"
        enterDelay={600}
        disableInteractive
        title={(
          <OccultPhantomJobInformationTooltipComponent
            phantomJob={jobName}
            jobData={job}
          />
        )}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <img src={`${process.env.PUBLIC_URL}/assets/phantomjobs/${job.image}.png`} width={32} height={32} alt={job.full} />
          <Typography>{job.name}</Typography>
        </Stack>
      </Tooltip>
    );
  });

  const defaultJob = phantomJob ?? '';
  const menuItems = renderSelectorMenu();

  return (
    <Box width={325}>
      <Stack direction="row">
        <FormControl sx={{ width: 325 }}>
          <Select
            fullWidth
            displayEmpty
            size="small"
            value={defaultJob}
            renderValue={renderSelectedJob}
            onChange={handleJobUpdate}
          >
            {menuItems}
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
}
