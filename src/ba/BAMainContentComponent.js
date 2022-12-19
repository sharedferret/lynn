import React, { Component } from 'react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';

import BALogosRecommender from './BALogosRecommenderWorkflow';


class BAMainContentComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      workflow: {
        role: null,
        tray: null,
      },
      plates: null
    };

    this.handleWorkflowUpdate = this.handleWorkflowUpdate.bind(this);
  }

  handleWorkflowUpdate(event, data) {
    this.setState({
      workflow: {
        role: data.role,
        tray: data.tray,
      },
      plates: data.plates
    });
  }

  render() {
    const recommendedActions = require('./lib/RecommendedActions.json').actions;
    const roles = Object.keys(recommendedActions);

    return (
      <Box margin='auto'>
        <BALogosRecommender
          workflow={this.state.workflow}
          plates={this.state.plates}
          handleWorkflowUpdate={this.handleWorkflowUpdate}
        />
      </Box>
    );
  }
}

export default BAMainContentComponent