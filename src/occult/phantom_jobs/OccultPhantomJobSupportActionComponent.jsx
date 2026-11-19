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
      <Typography
        sx={{
          fontStyle: 'italic',
          textAlign: 'start',
          pl: 3,
        }}
      >
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
      <Box sx={{
        p: 2,
      }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: 'center',
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/occultactions/${action.image}`}
            width={48}
            height={48}
            alt={action.name}
          />
          <Box sx={{
            width: 12,
          }}
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
            }}
          >
            <Trans i18nKey={`support-action.${action.code}.name`} ns="occult" />
          </Typography>
          <Box sx={{
            flexGrow: 1,
          }}
          />
          <LockOpenIcon />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
            }}
          >
            { `Lv ${action.unlockLevel}` }
          </Typography>
        </Stack>
        <Box
          sx={{
            pt: 2,
            pl: 9,
          }}
        >
          <Stack
            direction="row"
            spacing={3}
            sx={{
              pl: 3,
              alignItems: 'center',
              pb: 1,
            }}
          >
            <Typography sx={{
              fontWeight: 700,
            }}
            >
              <Trans i18nKey={`skill-type.${action.abilityType}`} />
            </Typography>
            {action.duration
              ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Trans
                    i18nKey="action-detail-label.duration"
                    components={[
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                        }}
                      />,
                      <Typography sx={{
                        fontWeight: 600,
                      }}
                      />,
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
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                        }}
                      />,
                      <Typography sx={{
                        fontWeight: 600,
                      }}
                      />,
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
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                        }}
                      />,
                      <Typography sx={{
                        fontWeight: 600,
                      }}
                      />,
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
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                        }}
                      />,
                      <Typography sx={{
                        fontWeight: 600,
                      }}
                      />,
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
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                        }}
                      />,
                      <Typography sx={{
                        fontWeight: 600,
                      }}
                      />,
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
            style={{ whiteSpace: 'pre-wrap' }}
            sx={{
              textAlign: 'left',
              pl: 3,
              pr: 2,
            }}
          >
            <Trans i18nKey={`support-action.${action.code}.description`} ns="occult" />
          </Typography>
          <Box sx={{
            height: 8,
          }}
          />
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
