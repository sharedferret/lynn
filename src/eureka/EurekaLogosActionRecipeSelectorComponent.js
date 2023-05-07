import { Box, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React, { Component } from 'react';
import EurekaLogogramRecipeComponent from './EurekaLogogramRecipeComponent';
import { v4 as uuidv4 } from 'uuid';

class EurekaLogosActionRecipeSelectorComponent extends Component {
  
  render() {
    return (
      <Box>
        <ToggleButtonGroup
          value={this.props.selectedRecipe.join(',')}
          exclusive
          size={'large'}
          onChange={this.props.handleRecipeUpdate}
          orientation={'vertical'}
        >
          { this.props.recipes.map(i => {
            return (
              <ToggleButton
                style={{justifyContent: "flex-start"}}
                value={i.join(',')}
                sx={{ minWidth: 300, width: 600, alignItems: 'flex-start' }}
                key={ uuidv4() }
              >
                <Stack>
                  <EurekaLogogramRecipeComponent logogram={i[0]} />
                  <EurekaLogogramRecipeComponent logogram={i[1]} />
                  <EurekaLogogramRecipeComponent logogram={i[2]} />
                </Stack>
            </ToggleButton>
            )
            
          })}
        </ToggleButtonGroup>
      </Box>
      
    )
  }
}

export default EurekaLogosActionRecipeSelectorComponent;