import React, { Component } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import EurekaLogosActionSelectorComponent from './EurekaLogosActionSelectorComponent';
import EurekaLogosActionHelperDataComponent from './EurekaLogosActionHelperDataComponent';
import EurekaLogosActionHelper from './lib/EurekaLogosActionHelper';

class EurekaLogosActionHelperComponent extends Component {
  constructor(props) {
    super(props);

    let action = this.props.logosAction ?? '';
    action = action.replaceAll('_', ' ');

    const logosActionData = EurekaLogosActionHelper.getLogosActionData(action);
    let selectedRecipe = null;
    if (logosActionData) {
      selectedRecipe = logosActionData.recipes[0];
    }

    this.state = {
      logosAction: action,
      selectedRecipe: selectedRecipe
    };

    this.handleActionUpdate = this.handleActionUpdate.bind(this);
    this.handleRecipeUpdate = this.handleRecipeUpdate.bind(this);
  }

  handleActionUpdate(event) {
    const logosActionData = EurekaLogosActionHelper.getLogosActionData(event.target.value);
    const logosActionUrl = event.target.value.replaceAll(' ', '_');
    window.history.pushState(logosActionUrl, 'lynn.pet! - ' + logosActionUrl, '/eureka/logos/' + event.target.value.replaceAll(' ', '_'))

    this.setState(
      {
        logosAction: event.target.value,
        selectedRecipe: logosActionData.recipes[0]
      }
    );
  }

  handleRecipeUpdate(event, value) {
    if (value) {
      this.setState(
        {
          selectedRecipe: value.split(',')
        }
      )
    }
    
  }

  render() {
    return (
      <Box width={1000}>
        <Stack spacing={2} minHeight={100} p={1} alignItems={'center'}>
          <Typography fontWeight={700} variant={'h4'}>Eureka Logos Action Helper</Typography>
          <Stack direction={'row'} spacing={2} alignItems={'center'}>
            <Typography>Action: </Typography>
            <Box width={325}>
              <EurekaLogosActionSelectorComponent
                logosAction={ this.state.logosAction }
                handleActionUpdate={ this.handleActionUpdate }
              />
            </Box>
          </Stack>
          <EurekaLogosActionHelperDataComponent
            logosAction={ this.state.logosAction }
            selectedRecipe={ this.state.selectedRecipe }
            handleRecipeUpdate={ this.handleRecipeUpdate}
          />
        </Stack>
      </Box>
    )
  }
}

export default EurekaLogosActionHelperComponent;