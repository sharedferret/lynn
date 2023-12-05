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
import { Box, Typography } from '@mui/material';
import {
  Circle, Image, Layer, Stage,
} from 'react-konva';
import useImage from 'use-image';

export default function MapContainerComponent() {
  const [stageScale, setStageScale] = useState(1);
  const [stageX, setStageX] = useState(0);
  const [stageY, setStageY] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(1000);
  const [canvasWidth, setCanvasWidth] = useState(1000);

  // please tell me this isn't how to do it
  const [textVisible, setTextVisible] = useState(false);
  const [textX, setTextX] = useState(0);
  const [textY, setTextY] = useState(0);

  const ref = useRef(null);

  const [image] = useImage(`${process.env.PUBLIC_URL}/assets/maps/hydatos.jpg`);

  const handleScrollWheel = useCallback((e) => {
    /**
     * TODO:
     * See if you can invert scrolling
     * See if you can get smooth scrolling
     */

    e.evt.preventDefault();

    // Disable popover if active
    setTextVisible(false);

    const scaleBy = 1.05;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };

    const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    // Set bounds on zooming to 0.25x to 2.00x
    if (newScale >= 0.25 && newScale <= 2.0) {
      setStageScale(newScale);
      setStageX(-(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale);
      setStageY(-(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale);
    }
  }, [setStageScale, setStageX, setStageY, setTextVisible]);

  /**
   * To do in order:
   * 1. make this box display the way you want it.
   * 2. make a json file with dummy data to load it.
   * 3. add different maps/zones.
   * 4. add filtering.
   */
  const testBox = (
    <Box
      position="absolute"
      top={textY - 25}
      left={textX + 25}
      width="300px"
      height="100px"
      bgcolor="white"
      opacity={0.9}
      display={textVisible ? 'block' : 'none'}
      borderRadius="12px"
      boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2)"
    >
      <Typography>Ceto</Typography>
    </Box>
  );

  const handleCircleClick = useCallback((e) => {
    setTextVisible(!textVisible);

    const stage = e.target.getStage();
    setTextX(stage.getPointerPosition().x + ref.current.getBoundingClientRect().x);
    setTextY(stage.getPointerPosition().y);
  }, [setTextVisible, textVisible, setTextX, setTextY]);

  const handleDragStart = useCallback(() => {
    setTextVisible(false);
  }, [setTextVisible]);

  useEffect(() => {
    function handleResize() {
      setCanvasHeight(ref.current.clientHeight);
      setCanvasWidth(ref.current.clientWidth);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [setCanvasHeight, setCanvasWidth]);

  return (
    <Box minWidth="100%" height="100vh" ref={ref}>
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
      >
        <Layer>
          <Image image={image} />
          <Circle
            x={1750}
            y={625}
            radius={10}
            fill="green"
            shadowBlur={5}
            onClick={handleCircleClick}
          />
        </Layer>
      </Stage>
      {testBox}
    </Box>
  );
}
