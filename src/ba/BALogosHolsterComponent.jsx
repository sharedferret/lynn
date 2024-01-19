import React, { useState, useCallback } from 'react';

import {
  Box, Button, Paper, Stack,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { v4 as uuidv4 } from 'uuid';
import LinkIcon from '@mui/icons-material/Link';
import { DefaultCopyField } from '@eisberg-labs/mui-copy-field';

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
          umbral: '',
          astral: '',
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
    setGeneratedLink(`https://lynn.pet/eureka/loadout/${encodedHolsters}`);
    window.history.pushState(
      {},
      'lynn.pet! - FFXIV Field Operations Assistant',
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
    <Box maxWidth={1000}>
      <Paper variant="outlined" className="BALogosHolsterPaper">
        <Stack spacing={2} minHeight={100} p={1}>
          {
            plates.map((i, index) => (
              <BALogosActionTrayComponent
                inputTray={i}
                inputIndex={index}
                handleLogosActionUpdate={handleLogosActionUpdate}
                key={uuidv4()}
              />
            ))
          }
          {plates.length < 8 ? renderAddPlateButton() : null}
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
        </Stack>
      </Paper>
    </Box>

  );
}
