import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function ForecastResultsGuideComponent({ filter }) {
  return (
    <Box
      sx={{
        width: '90%',
        maxWidth: 800,
      }}
    >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>Guide</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack sx={{
            alignItems: 'flex-start',
          }}
          >
            <Typography sx={{
              fontWeight: 700,
            }}
            >
              Zone
            </Typography>
            <Typography>{filter.guide.zone}</Typography>
            <Box sx={{
              height: 24,
            }}
            />
            <Typography sx={{
              fontWeight: 700,
            }}
            >
              Mobs
            </Typography>
            <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={1}>
              {
                filter.guide.mobs.map((i) => (
                  <Stack
                    direction="row"
                    key={`mob-${crypto.randomUUID()}`}
                    sx={{
                      alignItems: 'center',
                    }}
                  >
                    {
                      i.rank
                        ? (
                          <Box sx={{
                            pr: 1,
                          }}
                          >
                            <img
                              src={`${process.env.PUBLIC_URL}/assets/icons/rank${i.rank}.png`}
                              width={24}
                              height={24}
                              alt="Rank"
                            />
                          </Box>
                        )
                        : <Typography>{`Lv${i.level}`}</Typography>
                    }

                    {
                      i.element
                        ? (
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/eureka/eureka_${i.element}.png`}
                            width={24}
                            height={24}
                            alt={i.element}
                          />
                        )
                        : null
                    }

                    {
                      i.syncRequired === true
                        ? (
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/sync.png`}
                            width={20}
                            height={20}
                            alt="ILVL sync required"
                          />
                        )
                        : null
                    }
                    <Typography>{i.mob}</Typography>
                  </Stack>
                ))
              }
            </Stack>
            <Box sx={{
              height: 24,
            }}
            />
            <Typography sx={{
              fontWeight: 700,
            }}
            >
              Method
            </Typography>
            <Typography sx={{
              textAlign: 'left',
            }}
            >
              {filter.guide.method}
            </Typography>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default ForecastResultsGuideComponent;
