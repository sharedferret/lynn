import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React, { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Trans } from 'react-i18next';
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
            <Typography><Trans i18nKey={`phantom-job.${job.key}.name`} ns="occult" /></Typography>
          </Stack>
        </Tooltip>
      </MenuItem>
    );
  }

  function renderSelectorMenu() {
    const phantomJobs = PhantomJobHelper.getPhantomJobs();

    const menuItems = [];

    menuItems.push(<MenuItem value="" key={`selector-${uuidv4()}`}><Trans i18nKey="job-helper.none" ns="occult" /></MenuItem>);
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
          <Typography><Trans i18nKey={`phantom-job.${job.key}.name`} ns="occult" /></Typography>
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
