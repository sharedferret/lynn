import React, { Component } from 'react';
import ActionAcquisitionMethodPurchaseResultsCard from './ActionAcquisitionMethodPurchaseResultsCard';

class ActionAcquisitionMethodPurchaseCard extends Component {
  render() {
    return <ActionAcquisitionMethodPurchaseResultsCard priceData={this.props.priceData} id={ this.props.fragmentId } />;
  }
}

export default ActionAcquisitionMethodPurchaseCard;