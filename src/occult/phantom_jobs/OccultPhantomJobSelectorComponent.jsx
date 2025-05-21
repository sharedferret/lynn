import {
  Box, FormControl, MenuItem, Select, Stack, Tooltip, Typography,
} from '@mui/material';
import React, { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import OccultPhantomJobInformationTooltipComponent from './OccultPhantomJobInformationTooltipComponent';

export default function OccultPhantomJobSelectorComponent({ phantomJob, handleJobUpdate }) {
  /**
  function renderSelectorMenuSection(items) {
    const menuItems = [];
    for (let i = 0; i < items.length; i += 1) {
      const job = items[i];
      // const jobData = DRSLostActionHelper.getLostActionData(action.full);
      const jobData = null;

      menuItems.push(
        <MenuItem value={job.full} key={`selector-${uuidv4()}`}>
          <Tooltip
            arrow
            placement="left"
            enterDelay={500}
            title={(
              <OccultPhantomJobInformationTooltipComponent
                phantomJob={job.full}
                jobData={jobData}
              />
              )}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <img
                src={`${process.env.PUBLIC_URL}/assets/lostactions/${action.image}.jpg`}
                alt={job.full}
              />
              <Typography>{job.full}</Typography>
            </Stack>
          </Tooltip>
        </MenuItem>,
      );
    }

    return menuItems;
  }
  */

  function renderSelectorMenu() {
    // const phantomJobs = DRSLostActionHelper.getLostActions();

    // Create sections
    // const actionsBySection = groupBy(phantomJobs, (i) => i.type);

    const menuItems = [];

    menuItems.push(<MenuItem value="" key={`selector-${uuidv4()}`}>None</MenuItem>);

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
    // const job = DRSLostActionHelper.getLostActionData(jobName);
    const job = null;

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
          <img src={`${process.env.PUBLIC_URL}/assets/phantomjobs/${job.image}.jpg`} width={32} height={32} alt={job.full} />
          <Typography>{job.full}</Typography>
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
