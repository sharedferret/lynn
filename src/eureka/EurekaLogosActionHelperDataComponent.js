import React, { Component } from 'react';
import universalisPriceHelperInstance from '../acquisition/UniversalisPriceHelper';
import EurekaLogosActionHelper from './lib/EurekaLogosActionHelper';
import { Box, Divider, Stack, Typography } from '@mui/material';
import EurekaLogogramDataComponent from './EurekaLogogramDataComponent';
import EurekaLogosActionRecipeSelectorComponent from './EurekaLogosActionRecipeSelectorComponent';
import { v4 as uuidv4 } from 'uuid';

class EurekaLogosActionHelperDataComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actionPriceData: null,
      lastUpdated: new Date(),
    }

    this.updateGuideState = this.updateGuideState.bind(this);
  }

  componentDidMount() {
    if (this.props.selectedRecipe) {
      const recipeLogograms = this.props.selectedRecipe.map(i => {
        return EurekaLogosActionHelper.getLogogramForMneme(i);
      })
  
      if (recipeLogograms.length > 0) {
        universalisPriceHelperInstance.fetchIDs(recipeLogograms, this.updateGuideState);
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedRecipe !== prevProps.selectedRecipe) {
      const recipeLogograms = this.props.selectedRecipe.map(i => {
        return EurekaLogosActionHelper.getLogogramForMneme(i);
      })
  
      if (recipeLogograms.length > 0) {
        universalisPriceHelperInstance.fetchIDs(recipeLogograms, this.updateGuideState);
      }
    }
  }

  updateGuideState(priceData) {
    this.setState({
      actionPriceData: priceData,
      lastUpdated: new Date()
    })
  }

  render() {
    if (this.props.logosAction === '') {
      return null;
    }

    const actionData = EurekaLogosActionHelper.getLogosActionData(this.props.logosAction);

    if (actionData === undefined) {
      return null;
    }

    return (
      <Stack spacing={2} p={1} alignItems={'flex-start'} width={1000}>
        <Divider variant={'middle'} />
        <Stack direction={'row'} alignItems={'center'}>
          <Stack direction={ 'row' } alignItems={'center'}>
            <img src={`${process.env.PUBLIC_URL}/assets/logosactions/${actionData.image}.png`} width={48} height={48} alt={'Resistance Reraiser'} />
            <Box width={ 12 } />
            <Typography fontWeight={700} variant='h4'>{ this.props.logosAction }</Typography>
          </Stack>
        </Stack>
        <Typography fontWeight={700} variant={'h5'}>Recipes</Typography>
        <EurekaLogosActionRecipeSelectorComponent
          recipes={ actionData.recipes }
          selectedRecipe={ this.props.selectedRecipe }
          handleRecipeUpdate={ this.props.handleRecipeUpdate } />
        <Divider />
        <Typography fontWeight={700} variant={'h5'}>Logograms Needed</Typography>
        <Stack spacing={2} divider={<Divider variant='middle' />}>
          {
            this.props.selectedRecipe.map(i => {
              const mnemeData = EurekaLogosActionHelper.getMnemeData(i);
              const logogramData = EurekaLogosActionHelper.getLogogramData(mnemeData.logogram);
              return <EurekaLogogramDataComponent
                logogramData={logogramData}
                mnemeData={mnemeData}
                mneme={i}
                priceData={this.state.actionPriceData ? this.state.actionPriceData[mnemeData.logogram] : null}
                lastUpdated={ this.state.lastUpdated }
                key={ uuidv4() }
              />
            })
          }
        </Stack>
        
      </Stack>
    )
  }
}

export default EurekaLogosActionHelperDataComponent;