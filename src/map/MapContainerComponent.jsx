/**
 * A container for a Canvas-based map component.
 *
 * Should load data from json. Can have custom filter/show components based on Eureka/Bozja.
 * Will end up being used by:
 * - New map component for Anemos/Pago/Pyros/Hydatos/Bozja/Zadnor
 * - Replacement component for /portals
 * - Mini component for forecast maps
 */

/**
 * Current TODO
 * clicks outside of entities should make the overlay box not visible
 * overlay box needs design
 * all click listeners should also have touch listeners for mobile
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
  Image, Layer, Stage,
} from 'react-konva';
import useImage from 'use-image';
import MapOptionsMenuComponent from './MapOptionsMenuComponent';
import MapItemInfoContainerComponent from './MapItemInfoContainerComponent';
import MapIconComponent from './MapIconComponent';

export default function MapContainerComponent() {
  // Map data
  /* eslint-disable global-require */
  const maps = {
    anemos: {
      name: 'Eureka Anemos',
      scale: 50.101,
      baseOptions: {},
    },
    pagos: {
      name: 'Eureka Pagos',
      scale: 50.101,
      baseOptions: {},
    },
    pyros: {
      name: 'Eureka Pyros',
      scale: 50.101,
      data: require('./lib/pyros-coordinates.json'),
      baseOptions: {
        aetherytes: true,
      },
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
        nms: true,
        mobPacks: false,
      },
    },
    baldesionarsenal: {
      name: 'The Baldesion Arsenal',
      scale: 50.101,
      baseOptions: {},
    },
    bozjansouthernfront: {
      name: 'The Bozjan Southern Front',
      scale: 50.101,
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

  const updateOptions = useCallback((newOptions) => {
    setOptions(newOptions);
  }, [setOptions]);

  const handleInfoboxCloseButton = useCallback(() => {
    setTextVisible(false);
  }, [setTextVisible]);

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
    // setCursorX((pointerPosition.x / maps[currentMap].scale) + 1);
    // setCursorY((pointerPosition.y / maps[currentMap].scale) + 1);
  }, [setCursorX, setCursorY, currentMap]);

  /**
   *
   */
  const handleEntityClick = useCallback((e) => {
    // TODO: This should pop up a box with information on the entity.
    // Make sure that enough data is passed through to be able to be able to identify
    // the entity in json.

    setTextVisible(true);

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

  const addObjectsToDisplay = () => {
    const keys = Object.keys(options);
    const objectsToReturn = [];
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (options[key]) {
        // Add these to the output array
        if (maps[currentMap].data) {
          const objectData = maps[currentMap].data[key];
          for (let j = 0; j < objectData.entities.length; j += 1) {
            objectsToReturn.push(<MapIconComponent
              entity={objectData.entities[j]}
              objectName={objectData.name}
              shouldDisplayText={objectData.shouldDisplayText}
              markerType={objectData.markerType}
              type={key}
              mapScale={maps[currentMap].scale}
              stageScale={stageScale}
              handleEntityClick={handleEntityClick}
            />);
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

  console.log('redraw', new Date());

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
        handleCloseButton={handleInfoboxCloseButton}
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
