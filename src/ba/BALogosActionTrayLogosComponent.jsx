import React from 'react';

import { groupBy } from 'underscore';
import { v4 as uuidv4 } from 'uuid';

import {
  Box, Divider, FormControl, MenuItem, Select, Stack, Typography,
} from '@mui/material';

import logosActionsJson from './lib/LogosActions.json';

/**
 * Two logos actions in a tray with dropdowns to select a different action.
 * When a new action is selected call back up the chain to refresh recipe.
 */
export default function BALogosActionTrayLogosComponent({ tray, index, handleLogosActionUpdate }) {
  function renderTrayMenu() {
    const { logosActions } = logosActionsJson;

    // Create sections
    const actionsBySection = groupBy(logosActions, (i) => i.type);

    const menuItems = [];

    menuItems.push(<MenuItem value="" key={`action-${uuidv4()}`}>None</MenuItem>);

    menuItems.push(<Divider textAlign="left" key={`action-${uuidv4()}`}>Wisdoms</Divider>);
    for (let i = 0; i < actionsBySection.wisdom.length; i += 1) {
      const action = actionsBySection.wisdom[i];
      menuItems.push(
        <MenuItem value={action.full} key={`action-${uuidv4()}`}>
          <Stack direction="row" spacing={2} alignItems="center">
            <img
              src={`${process.env.PUBLIC_URL}/assets/logosactions/${action.image}.png`}
              alt={action.name}
            />
            <Typography>{action.full}</Typography>
          </Stack>
        </MenuItem>,
      );
    }

    menuItems.push(<Divider textAlign="left" key={`action-${uuidv4()}`}>Spirits</Divider>);
    for (let i = 0; i < actionsBySection.spirit.length; i += 1) {
      const action = actionsBySection.spirit[i];
      menuItems.push(
        <MenuItem value={action.full} key={`action-${uuidv4()}`}>
          <Stack direction="row" spacing={2} alignItems="center">
            <img
              src={`${process.env.PUBLIC_URL}/assets/logosactions/${action.image}.png`}
              alt={action.name}
            />
            <Typography>{action.full}</Typography>
          </Stack>
        </MenuItem>,
      );
    }

    menuItems.push(
      <Divider textAlign="left" key={`action-${uuidv4()}`}>Personal Actions</Divider>,
    );
    for (let i = 0; i < actionsBySection.personalAction.length; i += 1) {
      const action = actionsBySection.personalAction[i];
      menuItems.push(
        <MenuItem value={action.full} key={`action-${uuidv4()}`}>
          <Stack direction="row" spacing={2} alignItems="center">
            <img
              src={`${process.env.PUBLIC_URL}/assets/logosactions/${action.image}.png`}
              alt={action.name}
            />
            <Typography>{action.full}</Typography>
          </Stack>
        </MenuItem>,
      );
    }

    menuItems.push(
      <Divider textAlign="left" key={`action-${uuidv4()}`}>Beneficial Actions</Divider>,
    );
    for (let i = 0; i < actionsBySection.beneficialAction.length; i += 1) {
      const action = actionsBySection.beneficialAction[i];
      menuItems.push(
        <MenuItem value={action.full} key={`action-${uuidv4()}`}>
          <Stack direction="row" spacing={2} alignItems="center">
            <img
              src={`${process.env.PUBLIC_URL}/assets/logosactions/${action.image}.png`}
              alt={action.name}
            />
            <Typography>{action.full}</Typography>
          </Stack>
        </MenuItem>,
      );
    }

    menuItems.push(<Divider textAlign="left" key={`action-${uuidv4()}`}>Other Actions</Divider>);
    for (let i = 0; i < actionsBySection.otherAction.length; i += 1) {
      const action = actionsBySection.otherAction[i];
      menuItems.push(
        <MenuItem value={action.full} key={`action-${uuidv4()}`}>
          <Stack direction="row" spacing={2} alignItems="center">
            <img
              src={`${process.env.PUBLIC_URL}/assets/logosactions/${action.image}.png`}
              alt={action.name}
            />
            <Typography>{action.full}</Typography>
          </Stack>
        </MenuItem>,
      );
    }

    return menuItems;
  }

  /**
   * Render Logic
   */
  const { logosActions } = logosActionsJson;
  const defaultUmbral = tray.umbral ?? '';
  const defaultAstral = tray.astral ?? '';

  const menuItems = renderTrayMenu();

  return (
    <Box border={0} borderRadius="12px" width={250} height={135}>
      <Stack direction="row" alignItems="center" justifyContent="center" mt={1}>
        <FormControl sx={{ width: 120, height: 100 }}>
          <Select
            fullWidth
            height={100}
            displayEmpty
            value={defaultUmbral}
            onChange={(e) => handleLogosActionUpdate({
              plate: index,
              array: 'umbral',
              newAction: e.target.value,
            })}
            renderValue={(selected) => {
              const action = logosActions[selected];
              if (selected === '') {
                return (
                  <Stack>
                    <Box width={64} height={64} />
                    <Typography variant="caption">None</Typography>
                  </Stack>
                );
              }
              return (
                <Stack>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/logosactions/${action.image}.png`}
                    width={64}
                    height={64}
                    alt={action.name}
                  />
                  <Typography variant="caption">{action.short}</Typography>
                </Stack>
              );
            }}
          >
            {menuItems}
          </Select>
        </FormControl>

        <FormControl sx={{ width: 120, height: 100 }}>
          <Select
            fullWidth
            height={100}
            displayEmpty
            value={defaultAstral}
            onChange={(e) => handleLogosActionUpdate({
              plate: index,
              array: 'astral',
              newAction: e.target.value,
            })}
            renderValue={(selected) => {
              const action = logosActions[selected];
              if (selected === '') {
                return (
                  <Stack>
                    <Box width={64} height={64} />
                    <Typography variant="caption">None</Typography>
                  </Stack>
                );
              }
              return (
                <Stack>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/logosactions/${action.image}.png`}
                    width={64}
                    height={64}
                    alt={action.name}
                  />
                  <Typography variant="caption">{action.short}</Typography>
                </Stack>
              );
            }}
          >
            {menuItems}
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
}
