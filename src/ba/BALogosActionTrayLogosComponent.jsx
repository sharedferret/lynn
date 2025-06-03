import React from 'react';

import groupBy from 'underscore/modules/groupBy';
import { v4 as uuidv4 } from 'uuid';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/material/styles/useTheme';

import logosActionsJson from './lib/LogosActions.json';
import EurekaLogosActionInformationTooltipComponent from '../eureka/EurekaLogosActionInformationTooltipComponent';

/**
 * Two logos actions in a tray with dropdowns to select a different action.
 * When a new action is selected call back up the chain to refresh recipe.
 */
export default function BALogosActionTrayLogosComponent({ tray, index, handleLogosActionUpdate }) {
  const theme = useTheme();

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
            <Stack direction="row" spacing={2} alignItems="center">
              <img
                src={`${process.env.PUBLIC_URL}/assets/logosactions/${action.image}.png`}
                alt={action.name}
              />
              <Typography>{action.full}</Typography>
            </Stack>
          </Tooltip>
        </MenuItem>,
      );
    }

    menuItems.push(<Divider textAlign="left" key={`action-${uuidv4()}`}>Spirits</Divider>);
    for (let i = 0; i < actionsBySection.spirit.length; i += 1) {
      const action = actionsBySection.spirit[i];
      menuItems.push(
        <MenuItem value={action.full} key={`action-${uuidv4()}`}>
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
            <Stack direction="row" spacing={2} alignItems="center">
              <img
                src={`${process.env.PUBLIC_URL}/assets/logosactions/${action.image}.png`}
                alt={action.name}
              />
              <Typography>{action.full}</Typography>
            </Stack>
          </Tooltip>
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
            <Stack direction="row" spacing={2} alignItems="center">
              <img
                src={`${process.env.PUBLIC_URL}/assets/logosactions/${action.image}.png`}
                alt={action.name}
              />
              <Typography>{action.full}</Typography>
            </Stack>
          </Tooltip>
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
            <Stack direction="row" spacing={2} alignItems="center">
              <img
                src={`${process.env.PUBLIC_URL}/assets/logosactions/${action.image}.png`}
                alt={action.name}
              />
              <Typography>{action.full}</Typography>
            </Stack>
          </Tooltip>
        </MenuItem>,
      );
    }

    menuItems.push(<Divider textAlign="left" key={`action-${uuidv4()}`}>Other Actions</Divider>);
    for (let i = 0; i < actionsBySection.otherAction.length; i += 1) {
      const action = actionsBySection.otherAction[i];
      menuItems.push(
        <MenuItem value={action.full} key={`action-${uuidv4()}`}>
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
            <Stack direction="row" spacing={2} alignItems="center">
              <img
                src={`${process.env.PUBLIC_URL}/assets/logosactions/${action.image}.png`}
                alt={action.name}
              />
              <Typography>{action.full}</Typography>
            </Stack>
          </Tooltip>
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
                <Tooltip
                  arrow
                  placement="top"
                  disableInteractive
                  enterDelay={500}
                  title={(
                    <EurekaLogosActionInformationTooltipComponent
                      logosAction={action.full}
                      actionData={action}
                    />
                  )}
                >
                  <Stack>
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/logosactions/${action.image}.png`}
                      width={64}
                      height={64}
                      alt={action.name}
                    />
                    <Typography variant="caption">{action.short}</Typography>
                  </Stack>
                </Tooltip>
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
                <Tooltip
                  arrow
                  placement="top"
                  enterDelay={500}
                  title={(
                    <EurekaLogosActionInformationTooltipComponent
                      logosAction={action.full}
                      actionData={action}
                    />
                  )}
                >
                  <Stack>
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/logosactions/${action.image}.png`}
                      width={64}
                      height={64}
                      alt={action.name}
                    />
                    <Typography variant="caption">{action.short}</Typography>
                  </Stack>
                </Tooltip>
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
