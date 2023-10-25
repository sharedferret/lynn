import React, { useState, useCallback } from 'react';
import {
  Box, Button, Stack, Typography,
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import { DefaultCopyField } from '@eisberg-labs/mui-copy-field';
import DRSHolsterHelper from './lib/DRSHolsterHelper';
import DRSHolsterContainerComponent from './DRSHolsterContainerComponent';
import DRSHolsterActionAcquisitionGuideComponent from './DRSHolsterActionAcquisitionGuideComponent';

export default function DRSNewHolsterDisplayComponent({ holster }) {
  /**
   * Component State
   */
  const initialHolster = holster;

  const [holsterName] = useState(initialHolster.holsterName);
  const [holsterType] = useState(initialHolster.holsterType);
  const [holsterMetadata] = useState(initialHolster.holsterMetadata);
  const [holsterPrepop, setHolsterPrepop] = useState(initialHolster.holsterPrepop);
  const [holsterMain, setHolsterMain] = useState(initialHolster.holsterMain);
  const [generatedLink, setGeneratedLink] = useState(null);

  const handleHolsterUpdate = useCallback((data, bagType) => {
    if (bagType === 'prepop') {
      setHolsterPrepop([...data]);
    } else if (bagType === 'main') {
      setHolsterMain([...data]);
    }
  }, [setHolsterPrepop, setHolsterMain]);

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
          style={{ whiteSpace: 'pre-wrap' }}
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
            generatedLink
              ? (
                <Box maxWidth={650} alignSelf="center">
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
