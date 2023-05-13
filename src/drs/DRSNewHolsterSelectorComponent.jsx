import {
  Avatar, Box, Button, Stack, Step, StepContent, StepLabel, Stepper, Typography,
} from '@mui/material';
import React from 'react';
import DRSNewHolsterDisplayComponent from './DRSNewHolsterDisplayComponent';
import DRSHolsterHelper from './lib/DRSHolsterHelper';
import holsterMapping from './lib/HolsterMapping.json';
import holsterData from './lib/Holsters.json';

export default function DRSNewHolsterSelectorComponent({ holster, encodedHolster }) {
  const [selectedRunType, setSelectedRunType] = React.useState(null);
  const [selectedRole, setSelectedRole] = React.useState(null);
  const [selectedHolster, setSelectedHolster] = React.useState(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [firstHolster, setFirstHolster] = React.useState(holster);

  const runTypes = Object.keys(holsterMapping.runType);

  let roles = [];
  if (selectedRunType) {
    roles = Object.keys(holsterMapping.runType[selectedRunType].roles);
  }

  let availableHolsters = [];
  if (selectedRunType && selectedRole) {
    availableHolsters = holsterMapping.runType[selectedRunType].roles[selectedRole].holsters;
  }

  const steps = [
    {
      label: 'Select run type',
      description: 'Select your run\'s host and run type.',
      runTypes,
    },
    {
      label: 'Select role',
      description: 'What role are you playing in DRS?',
      roles,
    },
    {
      label: 'Select holster',
      description: 'Pick a holster.',
      availableHolsters,
    },
  ];

  const handleNext = React.useCallback((e, data) => {
    if (data.runType) {
      setSelectedRunType(data.runType);
    }
    if (data.role) {
      setSelectedRole(data.role);
    }
    if (data.holster) {
      setSelectedHolster(data.holster);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, [setSelectedRunType, setSelectedRole, setSelectedHolster, setActiveStep]);

  const handleReset = React.useCallback(() => {
    setActiveStep(0);
    setSelectedRunType(null);
    setSelectedRole(null);
    setSelectedHolster(null);
    setFirstHolster(null);
  }, [setActiveStep, setSelectedRunType, setSelectedRole, setSelectedHolster, setFirstHolster]);

  /**
   * TODO
   * Once we set our selected holster, display it with DRSHolsterContainerComponent and other
   * stuff from DRSHolsterMainComponent.
   *
   * If we get holster data passed in:
   * - If it's a holster link (e.g. learning/maintank), auto-forward the stepper to the last
   *   step and update our state accordingly.
   * - If it's a custom link (e.g. c/abcd), disable the stepper entirely (display: none;)
   */

  let initialHolster = null;

  if (holster && firstHolster && holster.name) {
    // A holster was passed in. Advance the stepper to the last step, and populate all data.
    const selectedHolsterData = DRSHolsterHelper.getHolsterData(holster.type, holster.name);
    if (holsterData !== undefined) {
      initialHolster = {
        holsterName: holster.name,
        holsterType: holster.type,
        holsterFriendlyType: DRSHolsterHelper.getFriendlyHolsterSetName(holster.type),
        holsterMetadata: {
          name: selectedHolsterData.name,
          role: selectedHolsterData.role,
          assignments: selectedHolsterData.assignments,
          explanation: selectedHolsterData.explanation,
        },
        holsterPrepop: selectedHolsterData.pre,
        holsterMain: selectedHolsterData.main,
        hideStartOverButton: false,
        showStepper: true,
      };

      if (activeStep !== 3) {
        setSelectedRunType(holster.type);
        setSelectedRole(selectedHolsterData.role);
        setSelectedHolster(holster.name);
        setActiveStep(3);
      }
    }
  } else if (selectedHolster) {
    const selectedHolsterData = DRSHolsterHelper.getHolsterData(selectedRunType, selectedHolster);
    initialHolster = {
      holsterName: selectedRunType,
      holsterType: selectedHolster,
      holsterFriendlyType: DRSHolsterHelper.getFriendlyHolsterSetName(selectedRunType),
      holsterMetadata: {
        name: selectedHolsterData.name,
        role: selectedHolsterData.role,
        assignments: selectedHolsterData.assignments,
        explanation: selectedHolsterData.explanation,
      },
      holsterPrepop: selectedHolsterData.pre,
      holsterMain: selectedHolsterData.main,
      hideStartOverButton: false,
      showStepper: true,
    };
  } else if (encodedHolster !== undefined) {
    const holsters = DRSHolsterHelper.decodeHolster(encodedHolster);
    initialHolster = {
      holsterName: 'Custom',
      holsterType: 'custom',
      holsterFriendlyType: 'Custom',
      holsterMetadata: {
        name: null,
        role: null,
        assignments: null,
        explanation: '',
      },
      holsterPrepop: holsters.prepop,
      holsterMain: holsters.main,
      hideStartOverButton: true,
      showStepper: false,
    };
  } else if (window.location.pathname === '/drs/holster/c') {
    initialHolster = {
      holsterName: 'Custom',
      holsterType: 'custom',
      holsterFriendlyType: 'Custom',
      holsterMetadata: {
        name: null,
        role: null,
        assignments: null,
        explanation: '',
      },
      holsterPrepop: [],
      holsterMain: [],
      hideStartOverButton: true,
      showStepper: false,
    };
  }

  const displayStepper = (() => (
    <Stepper activeStep={activeStep} orientation="vertical">
      {
        steps.map((step) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Typography textAlign="left" fontSize={20} pb={2}>{step.description}</Typography>
              {
                activeStep === 0
                  ? (
                    <Stack spacing={2} width="100%">
                      {runTypes.map((item) => (
                        <Box key={`runtypewf-${item}`}>
                          <Button
                            fullWidth
                            variant="outlined"
                            size="large"
                            onClick={(e) => handleNext(e, { runType: item })}
                          >
                            {`${holsterMapping.runType[item].owner} - ${holsterMapping.runType[item].name}`}
                          </Button>
                        </Box>
                      ))}
                    </Stack>
                  )
                  : null
              }
              {
                activeStep === 1
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
                            {`${holsterMapping.runType[selectedRunType].roles[item].name}`}
                          </Button>
                        </Box>
                      ))}
                    </Stack>
                  )
                  : null
              }
              {
                activeStep === 2
                  ? (
                    <Stack spacing={2} width="100%">
                      {availableHolsters.map((item) => (
                        <Box key={`holsterwf-${item}`}>
                          <Button
                            fullWidth
                            variant="outlined"
                            size="large"
                            onClick={(e) => handleNext(e, { holster: item })}
                            startIcon={
                              <Avatar src={`${process.env.PUBLIC_URL}/assets/lostactions/${holsterData[selectedRunType].holsters[item].icon}.jpg`} />
                            }
                          >
                            {`${holsterData[selectedRunType].holsters[item].name}`}
                          </Button>
                        </Box>
                      ))}
                    </Stack>
                  )
                  : null
              }
            </StepContent>
          </Step>
        ))
      }
    </Stepper>
  ));

  return (
    <Box minWidth={600} maxWidth={1600} minHeight={600} mt="30px" ml="auto" mr="auto" pb="10px">
      <Stack spacing={2}>
        {!initialHolster || (initialHolster && initialHolster.showStepper)
          ? displayStepper()
          : null}
        {initialHolster
          ? <DRSNewHolsterDisplayComponent holster={initialHolster} handleReset={handleReset} />
          : null}
      </Stack>
    </Box>
  );
}
