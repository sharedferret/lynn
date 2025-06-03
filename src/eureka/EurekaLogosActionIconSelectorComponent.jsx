import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/material/styles/useTheme';
import React from 'react';
import EurekaLogosActionInformationTooltipComponent from './EurekaLogosActionInformationTooltipComponent';

const logosActions = require('../ba/lib/LogosActions.json');

export default function EurekaLogosActionIconSelectorComponent({ handleActionUpdate }) {
  const theme = useTheme();
  const actionNames = Object.keys(logosActions.logosActions);
  return (
    <Grid
      container
      columns={10}
      maxWidth={375}
    >
      {actionNames.map((i) => {
        const action = logosActions.logosActions[i];
        return (
          <Grid item xs={1}>
            <Box
              onClick={() => handleActionUpdate({ target: { value: i } })}
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
                      <EurekaLogosActionInformationTooltipComponent
                        logosAction={action.full}
                        actionData={action}
                      />
                    )
                    : ''
                }
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/logosactions/${action.image}.png`}
                  width={32}
                  height={32}
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
