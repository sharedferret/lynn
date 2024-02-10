import React, { useState, useCallback } from 'react';
import {
  Box, Button, Stack, TextField, Typography,
} from '@mui/material';
import DRSRunCreatorSingleHolsterComponent from './DRSRunCreatorSingleHolsterComponent';
import DRSHolsterHelper from '../lib/DRSHolsterHelper';

export default function DRSRunHolsterCreatorComponent() {
  const [runName, setRunName] = useState('Learning');
  const [runOwner, setRunOwner] = useState(null);
  const [runJson, setRunJson] = useState(null);
  const [mappingJson, setMappingJson] = useState(null);

  const [holsters, setHolsters] = useState(
    [
      {
        tag: null,
        name: null,
        role: 'none',
        icon: 'None',
        explanation: null,
        pre: null,
        main: null,
        link: null,
      },
    ],
  );

  const updateRunName = useCallback((event) => {
    setRunName(event.target.value);
  }, [setRunName]);

  const updateRunOwner = useCallback((event) => {
    setRunOwner(event.target.value);
  }, [setRunOwner]);

  const updateHolster = useCallback((index, newHolster) => {
    const newHolsters = [...holsters];
    newHolsters[index] = newHolster;
    setHolsters(newHolsters);
  }, [holsters, setHolsters]);

  const addHolster = (() => {
    const newHolsters = [...holsters];
    newHolsters.push({
      tag: null,
      name: null,
      role: 'none',
      icon: 'None',
      explanation: null,
      pre: null,
      main: null,
      link: null,
    });
    setHolsters(newHolsters);
  });

  const deleteHolster = useCallback((index) => {
    const newHolsters = [...holsters];
    newHolsters.splice(index, 1);
    setHolsters(newHolsters);
  }, [holsters, setHolsters]);

  const generateHolsterJson = useCallback(() => {
    const outputHolsters = {};
    const outputHolsterMapping = {
      tank: {
        name: 'Tank',
        holsters: [],
      },
      healer: {
        name: 'Healer',
        holsters: [],
      },
      melee: {
        name: 'Melee',
        holsters: [],
      },
      caster: {
        name: 'Caster',
        holsters: [],
      },
      ranged: {
        name: 'Physical Ranged',
        holsters: [],
      },
    };

    for (let i = 0; i < holsters.length; i += 1) {
      const currentHolster = holsters[i];
      const currentHolsterTag = currentHolster.tag;
      const encodedHolsterUrl = new URL(currentHolster.link).pathname.split('/');
      const encodedHolsterString = encodedHolsterUrl[encodedHolsterUrl.length - 1];
      const decodedHolsters = DRSHolsterHelper.decodeHolster(encodedHolsterString);
      outputHolsters[currentHolsterTag] = {
        name: currentHolster.name,
        role: currentHolster.role,
        icon: currentHolster.icon,
        explanation: currentHolster.explanation,
        pre: decodedHolsters.prepop,
        main: decodedHolsters.main,
      };
      outputHolsterMapping[currentHolster.role.toLowerCase()].holsters.push(currentHolsterTag);
    }

    const output = {
      name: runName,
      owner: runOwner,
      holsters: outputHolsters,
    };

    const mappingOutput = {
      name: runName,
      owner: runOwner,
      roles: outputHolsterMapping,
    };
    setRunJson(`\`\`\`json\n${JSON.stringify(output, null, 2)}\n\`\`\``);
    setMappingJson(`\`\`\`json\n${JSON.stringify(mappingOutput, null, 2)}\n\`\`\``);
  }, [runName, runOwner, holsters, setRunJson, setMappingJson]);

  return (
    <Box
      component="main"
      margin="auto"
      sx={{ flexGrow: 1, pt: { xs: 14, md: 5 } }}
      pl={5}
    >
      <Stack spacing={2} alignItems="center" width={600}>
        <Typography variant="h4" fontWeight={700}>DRS Run Holster Creator</Typography>
        <Typography textAlign="left">
          This tool creates the JSON required to add a new run&apos;s holsters to the
          DRS Holsters section of the site. Any DRS host can add their holsters to the site.
        </Typography>
        <Typography textAlign="left">
          Use the
          {' '}
          <a
            href="/drs/holster/c"
            target="_blank"
            rel="noreferrer"
          >
            Holster Creator
          </a>
          {' '}
          to create a bag for each holster. On the Holster Creator
          page, click &quot;Create Link&quot;, then copy that URL into the &quot;Custom Holster
          Link&quot; field.
        </Typography>
        <Typography textAlign="left">
          After creating your holsters, click Generate Holster JSON. Send both fields to
          @lynnkaneko on Discord for them to be added to the site.  In order to edit holsters, use
          this tool to re-create the holsters you&apos;d like to change, and send the changes
          to Lynn.
        </Typography>
        <Box minWidth={600} maxWidth={1600} minHeight={600} pt={2}>
          <Stack alignItems="flex-start" spacing={2} width={600}>
            <TextField
              required
              id="run-name"
              label="Run Name"
              defaultValue="Learning"
              onChange={updateRunName}
              fullWidth
              helperText="This name identifies what type of run these holsters are for."
            />
            <TextField
              required
              id="run-owner"
              label="Host"
              onChange={updateRunOwner}
              fullWidth
              helperText="The person hosting this DRS run."
            />
            {
              holsters.map((i, index) => (
                <Box width={600} alignSelf="center" pt={2}>
                  <DRSRunCreatorSingleHolsterComponent
                    holster={i}
                    index={index}
                    updateHolster={updateHolster}
                    deleteHolster={deleteHolster}
                  />
                </Box>
              ))
            }
            <Button variant="outlined" onClick={addHolster} pt={2}>Add Holster</Button>
            <Button variant="outlined" onClick={generateHolsterJson} pt={2}>Generate Holster JSON</Button>
            {
              runJson
                ? (
                  <Box width={600}>
                    <Stack>
                      <Typography pt={2}>Add to Holsters.json</Typography>
                      <TextField
                        multiline
                        rows={12}
                        value={runJson}
                        width={600}
                        fullWidth
                      />
                      <Typography pt={2}>Add to HolsterMapping.json</Typography>
                      <TextField
                        multiline
                        rows={12}
                        value={mappingJson}
                        width={600}
                        fullWidth
                      />
                    </Stack>
                  </Box>
                )
                : null
            }
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
