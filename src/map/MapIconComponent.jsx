/**
 * Displays a single icon and optional text on the map.
 */

import React from 'react';
import {
  Circle,
  Group,
  Image,
  Line,
  Text,
} from 'react-konva';
import useImage from 'use-image';

export default function MapIconComponent({
  entity,
  objectName,
  shouldDisplayText,
  markerType,
  type,
  mapScale,
  stageScale,
  handleEntityClick,
}) {
  const imagesForType = {
    elementals: useImage(`${process.env.PUBLIC_URL}/assets/maps/icons/elemental.png`)[0],
    aetherytes: useImage(`${process.env.PUBLIC_URL}/assets/maps/icons/aetheryte.png`)[0],
    bunnyCoffers: useImage(`${process.env.PUBLIC_URL}/assets/maps/icons/bunny-coffer.png`)[0],
    quests: useImage(`${process.env.PUBLIC_URL}/assets/maps/icons/quest.png`)[0],
    portals: useImage(`${process.env.PUBLIC_URL}/assets/maps/icons/portal.png`)[0],
    nms: useImage(`${process.env.PUBLIC_URL}/assets/maps/icons/nm.png`)[0],
    lightning: useImage(`${process.env.PUBLIC_URL}/assets/maps/icons/lightning.png`)[0],
    default: useImage(`${process.env.PUBLIC_URL}/assets/maps/icons/circle-64.png`)[0],
  };

  const createIconMarker = (imageToAdd) => (
    <Image
      image={imageToAdd}
      scaleX={0.5}
      scaleY={0.5}
      onClick={handleEntityClick}
    />
  );

  const createCircleMarker = () => (
    <Circle
      x={0}
      y={0}
      radius={64}
      fill="#8AC7DB"
      opacity={0.4}
      stroke="white"
      strokeWidth={2}
      dash={[5, 5]}
      dashEnabled
    />
  );

  const createPolyMarker = (pointArray) => (
    <Line
      points={pointArray.map((i) => i * 50.101)}
      fill="#CF9FFF"
      stroke="white"
      tension={0.5}
      opacity={0.4}
      strokeWidth={3}
      dash={[5, 5]}
      dashEnabled
      closed
    />
  );

  let markerToAdd;
  let mapRelativeMarkerToAdd;

  switch (markerType) {
    case 'poly':
      markerToAdd = createIconMarker(imagesForType[entity.element]);
      mapRelativeMarkerToAdd = createPolyMarker(entity.pointArray);
      break;
    case 'iconWithCircle':
      markerToAdd = createIconMarker(imagesForType[type]);
      mapRelativeMarkerToAdd = createCircleMarker();
      break;
    case 'icon':
    default:
      markerToAdd = createIconMarker(imagesForType[type]);
  }

  let text = objectName;
  if (entity.displayName) {
    text = entity.displayName;
  } else if (entity.name) {
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
      x={((entity.coordinates.x - 1) * mapScale) - (16 / stageScale)}
      y={((entity.coordinates.y - 1) * mapScale) - (16 / stageScale)}
      entity={entity}
      entityType={type}
    >
      {markerToAdd}
      {stageScale > 0.7 && shouldDisplayText ? textToAdd : null}
    </Group>
  );

  const mapRelativeGroupToAdd = (
    <Group
      x={(entity.coordinates.x - 1) * mapScale}
      y={(entity.coordinates.y - 1) * mapScale}
      onClick={handleEntityClick}
      entity={entity}
      entityType={type}
    >
      {mapRelativeMarkerToAdd}
    </Group>
  );

  return [mapRelativeGroupToAdd, groupToAdd];
}
