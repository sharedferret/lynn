import React, { Component } from 'react';
import DRSHolsterHelper from './lib/DRSHolsterHelper';

import { Box, Divider, FormControl, MenuItem, Select, Stack, Typography } from '@mui/material';
import { groupBy } from 'underscore';
import { v4 as uuidv4 } from 'uuid';

class ActionSelectorComponent extends Component {
  renderSelectorMenuSection(items) {
    const menuItems = [];
    for (let i = 0; i < items.length; i++) {
      const action = items[i];
      menuItems.push(
        <MenuItem value={action.full} key={ 'selector-' + uuidv4() }>
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

    menuItems.push(<MenuItem value='' key={ 'selector-' + uuidv4() }>None</MenuItem>);

    menuItems.push(<Divider textAlign='left' key={ 'selector-' + uuidv4() }>Offensive</Divider>);
    menuItems.push(...(this.renderSelectorMenuSection(actionsBySection['offensive'])));

    menuItems.push(<Divider textAlign='left' key={ 'selector-' + uuidv4() }>Defensive</Divider>);
    menuItems.push(...(this.renderSelectorMenuSection(actionsBySection['defensive'])));

    menuItems.push(<Divider textAlign='left' key={ 'selector-' + uuidv4() }>Restorative</Divider>);
    menuItems.push(...(this.renderSelectorMenuSection(actionsBySection['restorative'])));

    menuItems.push(<Divider textAlign='left' key={ 'selector-' + uuidv4() }>Beneficial</Divider>);
    menuItems.push(...(this.renderSelectorMenuSection(actionsBySection['beneficial'])));

    menuItems.push(<Divider textAlign='left' key={ 'selector-' + uuidv4() }>Tactical</Divider>);
    menuItems.push(...(this.renderSelectorMenuSection(actionsBySection['tactical'])));

    menuItems.push(<Divider textAlign='left' key={ 'selector-' + uuidv4() }>Detrimental</Divider>);
    menuItems.push(...(this.renderSelectorMenuSection(actionsBySection['detrimental'])));

    menuItems.push(<Divider textAlign='left' key={ 'selector-' + uuidv4() }>Items</Divider>);
    menuItems.push(...(this.renderSelectorMenuSection(actionsBySection['item'])));

    menuItems.push(<Divider textAlign='left' key={ 'selector-' + uuidv4() }>Essences</Divider>);
    menuItems.push(...(this.renderSelectorMenuSection(actionsBySection['essence'])));

    menuItems.push(<Divider textAlign='left' key={ 'selector-' + uuidv4() }>Deep Essences</Divider>);
    menuItems.push(...(this.renderSelectorMenuSection(actionsBySection['deep_essence'])));

    menuItems.push(<Divider textAlign='left' key={ 'selector-' + uuidv4() }>Pure Essences</Divider>);
    menuItems.push(...(this.renderSelectorMenuSection(actionsBySection['pure_essence'])));

    return menuItems;
  }

  renderSelectedAction(actionName) {
    if (actionName === '') {
      return (
        <Stack direction={'row'} spacing={2} alignItems={'center'}>
          <Box width={32} height={32} />
          <Typography>None</Typography>
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

export default ActionSelectorComponent;