import React, { Component } from 'react';

import { Box, Button, Stack, Typography } from '@mui/material';
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
  }

  renderHolsterSelectionPage() {
    return (
      <Box>
        <Stack>
          <Typography>Available Holsters</Typography>
          <a href='/drs/holster/learning/maintank'>
            <Button>Main Tank</Button>
          </a>
          <a href='/drs/holster/learning/offtank'>
            <Button>Off Tank</Button>
          </a>
          <a href='/drs/holster/learning/mainhealer'>
            <Button>Main Healer</Button>
          </a>
          <a href='/drs/holster/learning/offhealer'>
            <Button>Off Healer</Button>
          </a>
          <a href='/drs/holster/learning/melee-rend'>
            <Button>Melee (Rend)</Button>
          </a>
          <a href='/drs/holster/learning/melee-dps'>
            <Button>Melee (DPS)</Button>
          </a>
          <a href='/drs/holster/learning/caster-c4'>
            <Button>Caster (C4)</Button>
          </a>
          <a href='/drs/holster/learning/caster-dps'>
            <Button>Caster (DPS)</Button>
          </a>
          <a href='/drs/holster/learning/ranged-c2'>
            <Button>Ranged (C2)</Button>
          </a>
          <a href='/drs/holster/learning/ranged-dervish'>
            <Button>Ranged (Dervish)</Button>
          </a>
          <a href='/drs/holster/learning/irregular-drk'>
            <Button>Irregular (DRK)</Button>
          </a>
          <a href='/drs/holster/learning/savior-tank'>
            <Button>Savior Tank</Button>
          </a>
          <a href='/drs/holster/learning/profane-whm'>
            <Button>Profane (WHM)</Button>
          </a>
        </Stack>
      </Box>
    );
  }

  render() {
    if (this.state === null || this.state.holsterName === null) {
      return this.renderHolsterSelectionPage();
    }
    return (
      <Box maxWidth={1000}>
        <Stack spacing={2} minHeight={100} p={1}>
          <Typography fontWeight={700} variant={'h4'}>DRS Holster</Typography>
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