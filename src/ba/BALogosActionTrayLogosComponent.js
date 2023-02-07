import React, { Component } from 'react';

import { groupBy } from 'underscore';

import { Box, Divider, FormControl, MenuItem, Select, Stack, Typography } from '@mui/material';

/**
 * Two logos actions in a tray with dropdowns to select a different action.
 * When a new action is selected call back up the chain to refresh recipe.
 */
class BALogosActionTrayLogosComponent extends Component {
  renderTrayMenu() {
    const logosActions = require('./lib/LogosActions.json').logosActions;

    // Create sections
    const actionsBySection = groupBy(logosActions, (i) => {
      return i.type;
    });

    const menuItems = [];

    menuItems.push(<MenuItem value=''>None</MenuItem>);

    menuItems.push(<Divider textAlign="left">Wisdoms</Divider>);
    for (let i = 0; i < actionsBySection['wisdom'].length; i++) {
      const action = actionsBySection['wisdom'][i];
      menuItems.push(
        <MenuItem value={action.full}>
          <Stack direction='row' spacing={2} alignItems='center'>
            <img src={`${process.env.PUBLIC_URL}/assets/logosactions/${action.image}.png`} alt={action.name} />
            <Typography>{action.full}</Typography>
          </Stack>
        </MenuItem>)
    }

    menuItems.push(<Divider textAlign="left">Spirits</Divider>);
    for (let i = 0; i < actionsBySection['spirit'].length; i++) {
      const action = actionsBySection['spirit'][i];
      menuItems.push(
        <MenuItem value={action.full}>
          <Stack direction='row' spacing={2} alignItems='center'>
            <img src={`${process.env.PUBLIC_URL}/assets/logosactions/${action.image}.png`} alt={action.name} />
            <Typography>{action.full}</Typography>
          </Stack>
        </MenuItem>)
    }

    menuItems.push(<Divider textAlign="left">Personal Actions</Divider>);
    for (let i = 0; i < actionsBySection['personalAction'].length; i++) {
      const action = actionsBySection['personalAction'][i];
      menuItems.push(
        <MenuItem value={action.full}>
          <Stack direction='row' spacing={2} alignItems='center'>
            <img src={`${process.env.PUBLIC_URL}/assets/logosactions/${action.image}.png`} alt={action.name} />
            <Typography>{action.full}</Typography>
          </Stack>
        </MenuItem>)
    }

    menuItems.push(<Divider textAlign="left">Beneficial Actions</Divider>);
    for (let i = 0; i < actionsBySection['beneficialAction'].length; i++) {
      const action = actionsBySection['beneficialAction'][i];
      menuItems.push(
        <MenuItem value={action.full}>
          <Stack direction='row' spacing={2} alignItems='center'>
            <img src={`${process.env.PUBLIC_URL}/assets/logosactions/${action.image}.png`} alt={action.name} />
            <Typography>{action.full}</Typography>
          </Stack>
        </MenuItem>)
    }

    menuItems.push(<Divider textAlign="left">Other Actions</Divider>);
    for (let i = 0; i < actionsBySection['otherAction'].length; i++) {
      const action = actionsBySection['otherAction'][i];
      menuItems.push(
        <MenuItem value={action.full}>
          <Stack direction='row' spacing={2} alignItems='center'>
            <img src={`${process.env.PUBLIC_URL}/assets/logosactions/${action.image}.png`} alt={action.name} />
            <Typography>{action.full}</Typography>
          </Stack>
        </MenuItem>)
    }

    return menuItems;
  }

  render() {
    const logosActions = require('./lib/LogosActions.json').logosActions;
    const defaultUmbral = this.props.tray.umbral ?? '';
    const defaultAstral = this.props.tray.astral ?? '';

    const menuItems = this.renderTrayMenu();

    return (
      <Box border={0} borderRadius={'12px'} width={250} height={135}>
        <Stack direction='row' alignItems={'center'} justifyContent={'center'} mt={1}>
          <FormControl sx={{width: 120, height: 100}}>
            <Select
              fullWidth={true}
              height={100}
              displayEmpty
              value={defaultUmbral}
              onChange={(e) => this.props.handleLogosActionUpdate({
                plate: this.props.index,
                array: 'umbral',
                newAction: e.target.value
              })}
              renderValue={(selected) => {
                const action = logosActions[selected];
                if (selected === '') {
                  return (
                    <Stack>
                    <Box width={64} height={64} />
                    <Typography variant='caption'>None</Typography>
                  </Stack>
                  )
                }
                return (
                  <Stack>
                    <img src={`${process.env.PUBLIC_URL}/assets/logosactions/${action.image}.png`} width={64} height={64} alt={action.name} />
                    <Typography variant='caption'>{action.short}</Typography>
                  </Stack>
                )
              }}
            >
              {menuItems}
            </Select>
          </FormControl>

          <FormControl sx={{width: 120, height: 100}}>
            <Select
              fullWidth={true}
              height={100}
              displayEmpty
              value={defaultAstral}
              onChange={(e) => this.props.handleLogosActionUpdate({
                plate: this.props.index,
                array: 'astral',
                newAction: e.target.value
              })}
              renderValue={(selected) => {
                const action = logosActions[selected];
                if (selected === '') {
                  return (
                    <Stack>
                    <Box width={64} height={64} />
                    <Typography variant='caption'>None</Typography>
                  </Stack>
                  )
                }
                return (
                  <Stack>
                    <img src={`${process.env.PUBLIC_URL}/assets/logosactions/${action.image}.png`} width={64} height={64} alt={action.name} />
                    <Typography variant='caption'>{action.short}</Typography>
                  </Stack>
                )
              }}
            >
              {menuItems}
            </Select>
          </FormControl>
        </Stack>
      </Box>
    );
  }
}

export default BALogosActionTrayLogosComponent;