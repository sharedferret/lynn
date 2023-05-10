import { Box, Divider, FormControl, MenuItem, Select, Stack, Typography } from '@mui/material';
import React from 'react';
import EurekaLogosActionHelper from './lib/EurekaLogosActionHelper';
import { groupBy } from 'underscore';
import { v4 as uuidv4 } from 'uuid';

export default function EurekaLogosActionSelectorComponent({ logosAction, handleActionUpdate }) {
  function renderSelectorMenuSection(items) {
    const menuItems = [];
    for (let i = 0; i < items.length; i++) {
      const action = items[i];
      menuItems.push(
        <MenuItem value={action.full} key={ 'selector-' + uuidv4() }>
          <Stack direction={'row'} spacing={2} alignItems={'center'}>
            <img src={`${process.env.PUBLIC_URL}/assets/logosactions/${action.image}.png`} alt={action.full} />
            <Typography>{action.full}</Typography>
          </Stack>
        </MenuItem>
      );
    }

    return menuItems;
  }

  function renderSelectorMenu() {
    const logosActions = EurekaLogosActionHelper.getLogosActions();
    
    // Create sections
    const actionsBySection = groupBy(logosActions, (i) => {
      return i.type;
    });

    const menuItems = [];

    menuItems.push(<MenuItem value='' key={ 'selector-' + uuidv4() }>None</MenuItem>);

    menuItems.push(<Divider textAlign='left' key={ 'selector-' + uuidv4() }>Wisdoms</Divider>);
    menuItems.push(...(renderSelectorMenuSection(actionsBySection['wisdom'])));

    menuItems.push(<Divider textAlign='left' key={ 'selector-' + uuidv4() }>Spirits</Divider>);
    menuItems.push(...(renderSelectorMenuSection(actionsBySection['spirit'])));

    menuItems.push(<Divider textAlign='left' key={ 'selector-' + uuidv4() }>Personal Actions</Divider>);
    menuItems.push(...(renderSelectorMenuSection(actionsBySection['personalAction'])));

    menuItems.push(<Divider textAlign='left' key={ 'selector-' + uuidv4() }>Beneficial Actions</Divider>);
    menuItems.push(...(renderSelectorMenuSection(actionsBySection['beneficialAction'])));

    menuItems.push(<Divider textAlign='left' key={ 'selector-' + uuidv4() }>Other Actions</Divider>);
    menuItems.push(...(renderSelectorMenuSection(actionsBySection['otherAction'])));

    return menuItems;
  }

  function renderSelectedAction(actionName) {
    if (actionName === '') {
      return (
        <Stack direction={'row'} spacing={2} alignItems={'center'}>
          <Box width={32} height={32} />
          <Typography>None</Typography>
        </Stack>
      )
    }

    const action = EurekaLogosActionHelper.getLogosActionData(actionName);

    return (
      <Stack direction={'row'} spacing={2} alignItems={'center'}>
        <img src={`${process.env.PUBLIC_URL}/assets/logosactions/${action.image}.png`} width={32} height={32} alt={action.full} />
        <Typography>{action.full}</Typography>
      </Stack>
    )
  }

  /**
   * Render Logic
   */
  const defaultAction = logosAction ?? '';
    const menuItems = renderSelectorMenu();

    return (
      <Box width={325}>
        <Stack direction={'row'}>
          <FormControl sx={{ width: 325 }}>
            <Select
              fullWidth={true}
              displayEmpty
              size={'small'}
              value={defaultAction}
              renderValue={renderSelectedAction}
              onChange={handleActionUpdate}
            >
              {menuItems}
            </Select>
          </FormControl>
        </Stack>
      </Box>
    );
}
