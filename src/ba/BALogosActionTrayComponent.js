import React, { Component } from 'react';

import { Box, Divider, Stack, Typography } from '@mui/material';

import BALogosActionTrayLogosComponent from './BALogosActionTrayLogosComponent.js'
import BALogosActionRecipeContainerComponent from './BALogosActionRecipeContainerComponent.js'

/**
 * One tray.
 * 2 | [Tray logos] [Recipe]
 */
class BALogosActionTrayComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tray: this.props.tray,
      index: this.props.index
    }

    this.handleLogosActionUpdate = this.handleLogosActionUpdate.bind(this);
  }

  handleLogosActionUpdate(data) {
    if (data.array === 'umbral') {
      this.setState({
        tray: {
          umbral: data.newAction,
          astral: this.state.tray.astral
        }
      })
    }
    if (data.array === 'astral') {
      this.setState({
        tray: {
          umbral: this.state.tray.umbral,
          astral: data.newAction
        }
      })
    }
  }

  render() {
    return (
      <Box sx={{ border: 1, borderRadius: '12px', borderColor: '#ddd' }}>
        <Stack
          direction='row'
          spacing={2}
          height={150}
          p={1}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Box width={25}>
            <Typography align='center' fontWeight={700} width={150} sx={{transform: 'translateX(-40%) rotate(-90deg)', whiteSpace: 'nowrap'}}>
              {this.props.index === 0
                ? 'PRE-POP'
                : 'PLATE ' + this.props.index
              }
            </Typography>
          </Box>
          <Divider orientation="vertical" variant="middle" flexItem />
          <BALogosActionTrayLogosComponent tray={this.props.tray} index={this.props.index} handleLogosActionUpdate={this.props.handleLogosActionUpdate} />
          <Box flexItem={true}>
            <BALogosActionRecipeContainerComponent tray={this.props.tray} />
          </Box>
          
        </Stack>
      </Box>
    );
  }
}

export default BALogosActionTrayComponent;