import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import React from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useTranslation, Trans } from 'react-i18next';
import DRSNewHolsterDisplayComponent from './DRSNewHolsterDisplayComponent';
import DRSHolsterHelper from './lib/DRSHolsterHelper';
import holsterMapping from './lib/HolsterMapping.json';
import holsterData from './lib/Holsters.json';

export default function DRSNewHolsterSelectorComponent({
  holster,
  encodedHolster,
  resetTimer,
}) {
  const [selectedHost, setSelectedHost] = React.useState(null);
  const [selectedRunType, setSelectedRunType] = React.useState(null);
  const [selectedRole, setSelectedRole] = React.useState(null);
  const [selectedHolster, setSelectedHolster] = React.useState(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [firstHolster, setFirstHolster] = React.useState(holster);
  const [resetTimerState, setResetTimerState] = React.useState(resetTimer);

  const { t } = useTranslation('bsf');

  if (resetTimer !== resetTimerState) {
    setActiveStep(0);
    setSelectedHost(null);
    setSelectedRunType(null);
    setSelectedRole(null);
    setSelectedHolster(null);
    setFirstHolster(null);
    setResetTimerState(resetTimer);
  }

  const hosts = Object.keys(holsterMapping.hosts);

  let runTypes = [];
  if (selectedHost) {
    runTypes = Object.keys(holsterMapping.hosts[selectedHost].runTypes);
  }

  let roles = [];
  if (selectedRunType) {
    roles = Object.keys(holsterMapping.hosts[selectedHost].runTypes[selectedRunType].roles);
  }

  let availableHolsters = [];
  if (selectedRunType && selectedRole) {
    availableHolsters = holsterMapping
      .hosts[selectedHost].runTypes[selectedRunType].roles[selectedRole].holsters;
  }

  const steps = [
    {
      label: t('drs.holster-helper.steps.1.label'),
      description: t('drs.holster-helper.steps.1.description'),
      hosts,
    },
    {
      label: t('drs.holster-helper.steps.2.label'),
      description: t('drs.holster-helper.steps.2.description'),
      runTypes,
    },
    {
      label: t('drs.holster-helper.steps.3.label'),
      description: t('drs.holster-helper.steps.3.description'),
      roles,
    },
    {
      label: t('drs.holster-helper.steps.4.label'),
      description: t('drs.holster-helper.steps.4.description'),
      availableHolsters,
    },
  ];

  const handleNext = React.useCallback((e, data) => {
    if (data.host) {
      setSelectedHost(data.host);
    }
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
  }, [setSelectedHost, setSelectedRunType, setSelectedRole, setSelectedHolster, setActiveStep]);

  const handleReset = React.useCallback(() => {
    setActiveStep(0);
    setSelectedHost(null);
    setSelectedRunType(null);
    setSelectedRole(null);
    setSelectedHolster(null);
    setFirstHolster(null);
    window.history.pushState(
      {},
      t('drs.holster-helper.window-title'),
      '/drs/holster',
    );
  }, [setActiveStep,
    setSelectedHost,
    setSelectedRunType,
    setSelectedRole,
    setSelectedHolster,
    setFirstHolster]);

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
    const selectedHolsterData = DRSHolsterHelper.getHolsterData(
      holster.host,
      holster.type,
      holster.name,
    );

    if (holsterData !== undefined) {
      initialHolster = {
        holsterHost: holster.host,
        holsterHostFriendly: holsterMapping.hosts[holster.host].name,
        holsterName: holster.name,
        holsterType: holster.type,
        holsterFriendlyType: DRSHolsterHelper.getFriendlyHolsterSetName(holster.host, holster.type),
        holsterMetadata: {
          name: selectedHolsterData.name,
          role: selectedHolsterData.role,
          assignments: selectedHolsterData.assignments,
          explanation: selectedHolsterData.explanation,
        },
        holsterPrepop: selectedHolsterData.pre,
        holsterPrepopNew: selectedHolsterData.prepop,
        holsterMain: selectedHolsterData.main,
        hideStartOverButton: false,
        showStepper: true,
      };

      if (activeStep !== 4) {
        setSelectedHost(holster.host);
        setSelectedRunType(holster.type);
        setSelectedRole(selectedHolsterData.role);
        setSelectedHolster(holster.name);
        setActiveStep(4);
      }
    }
  } else if (selectedHolster) {
    // Holster picked through the stepper flow.
    const selectedHolsterData = DRSHolsterHelper.getHolsterData(
      selectedHost,
      selectedRunType,
      selectedHolster,
    );
    initialHolster = {
      holsterHost: selectedHost,
      holsterHostFriendly: holsterMapping.hosts[selectedHost].name,
      holsterName: selectedRunType,
      holsterType: selectedHolster,
      holsterFriendlyType:
        DRSHolsterHelper.getFriendlyHolsterSetName(selectedHost, selectedRunType),
      holsterMetadata: {
        name: selectedHolsterData.name,
        role: selectedHolsterData.role,
        assignments: selectedHolsterData.assignments,
        explanation: selectedHolsterData.explanation,
      },
      holsterPrepop: selectedHolsterData.pre,
      holsterPrepopNew: selectedHolsterData.prepop,
      holsterMain: selectedHolsterData.main,
      hideStartOverButton: false,
      showStepper: true,
    };

    window.history.pushState(
      selectedHolster,
      t('drs.holster-helper.window-title-viewing-holster', { type: initialHolster.holsterFriendlyType }),
      `/drs/holster/${selectedHost}/${selectedRunType}/${selectedHolster}`,
    );
  } else if (encodedHolster !== undefined) {
    const holsters = DRSHolsterHelper.decodeHolster(encodedHolster);
    initialHolster = {
      holsterHost: '',
      holsterName: t('drs.holster-helper.custom'),
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
      holsterHost: '',
      holsterName: t('drs.holster-helper.custom'),
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

  const handleBack = () => {
    switch (activeStep) {
      case 1: setSelectedHost(null); break;
      case 2: setSelectedRunType(null); break;
      case 3: setSelectedRole(null); break;
      case 4: setSelectedHolster(null); break;
      default:
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const displayBackButton = () => (
    <Stack direction="row" spacing={2}>
      <Box>
        <Button
          variant="outlined"
          size="large"
          startIcon={<RestartAltIcon />}
          onClick={handleReset}
        >
          <Trans i18nKey="common.start-over" />
        </Button>
      </Box>
      {holster && firstHolster && holster.name
        ? null
        : (
          <Box>
            <Button
              variant="outlined"
              size="large"
              startIcon={<ArrowBackIosNewIcon />}
              onClick={handleBack}
            >
              <Trans i18nKey="common.back" />
            </Button>
          </Box>
        )}
    </Stack>
  );

  const displayStepper = (() => (
    <Stepper activeStep={activeStep} orientation="vertical">
      {
        steps.map((step, i) => (
          <Step key={step.label}>
            <StepLabel>
              {step.label}
              {
                i === 0 && selectedHost
                  ? (
                    <Stack>
                      <Typography fontWeight={700}>
                        {holsterMapping.hosts[selectedHost].name}
                      </Typography>
                      {holsterMapping.hosts[selectedHost].lastUpdated
                        ? (
                          <Typography fontSize={12}>
                            <Trans
                              i18nKey="drs.holster-helper.last-updated"
                              ns="bsf"
                              values={{
                                updated: holsterMapping.hosts[selectedHost].lastUpdated,
                              }}
                            />
                          </Typography>
                        )
                        : null}
                    </Stack>
                  )
                  : null
              }
              {
                i === 1 && selectedRunType
                  ? (
                    <Typography fontWeight={700}>
                      {holsterMapping.hosts[selectedHost].runTypes[selectedRunType].name}
                    </Typography>
                  )
                  : null
              }
              {
                i === 2 && selectedRole
                  ? (
                    <Typography fontWeight={700}>
                      {holsterMapping
                        .hosts[selectedHost].runTypes[selectedRunType].roles[selectedRole].name}
                    </Typography>
                  )
                  : null
              }
              {
                i === 3 && selectedHolster
                  ? (
                    <Typography fontWeight={700}>
                      {holsterData
                        .host[selectedHost]
                        .holsters[selectedRunType]
                        .holsters[selectedHolster]
                        .name}
                    </Typography>
                  )
                  : null
              }
            </StepLabel>
            <StepContent>
              <Typography textAlign="left" fontSize={20} pb={2}>{step.description}</Typography>
              {
                activeStep === 0
                  ? (
                    <Stack spacing={2} width="100%">
                      {hosts.map((item) => (
                        <Box maxWidth={600} key={`hostwf-${item}`}>
                          <Button
                            fullWidth
                            variant="outlined"
                            size="large"
                            style={{ justifyContent: 'flex-start' }}
                            startIcon={
                              <Avatar variant="rounded" src={`${process.env.PUBLIC_URL}/assets/servericons/${holsterMapping.hosts[item].serverIcon}`} />
                            }
                            onClick={(e) => handleNext(e, { host: item })}
                          >
                            {`${holsterMapping.hosts[item].name} (${holsterMapping.hosts[item].server})`}
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
                      {runTypes.map((item) => (
                        <Box maxWidth={600} key={`runtypewf-${item}`}>
                          <Button
                            fullWidth
                            variant="outlined"
                            size="large"
                            onClick={(e) => handleNext(e, { runType: item })}
                            style={{ justifyContent: 'flex-start' }}
                          >
                            {`${holsterMapping.hosts[selectedHost].runTypes[item].name}`}
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
                      {roles.map((item) => (
                        <Box maxWidth={600} key={`rolewf-${item}`}>
                          <Button
                            fullWidth
                            variant="outlined"
                            size="large"
                            onClick={(e) => handleNext(e, { role: item })}
                            style={{ justifyContent: 'flex-start' }}
                            startIcon={
                              <Avatar src={`${process.env.PUBLIC_URL}/assets/roles/${item}.png`} />
                            }
                          >
                            {`${holsterMapping.hosts[selectedHost].runTypes[selectedRunType].roles[item].name}`}
                          </Button>
                        </Box>
                      ))}
                    </Stack>
                  )
                  : null
              }
              {
                activeStep === 3
                  ? (
                    <Stack spacing={2} width="100%">
                      {availableHolsters.map((item) => (
                        <Box maxWidth={600} key={`holsterwf-${item}`}>
                          <Button
                            fullWidth
                            variant="outlined"
                            size="large"
                            onClick={(e) => handleNext(e, { holster: item })}
                            style={{ justifyContent: 'flex-start' }}
                            startIcon={
                              <Avatar src={`${process.env.PUBLIC_URL}/assets/lostactions/${holsterData.host[selectedHost].holsters[selectedRunType].holsters[item].icon}.jpg`} />
                            }
                          >
                            {`${holsterData.host[selectedHost].holsters[selectedRunType].holsters[item].name}`}
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

  const displayStepperIntroText = (() => (
    <Box>
      <Typography textAlign="left">
        { t('drs.holster-helper.intro.p1') }
      </Typography>
      <Typography textAlign="left" pt={1}>
        <Trans
          i18nKey="drs.holster-helper.intro.p2"
          ns="bsf"
          components={[
            <a href="/createdrsholsters">DRS Run Holster Creator</a>,
          ]}
        />
      </Typography>
    </Box>
  ));

  return (
    <Box width="90%" maxWidth={1600} minHeight={600} mt="30px" ml="auto" mr="auto" pb="10px">
      {!initialHolster || (initialHolster && initialHolster.showStepper)
        ? displayStepperIntroText()
        : null}

      <Stack spacing={2} pt={2}>
        {!initialHolster || (initialHolster && initialHolster.showStepper)
          ? displayStepper()
          : null}
        {(!initialHolster
          || (initialHolster && initialHolster.showStepper && !initialHolster.hideStartOverButton))
          && activeStep > 0
          ? displayBackButton()
          : null}
        {initialHolster
          ? <DRSNewHolsterDisplayComponent holster={initialHolster} handleReset={handleReset} />
          : null}
      </Stack>
    </Box>
  );
}
