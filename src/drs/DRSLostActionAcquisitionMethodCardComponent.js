import React, { Component } from 'react';

import DRSLostActionAcquisitionMethodStarMobCard from './DRSLostActionAcquisitionMethodStarMobCard';
import DRSLostActionAcquisitionMethodClusterCard from './DRSLostActionAcquisitionMethodClusterCard';
import DRSLostActionAcquisitionMethodMobCard from './DRSLostActionAcquisitionMethodMobCard';
import DRSLostActionAcquisitionMethodReflectCard from './DRSLostActionAcquisitionMethodReflectCard';
import DRSLostActionAcquisitionMethodSkirmishCard from './DRSLostActionAcquisitionMethodSkirmishCard';
import DRSLostActionAcquisitionMethodCECard from './DRSLostActionAcquisitionMethodCECard';
import DRSLostActionAcquisitionMethodDutyCard from './DRSLostActionAcquisitionMethodDutyCard';

import { Box } from '@mui/material';
import DRSLostActionAcquisitionMethodPurchaseCard from './DRSLostActionAcquisitionMethodPurchaseCard';

class DRSLostActionAcquisitionMethodCardComponent extends Component {


  render() {
    switch(this.props.methodData.method) {
      case 'star_mob':
        return <DRSLostActionAcquisitionMethodStarMobCard methodData={ this.props.methodData } />
      case 'cluster':
        return <DRSLostActionAcquisitionMethodClusterCard methodData={ this.props.methodData } />
      case 'mob':
        return <DRSLostActionAcquisitionMethodMobCard methodData={ this.props.methodData } />
      case 'reflect':
        return <DRSLostActionAcquisitionMethodReflectCard methodData={ this.props.methodData } fragmentName={ this.props.fragmentName } />
      case 'skirmish':
        return <DRSLostActionAcquisitionMethodSkirmishCard methodData={ this.props.methodData } />
      case 'ce':
        return <DRSLostActionAcquisitionMethodCECard methodData={ this.props.methodData } />
      case 'duty':
        return <DRSLostActionAcquisitionMethodDutyCard methodData={ this.props.methodData } />
      case 'purchase':
        return <DRSLostActionAcquisitionMethodPurchaseCard methodData={ this.props.methodData } fragmentId={ this.props.fragmentId } priceData={ this.props.priceData } />
      default:
        return <Box />;
    }
  }
}

export default DRSLostActionAcquisitionMethodCardComponent;