/**
 * Displays a single icon and optional text on the map.
 */

import React from 'react';
import {
  Circle,
  Group,
  Image,
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
  const getImageForType = (entityType) => {
    switch (entityType) {
      case 'elementals':
        return useImage(`${process.env.PUBLIC_URL}/assets/maps/icons/elemental.png`);
      case 'aetherytes':
        return useImage(`${process.env.PUBLIC_URL}/assets/maps/icons/aetheryte.png`);
      case 'bunnyCoffers':
        return useImage(`${process.env.PUBLIC_URL}/assets/maps/icons/bunny-coffer.png`);
      case 'quests':
        return useImage(`${process.env.PUBLIC_URL}/assets/maps/icons/quest.png`);
      case 'portals':
        return useImage(`${process.env.PUBLIC_URL}/assets/maps/icons/portal.png`);
      case 'nms':
        return useImage(`${process.env.PUBLIC_URL}/assets/maps/icons/nm.png`);
      default:
        return useImage(`${process.env.PUBLIC_URL}/assets/maps/icons/circle-64.png`);
    }
  };

  const createIconMarker = (imageToAdd) => (
    <Image
      image={imageToAdd}
      scaleX={0.5}
      scaleY={0.5}
    />
  );

  const createCircleMarker = () => (
    <Circle
      x={0}
      y={0}
      radius={40}
      fill="#8AC7DB"
      opacity={0.4}
      stroke="white"
      strokeWidth={2}
      dash={[10, 5]}
      dashEnabled
    />
  );

  const [imageToAdd] = getImageForType(type);

  let markerToAdd;
  let mapRelativeMarkerToAdd;

  switch (markerType) {
    case 'iconWithCircle':
      markerToAdd = createIconMarker(imageToAdd);
      mapRelativeMarkerToAdd = createCircleMarker();
      break;
    case 'icon':
    default:
      markerToAdd = createIconMarker(imageToAdd);
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
      onClick={handleEntityClick}
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
