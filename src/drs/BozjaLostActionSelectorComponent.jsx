import React, { useCallback } from 'react';

import {
  Box, Divider, FormControl, MenuItem, Select, Stack, Tooltip, Typography,
} from '@mui/material';
import { groupBy } from 'underscore';
import { v4 as uuidv4 } from 'uuid';
import DRSLostActionHelper from './lib/DRSLostActionHelper';
import BozjaLostActionInformationTooltipComponent from './BozjaLostActionInformationTooltipComponent';

export default function BozjaLostActionSelectorComponent({ lostAction, handleActionUpdate }) {
  function renderSelectorMenuSection(items) {
    const menuItems = [];
    for (let i = 0; i < items.length; i += 1) {
      const action = items[i];
      const actionData = DRSLostActionHelper.getLostActionData(action.full);
      menuItems.push(
        <MenuItem value={action.full} key={`selector-${uuidv4()}`}>
          <Tooltip
            arrow
            placement="left"
            enterDelay={500}
            title={(
              <BozjaLostActionInformationTooltipComponent
                lostAction={action.full}
                actionData={actionData}
              />
            )}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <img
                src={`${process.env.PUBLIC_URL}/assets/lostactions/${action.image}.jpg`}
                alt={action.full}
              />
              <Typography>{action.full}</Typography>
            </Stack>
          </Tooltip>
        </MenuItem>,
      );
    }

    return menuItems;
  }

  function renderSelectorMenu() {
    const lostActions = DRSLostActionHelper.getLostActions();

    // Create sections
    const actionsBySection = groupBy(lostActions, (i) => i.type);

    const menuItems = [];

    menuItems.push(<MenuItem value="" key={`selector-${uuidv4()}`}>None</MenuItem>);

    menuItems.push(<Divider textAlign="left" key={`selector-${uuidv4()}`}>Offensive</Divider>);
    menuItems.push(...(renderSelectorMenuSection(actionsBySection.offensive)));

    menuItems.push(<Divider textAlign="left" key={`selector-${uuidv4()}`}>Defensive</Divider>);
    menuItems.push(...(renderSelectorMenuSection(actionsBySection.defensive)));

    menuItems.push(<Divider textAlign="left" key={`selector-${uuidv4()}`}>Restorative</Divider>);
    menuItems.push(...(renderSelectorMenuSection(actionsBySection.restorative)));

    menuItems.push(<Divider textAlign="left" key={`selector-${uuidv4()}`}>Beneficial</Divider>);
    menuItems.push(...(renderSelectorMenuSection(actionsBySection.beneficial)));

    menuItems.push(<Divider textAlign="left" key={`selector-${uuidv4()}`}>Tactical</Divider>);
    menuItems.push(...(renderSelectorMenuSection(actionsBySection.tactical)));

    menuItems.push(<Divider textAlign="left" key={`selector-${uuidv4()}`}>Detrimental</Divider>);
    menuItems.push(...(renderSelectorMenuSection(actionsBySection.detrimental)));

    menuItems.push(<Divider textAlign="left" key={`selector-${uuidv4()}`}>Items</Divider>);
    menuItems.push(...(renderSelectorMenuSection(actionsBySection.item)));

    menuItems.push(<Divider textAlign="left" key={`selector-${uuidv4()}`}>Essences</Divider>);
    menuItems.push(...(renderSelectorMenuSection(actionsBySection.essence)));

    menuItems.push(<Divider textAlign="left" key={`selector-${uuidv4()}`}>Deep Essences</Divider>);
    menuItems.push(...(renderSelectorMenuSection(actionsBySection.deep_essence)));

    menuItems.push(<Divider textAlign="left" key={`selector-${uuidv4()}`}>Pure Essences</Divider>);
    menuItems.push(...(renderSelectorMenuSection(actionsBySection.pure_essence)));

    return menuItems;
  }

  const renderSelectedAction = useCallback((actionName) => {
    if (actionName === '') {
      return (
        <Stack direction="row" spacing={2} alignItems="center">
          <Box width={32} height={32} />
          <Typography>None</Typography>
        </Stack>
      );
    }
    const action = DRSLostActionHelper.getLostActionData(actionName);

    return (
      <Tooltip
        arrow
        placement="top"
        enterDelay={600}
        disableInteractive
        title={(
          <BozjaLostActionInformationTooltipComponent
            lostAction={actionName}
            actionData={action}
          />
        )}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <img src={`${process.env.PUBLIC_URL}/assets/lostactions/${action.image}.jpg`} width={32} height={32} alt={action.full} />
          <Typography>{action.full}</Typography>
        </Stack>
      </Tooltip>
    );
  });

  const defaultAction = lostAction ?? '';
  const menuItems = renderSelectorMenu();

  return (
    <Box width={325}>
      <Stack direction="row">
        <FormControl sx={{ width: 325 }}>
          <Select
            fullWidth
            displayEmpty
            size="small"
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
