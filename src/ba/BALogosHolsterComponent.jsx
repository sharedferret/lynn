import React, { useState, useCallback } from 'react';

import {
  Box, Button, Paper, Stack,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { v4 as uuidv4 } from 'uuid';

import BALogosActionTrayComponent from './BALogosActionTrayComponent';
import './BALogosHolsterComponent.css';

/**
 * A full holster of logos action trays
 * Width: 800px variable?
 * Stack x6 with spacing
 * props as this.props.trays
 */
export default function BALogosHolsterComponent({ tray }) {
  /**
   * Component State
   */
  let startingPlates = [];
  if (tray === undefined) {
    startingPlates = ([
      {
        index: 0,
        umbral: '',
        astral: '',
      },
    ]);
  } else {
    startingPlates = tray.plates.map((i, index) => ({
      index,
      umbral: i.umbral,
      astral: i.astral,
    }));
  }

  const [plates, setPlates] = useState(startingPlates);

  const handleLogosActionUpdate = useCallback((data) => {
    if (data.array === 'umbral') {
      const newPlates = plates;
      newPlates[data.plate].umbral = data.newAction;
      setPlates(newPlates);
    }
    if (data.array === 'astral') {
      const newPlates = plates;
      newPlates[data.plate].astral = data.newAction;
      setPlates(newPlates);
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
        </Stack>
      </Paper>
    </Box>

  );
}
