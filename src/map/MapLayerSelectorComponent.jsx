import {
  Box, Checkbox, FormControlLabel, FormGroup,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

export default function MapLayerSelectorComponent({
  selectedLayers,
  availableLayers,
  handleLayerSelectorUpdate,
}) {
  const theme = useTheme();

  const checkboxesToDisplay = [];

  // TODO: Fix this error.
  // eslint-disable-next-line no-restricted-syntax
  for (const category of availableLayers) {
    // Push parent checkbox
    checkboxesToDisplay.push(
      <FormControlLabel
        label={<Typography fontWeight={700}>{category.name}</Typography>}
        key={category.name}
        control={
          (
            <Checkbox
              checked={category.layers.every((layer) => selectedLayers.includes(layer.id))}
              indeterminate={
                category.layers.some((layer) => selectedLayers.includes(layer.id))
                && !category.layers.every((layer) => selectedLayers.includes(layer.id))
              }
              disabled={!category.enabled}
            />
          )
        }
        onChange={(e) => {
          // TODO: This doesn't work yet, need to see why
          const newLayers = [...selectedLayers];
          if (e.target.checked) {
            category.layers.forEach((layer) => {
              if (!newLayers.includes(layer.id)) {
                newLayers.push(layer.id);
              }
            });
          } else {
            category.layers.forEach((layer) => {
              const index = newLayers.indexOf(layer.id);
              if (index > -1) {
                newLayers.splice(index, 1);
              }
            });
          }
          handleLayerSelectorUpdate(newLayers);
        }}
      />,
    );

    // Push child checkboxes
    const categoryLayers = category.layers.map((layer) => (
      <FormControlLabel
        key={layer.name}
        control={
          (
            <Checkbox
              checked={selectedLayers.includes(layer.id)}
              disabled={!layer.enabled}
            />
          )
        }
        label={layer.name}
        onChange={(e) => {
          const newLayers = [...selectedLayers];
          if (e.target.checked) {
            newLayers.push(layer.id);
          } else {
            const index = newLayers.indexOf(layer.id);
            if (index > -1) {
              newLayers.splice(index, 1);
            }
          }
          handleLayerSelectorUpdate(newLayers);
        }}
      />
    ));

    checkboxesToDisplay.push(
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
        {categoryLayers}
      </Box>,
    );
  }

  /**
   * TODO: For xs-s, the selector should be a popover modal
   */

  return (
    <Box
      className="map-layer-selector"
      sx={{
        mt: { xs: 4, md: 0 },
        height: { xs: 'calc(80dvh - 112px)', md: 'calc(80dvh - 32px)' },
        top: { xs: '40px', md: '80px' },
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Scrollbars universal>
        <FormGroup>
          {checkboxesToDisplay}
        </FormGroup>
      </Scrollbars>
    </Box>
  );
}
