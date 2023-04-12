import React, { Component } from 'react';

import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import DRSHolsterHelper from './lib/DRSHolsterHelper';
import DRSHolsterContainerComponent from './DRSHolsterContainerComponent';
import DRSHolsterActionAcquisitionGuideComponent from './DRSHolsterActionAcquisitionGuideComponent';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

class DRSHolsterMainComponent extends Component {
  constructor(props) {
    super(props);

    const holster = this.props.holster;
    if (holster.name !== undefined) {
      const holsterData = DRSHolsterHelper.getHolsterData(holster.type, holster.name);
      if (holsterData !== undefined) {
        this.state = {
          holsterName: holster.name,
          holsterType: holster.type,
          holsterFriendlyType: DRSHolsterHelper.getFriendlyHolsterSetName(holster.type),
          holsterMetadata: {
            name: holsterData.name,
            role: holsterData.role,
            assignments: holsterData.assignments,
            explanation: holsterData.explanation
          },
          holsterPrepop: holsterData.pre,
          holsterMain: holsterData.main
        }
      }
    }
    
    
    this.handleHolsterUpdate = this.handleHolsterUpdate.bind(this);
    this.renderHolsterSelectionPage = this.renderHolsterSelectionPage.bind(this);
    this.resetHolsterPage = this.resetHolsterPage.bind(this);
  }

  handleHolsterUpdate(data, bagType) {
    if (bagType === 'prepop') {
      this.setState({
        holsterPrepop: data
      });
    } else if (bagType === 'main') {
      this.setState({
        holsterMain: data
      });
    }
  }

  resetHolsterPage() {
    this.setState({
      holsterName: null,
      holsterType: null,
      holsterMetadata: null,
      holsterPrepop: null,
      holsterMain: null
    });

    // TODO: Navigate to /drs/holster
  }

  renderHolsterSelectionPage() {
    const holsterSets = DRSHolsterHelper.getAvailableHolsterSets();
    
    return (
      Object.keys(holsterSets).map(i => {
        const holsterNames = DRSHolsterHelper.getHolsterNames(i);
        return (
          <Box>
            <Stack p={2} spacing={1}>
              <Typography>{ holsterSets[i] }</Typography>
              {
                Object.keys(holsterNames).map(key => {
                  const holsterData = holsterNames[key];
                  return (
                    <a href={ '/drs/holster/' + i + '/' + key }>
                      <Button
                        variant="outlined"
                        size="large"
                        fullWidth
                        sx={{ 'text-transform': 'capitalize' }}
                        style={{justifyContent: "flex-start"}}
                        startIcon={ <Avatar src={`${process.env.PUBLIC_URL}/assets/lostactions/${holsterData.icon}.jpg`} /> }
                        >
                          { holsterData.name }
                      </Button>
                   </a>
                  )
                })
              }
            </Stack>
          </Box>
        )
      })
    );
  }

  render() {
    if (this.state === null || this.state.holsterName === null) {
      return this.renderHolsterSelectionPage();
    }
    return (
      <Box maxWidth={1000}>
        <Stack spacing={2} minHeight={100} p={1}>
          <Typography fontWeight={700} variant={'h4'}>DRS Holster - { this.state.holsterFriendlyType }</Typography>
          <Typography fontWeight={700} variant={'h4'}>Role: {this.state.holsterMetadata.name}</Typography>
          <Typography align='left' p={2} style={{'whiteSpace': 'pre-line'}}>{ this.state.holsterMetadata.explanation }</Typography>
          <DRSHolsterContainerComponent
            name={this.state.holsterName}
            type={this.state.holsterType}
            holsterPrepop={this.state.holsterPrepop}
            holsterMain={this.state.holsterMain}
            handleHolsterUpdate={this.handleHolsterUpdate}
          />
          <Stack direction={'row'}>
            <Box width={200}>
              <Button
                variant="outlined"
                size="large"
                startIcon={<ArrowBackIosNewIcon />}
                onClick={ this.resetHolsterPage }
              >
                Start Over
              </Button>
            </Box>
            <Typography variant='caption' width={650} alignSelf={'center'}>Note: These holsters were created for Lynn Kaneko's DRS runs on The Help Lines. If you're running with a different group, your holsters may vary. Check with your raid lead to see what you need to bring.</Typography>
          </Stack>
          
          <DRSHolsterActionAcquisitionGuideComponent />
        </Stack>
      </Box>
    );
  }
}

export default DRSHolsterMainComponent