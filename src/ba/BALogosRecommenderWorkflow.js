import React from 'react';
import { Avatar, Box, Button, Divider, Stack, Typography } from '@mui/material';
import { findIndex } from 'underscore';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import BALogosHolsterComponent from './BALogosHolsterComponent';

import './BALogosRecommenderWorkflow.css';

export default function BALogosRecommender({ workflow, handleWorkflowUpdate }) {
  function renderRoleSelection(data) {
    const recommendedActions = require('./lib/RecommendedActions.json').actions;
    const roles = Object.keys(recommendedActions);

    return (
      <Box className="BALogogramWorkflowContainer">
        <Stack alignItems={'center'} spacing={2}>
          <Box>
            <Typography variant='h4' fontWeight={'700'}>Welcome!</Typography>
            <Typography variant='h4'>What role are you entering BA as?</Typography>
          </Box>
          <Divider />
          <Box>
            <Stack spacing={2} width={'100%'}>
              {roles.map(item => 
                <Box width={390} key={'rolewf-' + item}>
                  <Button
                    fullWidth={true}
                    variant='outlined'
                    size='large'
                    onClick={(e) => handleWorkflowUpdate(e, {role: item})}
                    startIcon={<Avatar src={`${process.env.PUBLIC_URL}/assets/roles/${item}.png`} />}
                  >
                    {recommendedActions[item].name}
                  </Button>
                </Box>
              )}
            </Stack>
          </Box>
        </Stack>
      </Box>
    );
  }

  function renderLoadoutSelection(role) {
    const recommendedActions = require('./lib/RecommendedActions.json').actions;
    const trays = recommendedActions[role].trays;

    return (
      <Box className="BALogogramWorkflowContainer">
        <Stack alignItems={'center'} spacing={2}>
          <Box>
            <Typography variant='h4'>Next, pick a loadout:</Typography>
          </Box>
          <Divider />
          <Box>
            <Stack spacing={2} width={'100%'}>
              {trays.map(item =>
                  <Box width={390} key={'baloadout-' + item.title}>
                    <Button
                      fullWidth={true}
                      variant='outlined'
                      size='large'
                      onClick={(e) => handleWorkflowUpdate(e, { role: role, tray: item.title})}
                      startIcon={<Avatar src={`${process.env.PUBLIC_URL}/assets/logosactions/${item.buttonIcon}.png`} />}
                    >
                      {item.title}
                    </Button>
                    <Typography variant='caption'>{item.subtitle}</Typography>
                  </Box>
                )}
            </Stack>
          </Box>
        </Stack>
      </Box>
    )
  }

  const recommendedActions = require('./lib/RecommendedActions.json').actions;
    
  if (workflow == null || workflow.role == null) {
    return renderRoleSelection();
  } else if (workflow.tray == null) {
    return renderLoadoutSelection(workflow.role);
  }

  const roleTrays = recommendedActions[workflow.role].trays;
  const trayID = findIndex(roleTrays, { title: workflow.tray });

  return (
    <Box className="BALogogramWorkflowContainer">
      <Stack alignItems={'center'} spacing={2}>
        <Typography variant='h4'>Here are your recommended logos actions!</Typography>
        <Box maxWidth={600}>
          <Typography>You can build these at a Logos Manipulator. Make sure to pop and activate your Spirit of the Remembered action before entering the Baldesion Arsenal.</Typography>
        </Box>
        <Button
          variant="outlined"
          size="large"
          startIcon={<ArrowBackIosNewIcon />}
          onClick={(e) => handleWorkflowUpdate(e, {role: null, tray: null})}
        >
          Start Over
        </Button>
        <Divider />
        <BALogosHolsterComponent tray={roleTrays[trayID]} />
      </Stack>
    </Box>
  );
}
