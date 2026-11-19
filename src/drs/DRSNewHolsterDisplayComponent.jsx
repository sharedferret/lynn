import React, { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LinkIcon from '@mui/icons-material/Link';
import CopyField from '../common/CopyField';
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
  const [holsterPrepopNew] = useState(initialHolster.holsterPrepopNew);
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
    setGeneratedLink(`https://forays.info/drs/holster/c/${encodedHolsters}`);
    window.history.pushState(
      {},
      'FFXIV Field Operations Assistant - forays.info',
      `/drs/holster/c/${encodedHolsters}`,
    );
  }, [holsterPrepop, holsterMain, setGeneratedLink]);

  /**
   * Render logic
   */
  return (
    <Box
      sx={{
        maxWidth: 1000,
        minHeight: 600,
      }}
    >
      <Stack
        spacing={2}
        sx={{
          minHeight: 100,
          p: 1,
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
          }}
        >
          <Stack>
            {holsterMetadata.name
              ? (
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                  }}
                >
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
          style={{ whiteSpace: 'pre-wrap' }}
          sx={{
            p: 2,
          }}
        >
          {holsterMetadata.explanation}
        </Typography>
        <DRSHolsterContainerComponent
          name={holsterName}
          type={holsterType}
          holsterPrepop={holsterPrepop}
          holsterPrepopNew={holsterPrepopNew}
          holsterMain={holsterMain}
          handleHolsterUpdate={handleHolsterUpdate}
        />
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            height: 60,
          }}
        >
          <Box sx={{
            width: 200,
          }}
          >
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
                <Box
                  sx={{
                    maxWidth: 650,
                    alignSelf: 'center',
                  }}
                >
                  <CopyField fullWidth value={generatedLink} />
                </Box>
              )
              : null
          }
        </Stack>
        <Box sx={{
          height: 40,
        }}
        />
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
