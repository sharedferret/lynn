import React, { useCallback } from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import findIndex from 'underscore/modules/findIndex';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

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
    completedLabelStart: 'Loadout: ',
    description: 'Next, pick a loadout. If you\'re new, select First Timer.',
  },
];

export default function BANewLogosRecommenderWorkflow({
  holster,
}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [role, setRole] = React.useState(null);
  const [tray, setTray] = React.useState(null);
  const [firstHolster, setFirstHolster] = React.useState(holster);
  // const [resetTimerState, setResetTimerState] = React.useState(resetTimer);
  // const [showStepper, setShowStepper] = React.useState(true);

  const recommendedActions = recommendedActionsJson.actions;
  const roles = Object.keys(recommendedActions);

  // if (resetTimer !== resetTimerState) {
  //  setActiveStep(0);
  //  setRole(null);
  //  setTray(null);
  //  setResetTimerState(resetTimer);
  // }

  const handleNext = useCallback((e, data) => {
    if (data.role) {
      setRole(data.role);
    }
    if (data.tray) {
      setTray(data.tray);
    }
    if (data.role && data.tray) {
      const trayId = findIndex(recommendedActions[data.role].trays, { title: data.tray });
      const trayUri = recommendedActions[data.role].trays[trayId].uri;
      window.history.pushState(
        {},
        'FFXIV Field Operations Assistant - forays.info',
        `/ba/${data.role}/${trayUri}`,
      );
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, [setRole, setTray, setActiveStep]);

  if (holster && firstHolster && firstHolster.role && activeStep === 0) {
    // A holster was passed in. Advance the stepper to the last step, and populate all data.
    const trayId = findIndex(recommendedActions[holster.role].trays, { uri: holster.tray });
    // const selectedHolsterData = recommendedActions[holster.role].trays[trayId];
    setActiveStep(2);
    setRole(holster.role);
    setTray(recommendedActions[holster.role].trays[trayId].title);
    // setShowStepper(true);
  }

  const handleReset = useCallback(() => {
    setActiveStep(0);
    setRole(null);
    setTray(null);
    setFirstHolster(null);
    window.history.pushState(
      {},
      'FFXIV Field Operations Assistant - forays.info',
      '/ba',
    );
  }, [setRole, setTray, setActiveStep]);

  const handleBack = useCallback(() => {
    switch (activeStep) {
      case 1: setRole(null); setFirstHolster(null); break;
      case 2: setTray(null); break;
      default:
    }

    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    window.history.pushState(
      {},
      'FFXIV Field Operations Assistant - forays.info',
      '/ba',
    );
  });

  const displayBackButton = () => (
    <Stack direction="row" spacing={2}>
      <Box>
        <Button
          variant="outlined"
          size="large"
          startIcon={<RestartAltIcon />}
          onClick={handleReset}
        >
          Start Over
        </Button>
      </Box>
      {tray && tray.name
        ? null
        : (
          <Box>
            <Button
              variant="outlined"
              size="large"
              startIcon={<ArrowBackIosNewIcon />}
              onClick={handleBack}
            >
              Back
            </Button>
          </Box>
        )}
    </Stack>
  );

  let trays;
  if (role) {
    trays = recommendedActions[role].trays;
  }

  const trayId = role && tray ? findIndex(recommendedActions[role].trays, { title: tray }) : -1;

  function getStepLabel(step, index) {
    if (activeStep > 0 && index === 0) {
      return `${step.completedLabelStart} ${recommendedActions[role].name}`;
    }
    if (activeStep > 1 && index === 1) {
      return `${step.completedLabelStart} ${trays[trayId].title}`;
    }
    return step.label;
  }

  const displayStepper = (() => (
    <Stepper activeStep={activeStep} orientation="vertical">
      {steps.map((step, index) => (
        <Step key={step.label}>
          <StepLabel>
            {getStepLabel(step, index)}
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
                      <Box key={`baloadout-${item.title}`}>
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
  ));

  return (
    <Box maxWidth={1600} minHeight={600} mt="30px" ml="auto" mr="auto" pb="10px">
      {displayStepper()}
      {activeStep > 0
        ? displayBackButton()
        : null}
      {activeStep === steps.length
        ? (
          <Box className="BALogogramWorkflowContainer">
            <Stack alignItems="center" spacing={2}>
              <Typography variant="h4">Here are your recommended logos actions!</Typography>
              <Box maxWidth={600}>
                <Typography>
                  You can build these at a Logos Manipulator. Pop and activate your Spirit of
                  the Remembered action before you zone in to the Baldesion Arsenal, then pop your
                  Initial plate. Plates 1-6 go in your action tray, and will be used as you
                  progress through the Arsenal.
                </Typography>
              </Box>
              <Divider />
              <BALogosHolsterComponent tray={recommendedActions[role].trays[trayId]} />
            </Stack>
          </Box>
        )
        : null}
    </Box>
  );
}
