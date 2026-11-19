import React, { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LinkIcon from '@mui/icons-material/Link';
import CopyField from '../common/CopyField';

import BALogosActionTrayComponent from './BALogosActionTrayComponent';
import './BALogosHolsterComponent.css';
import BAHolsterHelper from './lib/BAHolsterHelper';

/**
 * A full holster of logos action trays
 * Width: 800px variable?
 * Stack x6 with spacing
 * props as this.props.trays
 */
export default function BALogosHolsterComponent({ tray, encodedHolster }) {
  const [generatedLink, setGeneratedLink] = useState(null);

  /**
   * Component State
   */
  let startingPlates = [];
  if (tray === undefined) {
    if (encodedHolster) {
      const initialHolster = BAHolsterHelper.decodeHolster(encodedHolster);
      startingPlates = initialHolster;
    } else {
      startingPlates = ([
        {
          index: 0,
          umbral: null,
          astral: null,
        },
      ]);
    }
  } else {
    startingPlates = tray.plates.map((i, index) => ({
      index,
      umbral: i.umbral,
      astral: i.astral,
    }));
  }

  const [plates, setPlates] = useState(startingPlates);

  const generatePermalink = useCallback(() => {
    const encodedHolsters = BAHolsterHelper.encodeHolster(plates).replaceAll('=', '');
    setGeneratedLink(`https://forays.info/eureka/loadout/${encodedHolsters}`);
    window.history.pushState(
      {},
      'FFXIV Field Operations Assistant - forays.info',
      `/eureka/loadout/${encodedHolsters}`,
    );
  }, [setGeneratedLink]);

  const handleLogosActionUpdate = useCallback((data) => {
    if (data.array === 'umbral') {
      const newPlates = plates;
      newPlates[data.plate].umbral = data.newAction;
      setPlates([...newPlates]);
    }
    if (data.array === 'astral') {
      const newPlates = plates;
      newPlates[data.plate].astral = data.newAction;
      setPlates([...newPlates]);
    }
  }, [plates, setPlates]);

  const handleAddPlateButtonClicked = useCallback(() => {
    const newPlates = plates;
    newPlates.push({
      index: plates.length,
      umbral: '',
      astral: '',
    });
    setPlates([...newPlates]);
  }, [plates, setPlates]);

  function renderAddPlateButton() {
    return (
      <Box>
        <Button
          variant="outlined"
          size="large"
          startIcon={<AddCircleIcon />}
          onClick={handleAddPlateButtonClicked}
        >
          Add Plate
        </Button>
      </Box>

    );
  }

  /**
   * Render Logic
   */
  return (
    <Box sx={{
      maxWidth: 1000,
    }}
    >
      <Paper variant="outlined" className="BALogosHolsterPaper">
        <Stack
          spacing={2}
          sx={{
            minHeight: 100,
            p: 1,
          }}
        >
          {
            plates.map((i, index) => (
              <BALogosActionTrayComponent
                inputTray={i}
                inputIndex={index}
                handleLogosActionUpdate={handleLogosActionUpdate}
                key={crypto.randomUUID()}
              />
            ))
          }
          {plates.length < 8 ? renderAddPlateButton() : null}
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
        </Stack>
      </Paper>
    </Box>
  );
}
