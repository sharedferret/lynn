import React, { useCallback } from 'react';

import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import DRSLostActionHelper from '../lib/DRSLostActionHelper';

export default function DRSRunCreatorSingleHolsterComponent({
  holster, index, updateHolster, deleteHolster,
}) {
  const roles = [
    'none',
    'tank',
    'healer',
    'caster',
    'melee',
    'ranged',
  ];

  const lostActions = DRSLostActionHelper.getLostActions();
  const lostActionKeys = Object.keys(lostActions);
  const images = [];
  images.push('None', 'Tank', 'Healer', 'Caster', 'Melee', 'Ranged');
  for (let i = 0; i < lostActionKeys.length; i += 1) {
    images.push(lostActions[lostActionKeys[i]].image);
  }

  const updateTag = useCallback((event) => {
    updateHolster(index, {
      tag: event.target.value,
      name: holster.name,
      role: holster.role,
      icon: holster.icon,
      explanation: holster.explanation,
      pre: holster.pre,
      main: holster.main,
      link: holster.link,
    });
  }, [holster, index, updateHolster]);

  const updateName = useCallback((event) => {
    updateHolster(index, {
      tag: holster.tag,
      name: event.target.value,
      role: holster.role,
      icon: holster.icon,
      explanation: holster.explanation,
      pre: holster.pre,
      main: holster.main,
      link: holster.link,
    });
  }, [holster, index, updateHolster]);

  const updateRole = useCallback((event) => {
    updateHolster(index, {
      tag: holster.tag,
      name: holster.name,
      role: event.target.value,
      icon: holster.icon,
      explanation: holster.explanation,
      pre: holster.pre,
      main: holster.main,
      link: holster.link,
    });
  }, [holster, index, updateHolster]);

  const updateIcon = useCallback((event) => {
    updateHolster(index, {
      tag: holster.tag,
      name: holster.name,
      role: holster.role,
      icon: event.target.value,
      explanation: holster.explanation,
      pre: holster.pre,
      main: holster.main,
      link: holster.link,
    });
  }, [holster, index, updateHolster]);

  const updateExplanation = useCallback((event) => {
    updateHolster(index, {
      tag: holster.tag,
      name: holster.name,
      role: holster.role,
      icon: holster.icon,
      explanation: event.target.value,
      pre: holster.pre,
      main: holster.main,
      link: holster.link,
    });
  }, [holster, index, updateHolster]);

  const updateHolsterLink = useCallback((event) => {
    updateHolster(index, {
      tag: holster.tag,
      name: holster.name,
      role: holster.role,
      icon: holster.icon,
      explanation: holster.explanation,
      pre: holster.pre,
      main: holster.main,
      link: event.target.value,
    });
  }, [holster, index, updateHolster]);

  return (
    <Paper alignSelf="center" elevation={3}>
      <Stack alignItems="flex-start" spacing={2} width={600} p={2}>
        <Stack direction="row" width="100%">
          <Typography variant="h6">
            Holster
            {' '}
            {index + 1}
          </Typography>
          <Box ml="auto" />
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => { deleteHolster(index); }}
          >
            Remove Holster
          </Button>
        </Stack>
        <TextField
          required
          id={`holster-tag-${index}`}
          label="Holster Tag"
          value={holster.tag}
          fullWidth
          helperText="A unique tag for this holster, containing only lowercase letters and dashes. This will be the URL of the holster after the host's name and run type (e.g. /lynn/anyprog/main-tank)."
          onChange={updateTag}
        />
        <TextField
          required
          id={`holster-name-${index}`}
          label="Holster Name"
          value={holster.name}
          fullWidth
          helperText="The name for this specific holster. This name will be displayed on the Holster page."
          onChange={updateName}
        />
        <FormControl fullWidth>
          <Select
            width={500}
            label="Role"
            id={`holster-role-${index}`}
            value={holster.role}
            onChange={updateRole}
            fullWidth
          >
            {
              roles.map((i) => (
                <MenuItem value={i}>
                  <Stack direction="row" spacing={2}>
                    <Avatar sx={{ width: 24, height: 24 }} variant="rounded" src={`${process.env.PUBLIC_URL}/assets/lostactions/${i}.jpg`} />
                    <Typography>{i}</Typography>
                  </Stack>
                </MenuItem>
              ))
            }
          </Select>
          <FormHelperText>The role for this holster.</FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <Select
            width={500}
            label="Icon"
            id={`holster-icon-${index}`}
            value={holster.icon}
            onChange={updateIcon}
            fullWidth
          >
            {
              images.map((i) => (
                <MenuItem value={i}>
                  <Stack direction="row" spacing={2}>
                    <Avatar sx={{ width: 24, height: 24 }} variant="rounded" src={`${process.env.PUBLIC_URL}/assets/lostactions/${i}.jpg`} />
                    <Typography>{i}</Typography>
                  </Stack>
                </MenuItem>
              ))
            }
          </Select>
          <FormHelperText>
            The icon for this holster, displayed in the selection menu.
          </FormHelperText>
        </FormControl>
        <TextField
          id={`holster-explanation-${index}`}
          label="Explanation"
          helperText="An explanation on how to use this holster. Can include instructions on when and how to use specific actions, and which actions to swap out if necessary."
          value={holster.explanation}
          onChange={updateExplanation}
          fullWidth
          multiline
          rows={5}
        />
        <TextField
          id={`holster-link-${index}`}
          label="Custom Holster Link"
          helperText="A link to the holster you'd like to use, from the Holster Creator."
          value={holster.link}
          onChange={updateHolsterLink}
          fullWidth
        />
      </Stack>
    </Paper>
  );
}
