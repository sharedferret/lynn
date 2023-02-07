import React, { Component } from 'react';

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
    return (
      <BALogosRecommender
        workflow={this.state.workflow}
        plates={this.state.plates}
        handleWorkflowUpdate={this.handleWorkflowUpdate}
      />
    );
  }
}

export default BAMainContentComponent