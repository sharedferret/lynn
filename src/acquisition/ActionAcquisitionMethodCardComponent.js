import React, { Component } from 'react';

import ActionAcquisitionMethodStarMobCard from './ActionAcquisitionMethodStarMobCard';
import ActionAcquisitionMethodClusterCard from './ActionAcquisitionMethodClusterCard';
import ActionAcquisitionMethodMobCard from './ActionAcquisitionMethodMobCard';
import ActionAcquisitionMethodReflectCard from './ActionAcquisitionMethodReflectCard';
import ActionAcquisitionMethodSkirmishCard from './ActionAcquisitionMethodSkirmishCard';
import ActionAcquisitionMethodCECard from './ActionAcquisitionMethodCECard';
import ActionAcquisitionMethodDutyCard from './ActionAcquisitionMethodDutyCard';
import ActionAcquisitionMethodPurchaseCard from './ActionAcquisitionMethodPurchaseCard';

import { Box } from '@mui/material';

class ActionAcquisitionMethodCardComponent extends Component {


  render() {
    switch(this.props.methodData.method) {
      case 'star_mob':
        return <ActionAcquisitionMethodStarMobCard methodData={ this.props.methodData } />
      case 'cluster':
        return <ActionAcquisitionMethodClusterCard methodData={ this.props.methodData } />
      case 'mob':
        return <ActionAcquisitionMethodMobCard methodData={ this.props.methodData } />
      case 'reflect':
        return <ActionAcquisitionMethodReflectCard methodData={ this.props.methodData } fragmentName={ this.props.fragmentName } />
      case 'skirmish':
        return <ActionAcquisitionMethodSkirmishCard methodData={ this.props.methodData } />
      case 'ce':
        return <ActionAcquisitionMethodCECard methodData={ this.props.methodData } />
      case 'duty':
        return <ActionAcquisitionMethodDutyCard methodData={ this.props.methodData } />
      case 'purchase':
        return <ActionAcquisitionMethodPurchaseCard methodData={ this.props.methodData } fragmentId={ this.props.fragmentId } priceData={ this.props.priceData } />
      default:
        return <Box />;
    }
  }
}

export default ActionAcquisitionMethodCardComponent;