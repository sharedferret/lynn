import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import groupBy from 'underscore/modules/groupBy';
import EurekaLogosActionHelper from './lib/EurekaLogosActionHelper';
import EurekaLogosActionInformationTooltipComponent from './EurekaLogosActionInformationTooltipComponent';

export default function EurekaLogosActionSelectorComponent({ logosAction, handleActionUpdate }) {
  const theme = useTheme();

  function renderSelectorMenuSection(items) {
    const menuItems = [];
    for (let i = 0; i < items.length; i += 1) {
      const action = items[i];
      menuItems.push(
        <MenuItem value={action.full} key={`selector-${crypto.randomUUID()}`}>
          <Tooltip
            arrow
            placement={useMediaQuery(theme.breakpoints.up('md')) ? 'left' : 'top'}
            enterDelay={500}
            title={
              useMediaQuery(theme.breakpoints.up('md'))
                ? (
                  <EurekaLogosActionInformationTooltipComponent
                    logosAction={action.full}
                    actionData={action}
                  />
                )
                : ''
            }
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: 'center',
              }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/logosactions/${action.image}.png`}
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
    const logosActions = EurekaLogosActionHelper.getLogosActions();

    // Create sections
    const actionsBySection = groupBy(logosActions, (i) => i.type);

    const menuItems = [];

    menuItems.push(
      <MenuItem value="" key={`selector-${crypto.randomUUID()}`}>None</MenuItem>,
    );

    menuItems.push(
      <Divider textAlign="left" key={`selector-${crypto.randomUUID()}`}>Wisdoms</Divider>,
    );
    menuItems.push(
      ...(renderSelectorMenuSection(actionsBySection.wisdom)),
    );

    menuItems.push(
      <Divider textAlign="left" key={`selector-${crypto.randomUUID()}`}>Spirits</Divider>,
    );
    menuItems.push(
      ...(renderSelectorMenuSection(actionsBySection.spirit)),
    );

    menuItems.push(
      <Divider textAlign="left" key={`selector-${crypto.randomUUID()}`}>Personal Actions</Divider>,
    );
    menuItems.push(...(renderSelectorMenuSection(actionsBySection.personalAction)));

    menuItems.push(
      <Divider textAlign="left" key={`selector-${crypto.randomUUID()}`}>Beneficial Actions</Divider>,
    );
    menuItems.push(
      ...(renderSelectorMenuSection(actionsBySection.beneficialAction)),
    );

    menuItems.push(
      <Divider textAlign="left" key={`selector-${crypto.randomUUID()}`}>Other Actions</Divider>,
    );
    menuItems.push(
      ...(renderSelectorMenuSection(actionsBySection.otherAction)),
    );

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

    const action = EurekaLogosActionHelper.getLogosActionData(actionName);

    return (
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: 'center',
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/assets/logosactions/${action.image}.png`}
          width={32}
          height={32}
          alt={action.full}
        />
        <Typography>{action.full}</Typography>
      </Stack>
    );
  });

  /**
   * Render Logic
   */
  const defaultAction = logosAction ?? '';
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
