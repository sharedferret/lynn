import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

export default function OccultPhantomJobInformationTooltipComponent({ phantomJob, jobData }) {
  return (
    <Box maxWidth={{ md: 400 }}>
      <Stack pt={2} pb={2} spacing={1}>
        <Stack direction="row" alignItems="center" pl={2} pr={1}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/phantomjobs/${jobData.image}.png`}
            width={32}
            height={32}
            alt={phantomJob}
          />
          <Box width={12} />
          <Typography fontWeight={700}>{phantomJob}</Typography>
        </Stack>

        <Stack direction="row" pl={2} alignItems="center" spacing={2}>
          <Typography fontWeight={700} fontSize={10}>{jobData.abilityType}</Typography>
          {jobData.duration
            ? (
              <Typography fontWeight={700} fontSize={10}>
                Duration:
                {' '}
                {jobData.duration}
              </Typography>
            )
            : null}
          {jobData.castTime
            ? (
              <Typography fontWeight={700} fontSize={10}>
                Cast:
                {' '}
                {jobData.castTime}
                s
              </Typography>
            )
            : null}
          {jobData.recastTime
            ? (
              <Typography fontWeight={700} fontSize={10}>
                Recast:
                {' '}
                {jobData.recastTime}
                s
              </Typography>
            )
            : null}
          {jobData.mpCost
            ? (
              <Typography fontWeight={700} fontSize={10}>
                MP:
                {' '}
                {jobData.mpCost}
              </Typography>
            )
            : null}
          {jobData.charges
            ? (
              <Typography fontWeight={700} fontSize={10}>
                Charges:
                {' '}
                {jobData.charges}
              </Typography>
            )
            : null}

        </Stack>
        <Typography
          textAlign="left"
          pl={2}
          pr={1}
          style={{ whiteSpace: 'pre-wrap' }}
          fontSize={12}
        >
          {jobData.jobText}
        </Typography>
      </Stack>
    </Box>
  );
}
