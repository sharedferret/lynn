import React from 'react';
import {
  Accordion, AccordionDetails, AccordionSummary, Box, Divider, Stack, Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { v4 as uuidv4 } from 'uuid';

function ForecastResultsGuideComponent({ filter }) {
  return (
    <Box width={800}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>Guide</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack alignItems="flex-start">
            <Typography fontWeight={700}>Zone</Typography>
            <Typography>{filter.guide.zone}</Typography>
            <Box height={24} />
            <Typography fontWeight={700}>Mobs</Typography>
            <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={1}>
              {
                filter.guide.mobs.map((i) => (
                  <Stack direction="row" alignItems="center" key={`mob-${uuidv4()}`}>
                    {
                      i.rank
                        ? (
                          <Box pr={1}>
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
            <Box height={24} />
            <Typography fontWeight={700}>Method</Typography>
            <Typography textAlign="left">
              {filter.guide.method}
            </Typography>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default ForecastResultsGuideComponent;
