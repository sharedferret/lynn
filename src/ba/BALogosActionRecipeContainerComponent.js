import React, { Component } from 'react';

import { Box, Divider, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import BALogogramComponent from './BALogogramComponent';

/**
 * Recipe container, contains recipe selectors for umbral and astral tray.
 */
class BALogosActionRecipeContainerComponent extends Component {
  renderRecipes(recipes) {
    const firstRecipe = recipes[0];

    const output = [];
    for (let i = 0; i < recipes.length; i++) {
      output.push(
        <MenuItem value={i}>
          <Box>
            <Stack>
              <BALogogramComponent logogram={recipes[i][0]} />
              <BALogogramComponent logogram={recipes[i][1]} />
              <BALogogramComponent logogram={recipes[i][2]} />
            </Stack>
          </Box>
        </MenuItem>
      );
      output.push(<Divider />)
    }

    return output.splice(0, output.length - 1);
  }

  render() {
    const logosActions = require('./lib/LogosActions.json').logosActions;
    const umbralAction = logosActions[this.props.tray.umbral];
    const astralAction = logosActions[this.props.tray.astral];

    return (
      <Box width={600} height={135} border={1} borderRadius='12px'>
        <Stack direction='row' spacing={1} pl={1} pr={1}>
          <Box width={300} height={135} display={'flex'} alignItems={'center'}  justifyContent={'center'}>
            <FormControl sx={{width: 280}}>
              <InputLabel id="umbralArraySelectLabel">Umbral Array</InputLabel>
              <Select
                fullWidth={true}
                labelId='umbralArraySelectLabel'
                label='Umbral Array'
                defaultValue={0}
              >
                {umbralAction != null ? this.renderRecipes(umbralAction.recipes) 
                  : <MenuItem value='0'><Box height={60} /></MenuItem>}
              </Select>
            </FormControl>
          </Box>
          
          <Divider orientation="vertical" variant="middle" flexItem />

          <Box width={300} height={135} display={'flex'} alignItems={'center'}  justifyContent={'center'}>
            <FormControl sx={{width: 280}}>
              <InputLabel id="astralArraySelectLabel">Astral Array</InputLabel>
              <Select
                fullWidth={true}
                labelId='astralArraySelectLabel'
                label='Astral Array'
                defaultValue={0}
              >
                {astralAction != null ? this.renderRecipes(astralAction.recipes) 
                  : <MenuItem value='0'><Box height={60} /></MenuItem>}
              </Select>
            </FormControl>
          </Box>
        </Stack>
      </Box>
    );
  }
}

export default BALogosActionRecipeContainerComponent