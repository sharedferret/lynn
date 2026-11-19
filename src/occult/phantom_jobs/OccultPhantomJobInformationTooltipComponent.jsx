import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Trans } from 'react-i18next';

export default function OccultPhantomJobInformationTooltipComponent({ phantomJob, jobData }) {
  return (
    <Box sx={{
      maxWidth: { md: 400 },
    }}
    >
      <Stack
        spacing={1}
        sx={{
          pt: 2,
          pb: 2,
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            pl: 2,
            pr: 1,
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/phantomjobs/${jobData.image}.png`}
            width={32}
            height={32}
            alt={phantomJob}
          />
          <Box sx={{
            width: 12,
          }}
          />
          <Typography sx={{
            fontWeight: 700,
          }}
          >
            <Trans i18nKey={`phantom-job.${jobData.key}.name`} ns="occult" />
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          sx={{
            pl: 2,
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 10,
            }}
          >
            {
              jobData.abilityType
                ? <Trans i18nKey={`skill-type.${jobData.abilityType}`} />
                : null
            }
          </Typography>
          {jobData.duration
            ? (
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 10,
                }}
              >
                <Trans i18nKey="action-detail-label.duration" values={{ duration: jobData.duration }} />
              </Typography>
            )
            : null}
          {jobData.castTime
            ? (
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 10,
                }}
              >
                <Trans i18nKey="action-detail-label.cast" values={{ cast: jobData.castTime }} />
              </Typography>
            )
            : null}
          {jobData.recastTime
            ? (
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 10,
                }}
              >
                <Trans i18nKey="action-detail-label.recast" values={{ recast: jobData.recastTime }} />
              </Typography>
            )
            : null}
          {jobData.mpCost
            ? (
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 10,
                }}
              >
                <Trans i18nKey="action-detail-label.mp" values={{ mp: jobData.mpCost }} />
              </Typography>
            )
            : null}
          {jobData.charges
            ? (
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 10,
                }}
              >
                <Trans i18nKey="action-detail-label.charges" values={{ charges: jobData.charges }} />
              </Typography>
            )
            : null}

        </Stack>
        <Typography
          style={{ whiteSpace: 'pre-wrap' }}
          sx={{
            textAlign: 'left',
            pl: 2,
            pr: 1,
            fontSize: 12,
          }}
        >
          <Trans i18nKey={`phantom-job.${jobData.key}.text`} ns="occult" />
        </Typography>
        {
          jobData.totalExp
            ? (
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 12,
                  textAlign: 'left',
                  pl: 2,
                  pr: 1,
                }}
              >
                <Trans i18nKey="job-helper.total-exp" ns="occult" values={{ exp: jobData.totalExp }} />
              </Typography>
            )
            : null
        }

      </Stack>
    </Box>
  );
}
