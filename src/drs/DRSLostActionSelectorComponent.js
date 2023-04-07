import React, { Component } from 'react';
import DRSHolsterHelper from './lib/DRSHolsterHelper';

import { Box, Divider, FormControl, MenuItem, Select, Stack, Typography } from '@mui/material';
import { groupBy } from 'underscore';

class DRSLostActionSelectorComponent extends Component {
  renderSelectorMenuSection(items) {
    const menuItems = [];
    for (let i = 0; i < items.length; i++) {
      const action = items[i];
      menuItems.push(
        <MenuItem value={action.full}>
          <Stack direction={'row'} spacing={2} alignItems={'center'}>
            <img src={`${process.env.PUBLIC_URL}/assets/lostactions/${action.image}.jpg`} alt={action.full} />
            <Typography>{action.full}</Typography>
          </Stack>
        </MenuItem>
      );
    }

    return menuItems;
  }

  renderSelectorMenu() {
    const lostActions = DRSHolsterHelper.getLostActions();

    // Create sections
    const actionsBySection = groupBy(lostActions, (i) => {
      return i.type;
    })

    const menuItems = [];

    menuItems.push(<MenuItem value=''>None</MenuItem>);

    menuItems.push(<Divider textAlign='left'>Offensive</Divider>);
    menuItems.push(...(this.renderSelectorMenuSection(actionsBySection['offensive'])));

    menuItems.push(<Divider textAlign='left'>Defensive</Divider>);
    menuItems.push(...(this.renderSelectorMenuSection(actionsBySection['defensive'])));

    menuItems.push(<Divider textAlign='left'>Restorative</Divider>);
    menuItems.push(...(this.renderSelectorMenuSection(actionsBySection['restorative'])));

    menuItems.push(<Divider textAlign='left'>Beneficial</Divider>);
    menuItems.push(...(this.renderSelectorMenuSection(actionsBySection['beneficial'])));

    menuItems.push(<Divider textAlign='left'>Tactical</Divider>);
    menuItems.push(...(this.renderSelectorMenuSection(actionsBySection['tactical'])));

    menuItems.push(<Divider textAlign='left'>Detrimental</Divider>);
    menuItems.push(...(this.renderSelectorMenuSection(actionsBySection['detrimental'])));

    menuItems.push(<Divider textAlign='left'>Items</Divider>);
    menuItems.push(...(this.renderSelectorMenuSection(actionsBySection['item'])));

    menuItems.push(<Divider textAlign='left'>Essences</Divider>);
    menuItems.push(...(this.renderSelectorMenuSection(actionsBySection['essence'])));

    menuItems.push(<Divider textAlign='left'>Deep Essences</Divider>);
    menuItems.push(...(this.renderSelectorMenuSection(actionsBySection['deep_essence'])));

    menuItems.push(<Divider textAlign='left'>Pure Essences</Divider>);
    menuItems.push(...(this.renderSelectorMenuSection(actionsBySection['pure_essence'])));

    return menuItems;
  }

  renderSelectedAction(actionName) {
    if (actionName === '') {
      return (
        <Stack>
          <Box width={64} height={64} />
        <Typography variant='caption'>None</Typography>
      </Stack>
      )
    }
    const action = DRSHolsterHelper.getLostActionData(actionName);

    return (
      <Stack direction={'row'} spacing={2} alignItems={'center'}>
        <img src={`${process.env.PUBLIC_URL}/assets/lostactions/${action.image}.jpg`} width={32} height={32} alt={action.full} />
        <Typography>{action.full}</Typography>
      </Stack>
    )
  }

  render() {
    const defaultAction = this.props.lostAction ?? '';

    const menuItems = this.renderSelectorMenu();

    return (
      <Box width={325}>
        <Stack direction='row'>
          <FormControl sx={{ width: 325}}>
            <Select
              fullWidth={true}
              displayEmpty
              size='small'
              value={defaultAction}
              renderValue={this.renderSelectedAction}
              onChange={this.props.handleActionUpdate}
            >
              {menuItems}
            </Select>
          </FormControl>
        </Stack>
      </Box>
    );
  }
}

export default DRSLostActionSelectorComponent;