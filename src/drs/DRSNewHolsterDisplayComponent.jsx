import React, { useState, useCallback } from 'react';
import {
  Box, Button, Stack, Typography,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LinkIcon from '@mui/icons-material/Link';
import { DefaultCopyField } from '@eisberg-labs/mui-copy-field';
import DRSHolsterHelper from './lib/DRSHolsterHelper';
import DRSHolsterContainerComponent from './DRSHolsterContainerComponent';
import DRSHolsterActionAcquisitionGuideComponent from './DRSHolsterActionAcquisitionGuideComponent';

export default function DRSNewHolsterDisplayComponent({ holster, handleReset }) {
  /**
   * Component State
   */
  const initialHolster = holster;

  const [holsterName, setHolsterName] = useState(initialHolster.holsterName);
  const [holsterType, setHolsterType] = useState(initialHolster.holsterType);
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
    handleReset();
  }, [setHolsterName,
    setHolsterType,
    setHolsterMetadata,
    setHolsterPrepop,
    setHolsterMain,
    handleReset]);

  const generatePermalink = useCallback(() => {
    const encodedHolsters = DRSHolsterHelper.encodeHolster(
      holsterPrepop,
      holsterMain,
    ).replaceAll('=', '');
    setGeneratedLink(`https://lynn.pet/drs/holster/c/${encodedHolsters}`);
    window.history.pushState(
      {},
      'lynn.pet! - FFXIV Field Operations Assistant',
      `/drs/holster/c/${encodedHolsters}`,
    );
  }, [holsterPrepop, holsterMain, setGeneratedLink]);

  /**
   * Render logic
   */
  return (
    <Box maxWidth={1000} minHeight={600}>
      <Stack spacing={2} minHeight={100} p={1}>
        <Stack direction="row" alignItems="center">
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
          <Stack>
            {holsterMetadata.name
              ? (
                <Typography fontWeight={700} variant="h5">
                  Role:
                  {' '}
                  {holsterMetadata.name ? holsterMetadata.name : null}
                </Typography>
              )
              : null}
          </Stack>
        </Stack>
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
        {(holsterPrepop !== undefined && holsterMain !== undefined)
          && (holsterPrepop.length > 0 || holsterMain.length > 0)
          ? (
            <DRSHolsterActionAcquisitionGuideComponent
              neededActions={DRSHolsterHelper.getNeededActionsForBag(holsterPrepop, holsterMain, 3)}
            />
          )
          : null}

      </Stack>
    </Box>
  );
}
