import {
  Avatar, Box, Button, Divider, Stack, Step, StepContent, StepLabel, Stepper, Typography,
} from '@mui/material';
import React, { useCallback } from 'react';

import { ArrowBackIosNew } from '@mui/icons-material';
import { findIndex } from 'underscore';
import recommendedActionsJson from './lib/RecommendedActions.json';
import BALogosHolsterComponent from './BALogosHolsterComponent';

const steps = [
  {
    label: 'Select role',
    completedLabelStart: 'Role: ',
    description: 'What role are you entering BA as?',
  },
  {
    label: 'Select loadout',
    description: 'Next, pick a loadout. If you\'re new, select First Timer.',
  },
];

export default function BANewLogosRecommenderWorkflow() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [role, setRole] = React.useState(null);
  const [tray, setTray] = React.useState(null);

  const handleNext = useCallback((e, data) => {
    if (data.role) {
      setRole(data.role);
    }
    if (data.tray) {
      setTray(data.tray);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, [setRole, setTray, setActiveStep]);

  const handleReset = useCallback(() => {
    setActiveStep(0);
    setRole(null);
    setTray(null);
  }, [setRole, setTray, setActiveStep]);

  const recommendedActions = recommendedActionsJson.actions;
  const roles = Object.keys(recommendedActions);
  let trays;
  if (role) {
    trays = recommendedActions[role].trays;
  }

  const trayId = role && tray ? findIndex(recommendedActions[role].trays, { title: tray }) : 0;

  return (
    <Box minWidth={600} maxWidth={1600} minHeight={600} mt="30px" ml="auto" mr="auto" pb="10px">
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>
              {
                activeStep > 0 && index === 0
                  ? `${step.completedLabelStart} ${recommendedActions[role].name}`
                  : step.label

              }

            </StepLabel>
            <StepContent>
              <Typography textAlign="left" fontSize={20} pb={2}>{step.description}</Typography>
              {activeStep === 0
                ? (
                  <Stack spacing={2} width="100%">
                    {roles.map((item) => (
                      <Box key={`rolewf-${item}`}>
                        <Button
                          fullWidth
                          variant="outlined"
                          size="large"
                          onClick={(e) => handleNext(e, { role: item })}
                          startIcon={
                            <Avatar src={`${process.env.PUBLIC_URL}/assets/roles/${item}.png`} />
                          }
                        >
                          {recommendedActions[item].name}
                        </Button>
                      </Box>
                    ))}
                  </Stack>
                )
                : null}
              {
                activeStep === 1
                  ? (
                    <Stack spacing={2} width="100%">
                      {trays.map((item) => (
                        <Box width={390} key={`baloadout-${item.title}`}>
                          <Button
                            fullWidth
                            variant="outlined"
                            size="large"
                            onClick={(e) => handleNext(e, { role, tray: item.title })}
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
                  )
                  : null
              }
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length
        ? (
          <Box className="BALogogramWorkflowContainer">
            <Stack alignItems="center" spacing={2}>
              <Typography variant="h4">Here are your recommended logos actions!</Typography>
              <Box maxWidth={600}>
                <Typography>
                  You can build these at a Logos Manipulator. Make sure to pop and activate
                  your Spirit of the Remembered action before entering the Baldesion Arsenal.
                </Typography>
              </Box>
              <Button
                variant="outlined"
                size="large"
                startIcon={<ArrowBackIosNew />}
                onClick={handleReset}
              >
                Start Over
              </Button>
              <Divider />
              <BALogosHolsterComponent tray={recommendedActions[role].trays[trayId]} />
            </Stack>
          </Box>
        )
        : null}
    </Box>
  );
}
