import React, { Component } from 'react';

import DRSLostActionAcquisitionMethodStarMobCard from './DRSLostActionAcquisitionMethodStarMobCard';
import DRSLostActionAcquisitionMethodClusterCard from './DRSLostActionAcquisitionMethodClusterCard';
import DRSLostActionAcquisitionMethodMobCard from './DRSLostActionAcquisitionMethodMobCard';
import DRSLostActionAcquisitionMethodReflectCard from './DRSLostActionAcquisitionMethodReflectCard';
import DRSLostActionAcquisitionMethodSkirmishCard from './DRSLostActionAcquisitionMethodSkirmishCard';
import DRSLostActionAcquisitionMethodCECard from './DRSLostActionAcquisitionMethodCECard';
import DRSLostActionAcquisitionMethodDutyCard from './DRSLostActionAcquisitionMethodDutyCard';

class DRSLostActionAcquisitionMethodCardComponent extends Component {


  render() {
    const method = this.props.fragmentData.method;
    switch(method) {
      case 'star_mob':
        return <DRSLostActionAcquisitionMethodStarMobCard methodData={ this.props.fragmentData } />
      case 'cluster':
        return <DRSLostActionAcquisitionMethodClusterCard methodData={ this.props.fragmentData } />
      case 'mob':
        return <DRSLostActionAcquisitionMethodMobCard methodData={ this.props.fragmentData } />
      case 'reflect':
        return <DRSLostActionAcquisitionMethodReflectCard methodData={ this.props.fragmentData } fragmentName={ this.props.fragmentName } />
      case 'skirmish':
        return <DRSLostActionAcquisitionMethodSkirmishCard methodData={ this.props.fragmentData } />
      case 'ce':
        return <DRSLostActionAcquisitionMethodCECard methodData={ this.props.fragmentData } />
      case 'duty':
        return <DRSLostActionAcquisitionMethodDutyCard methodData={ this.props.fragmentData } />
      default:
        return null;
    }
  }
}

export default DRSLostActionAcquisitionMethodCardComponent;