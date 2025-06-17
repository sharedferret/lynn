import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { useTranslation, Trans } from 'react-i18next';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import React from 'react';

export default function OccultPhantomJobSupportActionComponent({ action }) {
  const theme = useTheme();
  const { t } = useTranslation('occult');

  function renderEnhancement(enhancement) {
    return (
      <Typography fontStyle="italic" textAlign="start" pl={3}>
        <Trans
          i18nKey="job-helper.enhancement"
          ns="occult"
          values={{
            level: enhancement.level,
            effect: t(`support-action.${action.code}.enhancement.${enhancement.level}`),
          }}
        />
      </Typography>
    );
  }

  return (
    <Container sx={{
      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      borderRadius: '12px',
    }}
    >
      <Box p={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/occultactions/${action.image}`}
            width={48}
            height={48}
            alt={action.name}
          />
          <Box width={12} />
          <Typography fontWeight={700} variant="h5">
            <Trans i18nKey={`support-action.${action.code}.name`} ns="occult" />
          </Typography>
          <Box flexGrow={1} />
          <LockOpenIcon />
          <Typography fontWeight={700} variant="h5">{ `Lv ${action.unlockLevel}` }</Typography>
        </Stack>
        <Box
          pt={2}
          pl={9}
        >
          <Stack direction="row" pl={3} alignItems="center" spacing={3} pb={1}>
            <Typography fontWeight={700}><Trans i18nKey={`skill-type.${action.abilityType}`} /></Typography>
            {action.duration
              ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Trans
                    i18nKey="action-detail-label.duration"
                    components={[
                      <Typography variant="body2" color="text.secondary" />,
                      <Typography fontWeight={600} />,
                    ]}
                    values={{
                      duration: action.duration,
                    }}
                  />
                </Box>
              )
              : null}
            {action.castTime
              ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Trans
                    i18nKey="action-detail-label.cast"
                    components={[
                      <Typography variant="body2" color="text.secondary" />,
                      <Typography fontWeight={600} />,
                    ]}
                    values={{
                      cast: action.castTime,
                    }}
                  />
                </Box>
              )
              : null}
            {action.recastTime
              ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Trans
                    i18nKey="action-detail-label.recast"
                    components={[
                      <Typography variant="body2" color="text.secondary" />,
                      <Typography fontWeight={600} />,
                    ]}
                    values={{
                      recast: action.recastTime,
                    }}
                  />
                </Box>
              )
              : null}
            {action.mpCost
              ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Trans
                    i18nKey="action-detail-label.mp"
                    components={[
                      <Typography variant="body2" color="text.secondary" />,
                      <Typography fontWeight={600} />,
                    ]}
                    values={{
                      mp: action.mpCost,
                    }}
                  />
                </Box>
              )
              : null}
            {action.charges
              ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Trans
                    i18nKey="action-detail-label.charges"
                    components={[
                      <Typography variant="body2" color="text.secondary" />,
                      <Typography fontWeight={600} />,
                    ]}
                    values={{
                      charges: action.charges,
                    }}
                  />
                </Box>
              )
              : null}

          </Stack>

          <Typography
            textAlign="left"
            pl={3}
            pr={2}
            style={{ whiteSpace: 'pre-wrap' }}
          >
            <Trans i18nKey={`support-action.${action.code}.description`} ns="occult" />
          </Typography>
          <Box height={8} />
          {
            action.enhancements
              ? action.enhancements.map((enhancement) => renderEnhancement(enhancement))
              : null
          }
        </Box>
      </Box>
    </Container>
  );
}
