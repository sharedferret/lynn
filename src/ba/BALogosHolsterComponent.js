import React, { Component } from 'react';

import { Box, Button, Paper, Stack } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import BALogosActionTrayComponent from './BALogosActionTrayComponent'
import './BALogosHolsterComponent.css'


/**
 * A full holster of logos action trays
 * Width: 800px variable?
 * Stack x6 with spacing
 * props as this.props.trays
 */
class BALogosHolsterComponent extends Component {
  constructor(props) {
    super(props);

    const plates = this.props.tray.plates.map((i, index) => {
      return {
        index: index,
        umbral: i.umbral,
        astral: i.astral
      }
    });
    this.state = {
      plates: plates
    }

    this.handleLogosActionUpdate = this.handleLogosActionUpdate.bind(this);
  }

  handleLogosActionUpdate(data) {
    if (data.array == 'umbral') {
      const newPlates = this.state.plates;
      newPlates[data.plate].umbral = data.newAction;
      this.setState({
        plates: newPlates
      });
    }
    if (data.array == 'astral') {
      const newPlates = this.state.plates;
      newPlates[data.plate].astral = data.newAction;
      this.setState({
        plates: newPlates
      });
    }
  }

  renderAddPlateButton() {
    return (
      <Box>
        <Button
          variant="outlined"
          size="large"
          startIcon={<AddCircleIcon />}
          onClick={(e) => this.handleAddPlateButtonClicked()}
        >
          Add Plate
        </Button>
      </Box>
      
    )
  }

  handleAddPlateButtonClicked() {
    const plates = this.state.plates;
    plates.push({
      index: plates.length,
      umbral: '',
      astral: ''
    })
    this.setState({
      plates: plates,
    });
  }

  render() {
    return (
      <Paper variant='outlined' className='BALogosHolsterPaper'>
        <Stack spacing={2} minHeight={100} p={1}>
          {this.state.plates.map((i, index) => <BALogosActionTrayComponent tray={i} index={index} handleLogosActionUpdate={this.handleLogosActionUpdate} />)}
          {this.state.plates.length < 7 ? this.renderAddPlateButton() : null}
        </Stack>
      </Paper>
    );
  }
}

export default BALogosHolsterComponent;