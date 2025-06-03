import React from 'react';
import Box from '@mui/material/Box';

import ActionAcquisitionMethodStarMobCard from './ActionAcquisitionMethodStarMobCard';
import ActionAcquisitionMethodClusterCard from './ActionAcquisitionMethodClusterCard';
import ActionAcquisitionMethodMobCard from './ActionAcquisitionMethodMobCard';
import ActionAcquisitionMethodReflectCard from './ActionAcquisitionMethodReflectCard';
import ActionAcquisitionMethodSkirmishCard from './ActionAcquisitionMethodSkirmishCard';
import ActionAcquisitionMethodCECard from './ActionAcquisitionMethodCECard';
import ActionAcquisitionMethodDutyCard from './ActionAcquisitionMethodDutyCard';
import ActionAcquisitionMethodPurchaseCard from './ActionAcquisitionMethodPurchaseCard';
import ActionAcquisitionMethodBunnyFateCard from './ActionAcquisitionMethodBunnyFateCard';
import ActionAcquisitionMethod30ChainCard from './ActionAcquisitionMethod30ChainCard';
import ActionAcquisitionMethodNMCard from './ActionAcquisitionMethodNMCard';
import ActionAcquisitionMethodBoxFarmCard from './ActionAcquisitionMethodBoxFarmCard';

export default function ActionAcquisitionMethodCardComponent({
  methodData, fragmentName, fragmentId, priceData,
}) {
  switch (methodData.method) {
    case 'bunny_fate':
      return <ActionAcquisitionMethodBunnyFateCard methodData={methodData} />;
    case '30_chain':
      return <ActionAcquisitionMethod30ChainCard methodData={methodData} />;
    case 'nm':
      return <ActionAcquisitionMethodNMCard methodData={methodData} />;
    case 'box_farm':
      return <ActionAcquisitionMethodBoxFarmCard methodData={methodData} />;
    case 'star_mob':
      return <ActionAcquisitionMethodStarMobCard methodData={methodData} />;
    case 'cluster':
      return <ActionAcquisitionMethodClusterCard methodData={methodData} />;
    case 'mob':
      return <ActionAcquisitionMethodMobCard methodData={methodData} />;
    case 'reflect':
      return (
        <ActionAcquisitionMethodReflectCard
          methodData={methodData}
          fragmentName={fragmentName}
        />
      );
    case 'skirmish':
      return <ActionAcquisitionMethodSkirmishCard methodData={methodData} />;
    case 'ce':
      return <ActionAcquisitionMethodCECard methodData={methodData} />;
    case 'duty':
      return <ActionAcquisitionMethodDutyCard methodData={methodData} />;
    case 'purchase':
      return (
        <ActionAcquisitionMethodPurchaseCard
          methodData={methodData}
          fragmentId={fragmentId}
          priceData={priceData}
        />
      );
    default:
      return <Box />;
  }
}
