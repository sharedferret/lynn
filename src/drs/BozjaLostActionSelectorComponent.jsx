import React, { useCallback } from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import groupBy from 'underscore/modules/groupBy';
import DRSLostActionHelper from './lib/DRSLostActionHelper';
import BozjaLostActionInformationTooltipComponent from './BozjaLostActionInformationTooltipComponent';

export default function BozjaLostActionSelectorComponent({ lostAction, handleActionUpdate }) {
  function renderSelectorMenuSection(items) {
    const menuItems = [];
    for (let i = 0; i < items.length; i += 1) {
      const action = items[i];
      const actionData = DRSLostActionHelper.getLostActionData(action.full);
      menuItems.push(
        <MenuItem value={action.full} key={`selector-${crypto.randomUUID()}`}>
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
            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: 'center',
              }}
            >
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

    menuItems.push(<MenuItem value="" key={`selector-${crypto.randomUUID()}`}>None</MenuItem>);

    menuItems.push(<Divider textAlign="left" key={`selector-${crypto.randomUUID()}`}>Offensive</Divider>);
    menuItems.push(...(renderSelectorMenuSection(actionsBySection.offensive)));

    menuItems.push(<Divider textAlign="left" key={`selector-${crypto.randomUUID()}`}>Defensive</Divider>);
    menuItems.push(...(renderSelectorMenuSection(actionsBySection.defensive)));

    menuItems.push(<Divider textAlign="left" key={`selector-${crypto.randomUUID()}`}>Restorative</Divider>);
    menuItems.push(...(renderSelectorMenuSection(actionsBySection.restorative)));

    menuItems.push(<Divider textAlign="left" key={`selector-${crypto.randomUUID()}`}>Beneficial</Divider>);
    menuItems.push(...(renderSelectorMenuSection(actionsBySection.beneficial)));

    menuItems.push(<Divider textAlign="left" key={`selector-${crypto.randomUUID()}`}>Tactical</Divider>);
    menuItems.push(...(renderSelectorMenuSection(actionsBySection.tactical)));

    menuItems.push(<Divider textAlign="left" key={`selector-${crypto.randomUUID()}`}>Detrimental</Divider>);
    menuItems.push(...(renderSelectorMenuSection(actionsBySection.detrimental)));

    menuItems.push(<Divider textAlign="left" key={`selector-${crypto.randomUUID()}`}>Items</Divider>);
    menuItems.push(...(renderSelectorMenuSection(actionsBySection.item)));

    menuItems.push(<Divider textAlign="left" key={`selector-${crypto.randomUUID()}`}>Essences</Divider>);
    menuItems.push(...(renderSelectorMenuSection(actionsBySection.essence)));

    menuItems.push(<Divider textAlign="left" key={`selector-${crypto.randomUUID()}`}>Deep Essences</Divider>);
    menuItems.push(...(renderSelectorMenuSection(actionsBySection.deep_essence)));

    menuItems.push(<Divider textAlign="left" key={`selector-${crypto.randomUUID()}`}>Pure Essences</Divider>);
    menuItems.push(...(renderSelectorMenuSection(actionsBySection.pure_essence)));

    return menuItems;
  }

  const renderSelectedAction = useCallback((actionName) => {
    if (actionName === '') {
      return (
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
            }}
          />
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
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: 'center',
          }}
        >
          <img src={`${process.env.PUBLIC_URL}/assets/lostactions/${action.image}.jpg`} width={32} height={32} alt={action.full} />
          <Typography>{action.full}</Typography>
        </Stack>
      </Tooltip>
    );
  });

  const defaultAction = lostAction ?? '';
  const menuItems = renderSelectorMenu();

  return (
    <Box sx={{
      width: 325,
    }}
    >
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
