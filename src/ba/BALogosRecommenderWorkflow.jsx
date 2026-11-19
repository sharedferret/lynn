import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import findIndex from 'underscore/modules/findIndex';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import BALogosHolsterComponent from './BALogosHolsterComponent';
import recommendedActionsJson from './lib/RecommendedActions.json';

import './BALogosRecommenderWorkflow.css';

export default function BALogosRecommender({ workflow, handleWorkflowUpdate }) {
  function renderRoleSelection() {
    const recommendedActions = recommendedActionsJson.actions;
    const roles = Object.keys(recommendedActions);

    return (
      <Box className="BALogogramWorkflowContainer">
        <Stack
          spacing={2}
          sx={{
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: '700',
              }}
            >
              Welcome!
            </Typography>
            <Typography variant="h4">What role are you entering BA as?</Typography>
          </Box>
          <Divider />
          <Box>
            <Stack
              spacing={2}
              sx={{
                width: '100%',
              }}
            >
              {roles.map((item) => (
                <Box
                  key={`rolewf-${item}`}
                  sx={{
                    width: 390,
                  }}
                >
                  <Button
                    fullWidth
                    variant="outlined"
                    size="large"
                    onClick={(e) => handleWorkflowUpdate(e, { role: item })}
                    startIcon={
                      <Avatar src={`${process.env.PUBLIC_URL}/assets/roles/${item}.png`} />
                    }
                  >
                    {recommendedActions[item].name}
                  </Button>
                </Box>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Box>
    );
  }

  function renderLoadoutSelection(role) {
    const recommendedActions = recommendedActionsJson.actions;
    const { trays } = recommendedActions[role];

    return (
      <Box className="BALogogramWorkflowContainer">
        <Stack
          spacing={2}
          sx={{
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography variant="h4">Next, pick a loadout:</Typography>
          </Box>
          <Divider />
          <Box>
            <Stack
              spacing={2}
              sx={{
                width: '100%',
              }}
            >
              {trays.map((item) => (
                <Box
                  key={`baloadout-${item.title}`}
                  sx={{
                    width: 390,
                  }}
                >
                  <Button
                    fullWidth
                    variant="outlined"
                    size="large"
                    onClick={(e) => handleWorkflowUpdate(e, { role, tray: item.title })}
                    startIcon={(
                      <Avatar
                        src={`${process.env.PUBLIC_URL}/assets/logosactions/${item.buttonIcon}.png`}
                      />
                    )}
                  >
                    {item.title}
                  </Button>
                  <Typography variant="caption">{item.subtitle}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Box>
    );
  }

  const recommendedActions = recommendedActionsJson.actions;

  if (workflow == null || workflow.role == null) {
    return renderRoleSelection();
  } if (workflow.tray == null) {
    return renderLoadoutSelection(workflow.role);
  }

  const roleTrays = recommendedActions[workflow.role].trays;
  const trayID = findIndex(roleTrays, { title: workflow.tray });

  return (
    <Box className="BALogogramWorkflowContainer">
      <Stack
        spacing={2}
        sx={{
          alignItems: 'center',
        }}
      >
        <Typography variant="h4">Here are your recommended logos actions!</Typography>
        <Box sx={{
          maxWidth: 600,
        }}
        >
          <Typography>
            You can build these at a Logos Manipulator. Pop and activate your Spirit of
            the Remembered action when you zone in to the Baldesion Arsenal, then pop your
            Initial plate. Plates 1-6 go in your action tray to be used during the instance.
          </Typography>
        </Box>
        <Button
          variant="outlined"
          size="large"
          startIcon={<ArrowBackIosNewIcon />}
          onClick={(e) => handleWorkflowUpdate(e, { role: null, tray: null })}
        >
          Start Over
        </Button>
        <Divider />
        <BALogosHolsterComponent tray={roleTrays[trayID]} />
      </Stack>
    </Box>
  );
}
