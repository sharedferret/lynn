import React, { useState, useCallback } from 'react';

import {
  Avatar, Box, Button, Stack, Typography,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LinkIcon from '@mui/icons-material/Link';
import { DefaultCopyField } from '@eisberg-labs/mui-copy-field';
import DRSHolsterHelper from './lib/DRSHolsterHelper';
import DRSHolsterContainerComponent from './DRSHolsterContainerComponent';
import DRSHolsterActionAcquisitionGuideComponent from './DRSHolsterActionAcquisitionGuideComponent';

export default function DRSHolsterMainComponent({ holster, encodedHolster }) {
  /**
   * Component State
   */
  let initialHolster = {};

  if (holster.name !== undefined) {
    const holsterData = DRSHolsterHelper.getHolsterData(holster.type, holster.name);
    if (holsterData !== undefined) {
      initialHolster = {
        holsterName: holster.name,
        holsterType: holster.type,
        holsterFriendlyType: DRSHolsterHelper.getFriendlyHolsterSetName(holster.type),
        holsterMetadata: {
          name: holsterData.name,
          role: holsterData.role,
          assignments: holsterData.assignments,
          explanation: holsterData.explanation,
        },
        holsterPrepop: holsterData.pre,
        holsterMain: holsterData.main,
        hideStartOverButton: false,
      };
    }
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
    };
  }

  const [holsterName, setHolsterName] = useState(initialHolster.holsterName);
  const [holsterType, setHolsterType] = useState(initialHolster.holsterType);
  const [holsterFriendlyType] = useState(initialHolster.holsterFriendlyType);
  const [holsterMetadata, setHolsterMetadata] = useState(initialHolster.holsterMetadata);
  const [holsterPrepop, setHolsterPrepop] = useState(initialHolster.holsterPrepop);
  const [holsterMain, setHolsterMain] = useState(initialHolster.holsterMain);
  const [hideStartOverButton] = useState(initialHolster.hideStartOverButton);
  const [generatedLink, setGeneratedLink] = useState(null);

  const handleHolsterUpdate = useCallback((data, bagType) => {
    if (bagType === 'prepop') {
      setHolsterPrepop([...data]);
    } else if (bagType === 'main') {
      setHolsterMain([...data]);
    }
  }, [setHolsterPrepop, setHolsterMain]);

  const resetHolsterPage = useCallback(() => {
    setHolsterName(null);
    setHolsterType(null);
    setHolsterMetadata(null);
    setHolsterPrepop(null);
    setHolsterMain(null);
  }, [setHolsterName, setHolsterType, setHolsterMetadata, setHolsterPrepop, setHolsterMain]);

  const generatePermalink = useCallback(() => {
    const encodedHolsters = DRSHolsterHelper.encodeHolster(
      holsterPrepop,
      holsterMain,
    ).replaceAll('=', '');
    setGeneratedLink(`https://lynn.pet/drs/holster/c/${encodedHolsters}`);
  }, [holsterPrepop, holsterMain, setGeneratedLink]);

  function renderHolsterSelectionPage() {
    const holsterSets = DRSHolsterHelper.getAvailableHolsterSets();

    return (
      Object.keys(holsterSets).map((i) => {
        const holsterNames = DRSHolsterHelper.getHolsterNames(i);
        return (
          <Box sx={{ pt: { xs: 14, md: 5 } }}>
            <Stack p={2} spacing={1}>
              <Typography>{holsterSets[i]}</Typography>
              {
                Object.keys(holsterNames).map((key) => {
                  const holsterData = holsterNames[key];
                  return (
                    <a href={`/drs/holster/${i}/${key}`}>
                      <Button
                        variant="outlined"
                        size="large"
                        fullWidth
                        sx={{ 'text-transform': 'capitalize' }}
                        style={{ justifyContent: 'flex-start' }}
                        startIcon={(
                          <Avatar
                            src={`${process.env.PUBLIC_URL}/assets/lostactions/${holsterData.icon}.jpg`}
                          />
                        )}
                      >
                        {holsterData.name}
                      </Button>
                    </a>
                  );
                })
              }
            </Stack>
          </Box>
        );
      })
    );
  }

  /**
   * Render Logic
   */

  if (!holsterName) {
    return renderHolsterSelectionPage();
  }

  return (
    <Box maxWidth={1000}>
      <Stack spacing={2} minHeight={100} p={1}>
        <Typography fontWeight={700} variant="h4">
          DRS Holster -
          {' '}
          {holsterFriendlyType}
        </Typography>
        {
          holsterMetadata.name !== null
            ? (
              <Typography fontWeight={700} variant="h4">
                Role:
                {' '}
                {holsterMetadata.name}
              </Typography>
            )
            : null
        }
        <Typography
          align="left"
          p={2}
          style={{ whiteSpace: 'pre-line' }}
        >
          {holsterMetadata.explanation}
        </Typography>
        <DRSHolsterContainerComponent
          name={holsterName}
          type={holsterType}
          holsterPrepop={holsterPrepop}
          holsterMain={holsterMain}
          handleHolsterUpdate={handleHolsterUpdate}
        />
        <Stack direction="row" alignItems="center" height={60}>
          {
            hideStartOverButton
              ? null
              : (
                <Box width={200}>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<ArrowBackIosNewIcon />}
                    onClick={resetHolsterPage}
                  >
                    Start Over
                  </Button>
                </Box>
              )
          }
          <Box width={200}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<LinkIcon />}
              onClick={generatePermalink}
            >
              Create Link
            </Button>
          </Box>
          {
            (holsterType === 'learning' || holsterType === 'lynn-reclear') && !generatedLink
              ? (
                <Typography
                  variant="caption"
                  width={650}
                  alignSelf="center"
                >
                  Note: These holsters were created for Lynn Kaneko&apos;s DRS runs on The Help
                  Lines. If you&apos;re running with a different group, your holsters may vary.
                  Check with your raid lead to see what you need to bring.
                </Typography>
              )
              : null
          }
          {
            generatedLink
              ? (
                <Box width={650} alignSelf="center">
                  <DefaultCopyField fullWidth value={generatedLink} />
                </Box>
              )
              : null
          }
        </Stack>
        <Box height={40} />
        <DRSHolsterActionAcquisitionGuideComponent
          neededActions={DRSHolsterHelper.getNeededActionsForBag(holsterPrepop, holsterMain, 3)}
        />
      </Stack>
    </Box>
  );
}
