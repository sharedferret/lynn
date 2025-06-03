import React from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/material/styles/useTheme';
import { v4 as uuidv4 } from 'uuid';
import BALogogramComponent from './BALogogramComponent';
import logosActionData from './lib/LogosActions.json';

/**
 * Recipe container, contains recipe selectors for umbral and astral tray.
 */
export default function BALogosActionRecipeContainerComponent({ tray }) {
  const theme = useTheme();

  function renderRecipes(recipes) {
    const output = [];
    for (let i = 0; i < recipes.length; i += 1) {
      output.push(
        <MenuItem value={i} key={`recipe-${uuidv4()}`}>
          <Box>
            <Stack>
              <BALogogramComponent logogram={recipes[i][0]} />
              <BALogogramComponent logogram={recipes[i][1]} />
              <BALogogramComponent logogram={recipes[i][2]} />
            </Stack>
          </Box>
        </MenuItem>,
      );
      output.push(<Divider key={`action-${uuidv4()}`} />);
    }

    return output.splice(0, output.length - 1);
  }

  /**
   * Render
   */
  const { logosActions } = logosActionData;
  const umbralAction = logosActions[tray.umbral];
  const astralAction = logosActions[tray.astral];

  return (
    <Box width={{ md: 600 }} height={{ md: 135 }} border={1} borderRadius="12px">
      <Stack direction={{ md: 'row' }} spacing={{ md: 1 }} pl={1} pr={1}>
        <Box width={300} height={135} display="flex" alignItems="center" justifyContent="center">
          <FormControl sx={{ width: 280 }}>
            <InputLabel id="umbralArraySelectLabel">Umbral Array</InputLabel>
            <Select
              fullWidth
              labelId="umbralArraySelectLabel"
              label="Umbral Array"
              defaultValue={0}
            >
              {umbralAction != null ? renderRecipes(umbralAction.recipes)
                : <MenuItem value="0" key={`action-${uuidv4()}`}><Box height={60} /></MenuItem>}
            </Select>
          </FormControl>
        </Box>

        <Divider
          orientation={useMediaQuery(theme.breakpoints.down('md')) ? 'horizontal' : 'vertical'}
          variant="middle"
          flexItem
        />

        <Box width={300} height={135} display="flex" alignItems="center" justifyContent="center">
          <FormControl sx={{ width: 280 }}>
            <InputLabel id="astralArraySelectLabel">Astral Array</InputLabel>
            <Select
              fullWidth
              labelId="astralArraySelectLabel"
              label="Astral Array"
              defaultValue={0}
            >
              {astralAction != null ? renderRecipes(astralAction.recipes)
                : <MenuItem value="0" key={`action-${uuidv4()}`}><Box height={60} /></MenuItem>}
            </Select>
          </FormControl>
        </Box>
      </Stack>
    </Box>
  );
}
