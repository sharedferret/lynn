import React, { Component } from 'react';
import DRSLostActionAcquisitionMethodPurchaseResultsCard from './DRSLostActionAcquisitionMethodPurchaseResultsCard';

class DRSLostActionAcquisitionMethodPurchaseCard extends Component {
  render() {
    return <DRSLostActionAcquisitionMethodPurchaseResultsCard priceData={this.props.priceData} id={ this.props.fragmentId } />;
  }
}

export default DRSLostActionAcquisitionMethodPurchaseCard;