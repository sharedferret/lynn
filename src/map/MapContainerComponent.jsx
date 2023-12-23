/**
 * A container for a Canvas-based map component.
 *
 * Should load data from json. Can have custom filter/show components based on Eureka/Bozja.
 * Will end up being used by:
 * - New map component for Anemos/Pago/Pyros/Hydatos/Bozja/Zadnor
 * - Replacement component for /portals
 * - Mini component for forecast maps
 */

import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Group, Image, Layer, Stage, Text,
} from 'react-konva';
import useImage from 'use-image';
import MapOptionsMenuComponent from './MapOptionsMenuComponent';
import MapItemInfoContainerComponent from './MapItemInfoContainerComponent';

export default function MapContainerComponent() {
  // Map data
  /* eslint-disable global-require */
  const maps = {
    anemos: {
      name: 'Eureka Anemos',
      scale: 1,
      baseOptions: {},
    },
    pagos: {
      name: 'Eureka Pagos',
      scale: 1,
      baseOptions: {},
    },
    pyros: {
      name: 'Eureka Pyros',
      scale: 1,
      baseOptions: {},
    },
    hydatos: {
      name: 'Eureka Hydatos',
      scale: 50.101,
      data: require('./lib/hydatos-coordinates.json'),
      baseOptions: {
        elementals: false,
        aetherytes: true,
        bunnyCoffers: false,
        quests: true,
        portals: false,
      },
    },
    ba: {
      name: 'The Baldesion Arsenal',
      scale: 1,
      baseOptions: {},
    },
    bsf: {
      name: 'The Bozjan Southern Front',
      scale: 1,
      baseOptions: {},
    },
    zadnor: {
      name: 'Zadnor',
      scale: 1,
      baseOptions: {},
    },
  };

  // Canvas state
  const [stageScale, setStageScale] = useState(1);
  const [stageX, setStageX] = useState(0);
  const [stageY, setStageY] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(1000);
  const [canvasWidth, setCanvasWidth] = useState(1000);

  // Map state
  const [currentMap, setCurrentMap] = useState('hydatos');

  // Label tooltip state
  // please tell me this isn't how to do it
  const [textVisible, setTextVisible] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [textX, setTextX] = useState(0);
  const [textY, setTextY] = useState(0);

  // Cursor state
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);

  // Current display options
  const [options, setOptions] = useState(maps.hydatos.baseOptions);

  // Ref for canvas
  const ref = useRef(null);
  const theme = useTheme();

  // Map image to display
  const [image] = useImage(`${process.env.PUBLIC_URL}/assets/maps/${currentMap}.jpg`);

  // screaming
  const [elementalImage] = useImage(`${process.env.PUBLIC_URL}/assets/maps/icons/elemental.png`);
  const [aetheryteImage] = useImage(`${process.env.PUBLIC_URL}/assets/maps/icons/aetheryte.png`);
  const [bunnyCofferImage] = useImage(`${process.env.PUBLIC_URL}/assets/maps/icons/bunny-coffer.png`);
  const [questImage] = useImage(`${process.env.PUBLIC_URL}/assets/maps/icons/quest.png`);
  const [portalImage] = useImage(`${process.env.PUBLIC_URL}/assets/maps/icons/portal.png`);

  const updateOptions = useCallback((newOptions) => {
    setOptions(newOptions);
  }, [setOptions]);

  const handleScrollWheel = useCallback((e) => {
    /**
     * TODO:
     * See if you can get smooth scrolling
     */

    e.evt.preventDefault();

    // Disable popover if active
    setTextVisible(false);

    const scaleBy = 1.02;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };

    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

    // Set bounds on zooming to 0.25x to 2.00x
    if (newScale >= 0.25 && newScale <= 2.0) {
      setStageScale(newScale);
      setStageX((stage.getPointerPosition().x / newScale - mousePointTo.x) * newScale);
      setStageY((stage.getPointerPosition().y / newScale - mousePointTo.y) * newScale);
    }
  }, [setStageScale, setStageX, setStageY, setTextVisible]);

  const handleMapChange = useCallback((e) => {
    if (e.target.value) {
      setCurrentMap(e.target.value);
      setOptions(maps[e.target.value].baseOptions);
    }
  }, [setCurrentMap]);

  const mapSelector = (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Map</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={currentMap}
        label="Map"
        onChange={handleMapChange}
      >
        {Object.keys(maps).map((index) => <MenuItem value={index}>{maps[index].name}</MenuItem>)}
      </Select>
    </FormControl>
  );

  const handleDragStart = useCallback(() => {
    setTextVisible(false);
  }, [setTextVisible]);

  const handleMouseMove = useCallback((e) => {
    const stage = e.target.getStage();
    const pointerPosition = stage.getRelativePointerPosition();
    setCursorX((pointerPosition.x / maps[currentMap].scale) + 1);
    setCursorY((pointerPosition.y / maps[currentMap].scale) + 1);
  }, [setCursorX, setCursorY, currentMap]);

  /**
   *
   */
  const handleEntityClick = useCallback((e) => {
    console.log('entity clicked', e.target.parent.attrs.entity);
    console.log(' - entity type', e.target.parent.attrs.entityType);
    // TODO: This should pop up a box with information on the entity.
    // Make sure that enough data is passed through to be able to be able to identify
    // the entity in json.

    setTextVisible(!textVisible);

    const clickedEntity = e.target.parent.attrs.entity;
    const clickedEntityType = e.target.parent.attrs.entityType;
    clickedEntity.type = {
      type: clickedEntityType,
      prefix: maps[currentMap].data[clickedEntityType].prefix,
      icon: maps[currentMap].data[clickedEntityType].icon,
      name: maps[currentMap].data[clickedEntityType].name,
    };

    const stage = e.target.getStage();
    setTextX(stage.getPointerPosition().x);
    setTextY(stage.getPointerPosition().y);
    setSelectedEntity(clickedEntity);
  }, [setTextX, setTextY, textVisible, setTextVisible, setSelectedEntity]);

  /**
   * TODO: This will need to be made a lot more robust in the future.
   */
  const addObjectsToDisplay = () => {
    const keys = Object.keys(options);
    const objectsToReturn = [];
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (options[key]) {
        // TODO: This would be fixed by making this its own component
        let imageToUse = null;
        if (key === 'elementals') {
          imageToUse = elementalImage;
        } else if (key === 'aetherytes') {
          imageToUse = aetheryteImage;
        } else if (key === 'bunnyCoffers') {
          imageToUse = bunnyCofferImage;
        } else if (key === 'quests') {
          imageToUse = questImage;
        } else if (key === 'portals') {
          imageToUse = portalImage;
        }

        // Add these to the output array
        if (maps[currentMap].data) {
          const objectData = maps[currentMap].data[key];
          for (let j = 0; j < objectData.entities.length; j += 1) {
            const entity = objectData.entities[j];

            const objectToAdd = (
              <Image
                image={imageToUse}
                scaleX={0.5}
                scaleY={0.5}
              />
            );

            let text = objectData.name;
            if (entity.name) {
              text = entity.name;
            }

            const textToAdd = (
              <Text
                text={text}
                fontSize={16}
                x={32}
                y={8}
                stroke="white"
                fill="black"
                strokeWidth={2}
                fillAfterStrokeEnabled
              />
            );

            const groupToAdd = (
              <Group
                scale={{ x: 1 / stageScale, y: 1 / stageScale }}
                x={((entity.coordinates.x - 1) * maps[currentMap].scale) - 16}
                y={((entity.coordinates.y - 1) * maps[currentMap].scale) - 16}
                onClick={handleEntityClick}
                entity={entity}
                entityType={key}
              >
                {objectToAdd}
                {stageScale > 0.7 && objectData.shouldDisplayText ? textToAdd : null}
              </Group>
            );

            objectsToReturn.push(groupToAdd);
          }
        }
      }
    }
    return objectsToReturn;
  };

  useEffect(() => {
    function handleResize() {
      setCanvasHeight(ref.current.clientHeight);
      setCanvasWidth(ref.current.clientWidth);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [setCanvasHeight, setCanvasWidth]);

  /**
   * Primary render
   */
  return (
    <Box minWidth="100%" height="100vh" ref={ref} position="relative">
      <Stage
        width={canvasWidth}
        height={canvasHeight}
        scaleX={stageScale}
        scaleY={stageScale}
        x={stageX}
        y={stageY}
        draggable
        onWheel={handleScrollWheel}
        onDragStart={handleDragStart}
        onPointerMove={handleMouseMove}
      >
        <Layer>
          <Image image={image} />
        </Layer>
        <Layer>
          {addObjectsToDisplay()}
        </Layer>
      </Stage>
      <MapItemInfoContainerComponent
        entity={selectedEntity}
        textX={textX}
        textY={textY}
        textVisible={textVisible}
        theme={theme}
      />
      <Box
        position="absolute"
        top="25px"
        right="25px"
        zIndex={10}
      >
        <Stack
          borderRadius="12px"
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          p={2}
        >
          {mapSelector}
          <Typography>{`${cursorX.toFixed(2)}, ${cursorY.toFixed(2)}`}</Typography>
        </Stack>
      </Box>
      <Box
        position="absolute"
        top="25px"
        left="25px"
        zIndex={10}
      >
        <MapOptionsMenuComponent
          options={options}
          updateOptions={updateOptions}
        />
      </Box>
    </Box>
  );
}
