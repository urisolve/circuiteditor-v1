import { useContext, useState } from 'react';

import { Avatar } from '@mui/material';

import { DraggableComponent, Label, Port } from '..';
import {
  useContextMenu,
  useGlobalRefMap,
  usePropertiesMenu,
} from '../../../hooks';
import { SchematicContext } from '../../../contexts';
import { symbols } from '../../../configs';
import { ContextMenu, PropertiesMenu } from '../../UI';

export function Component({
  canvasRef,
  id,
  type,
  fullName,
  position,
  ports,
  label,
  properties,
  width,
  height,
  updatePosition,
  isSelected,
  ...rest
}) {
  const refMap = useGlobalRefMap(id);

  const schematic = useContext(SchematicContext);
  const [startSch, setStartSch] = useState(schematic);

  const contextMenu = useContextMenu();
  const propertiesMenu = usePropertiesMenu();

  const rotationTransform = `rotate(${position?.angle ?? 0}deg)`;

  return (
    <DraggableComponent
      handle='.component-handle'
      position={position}
      positionOffset={{ x: 5, y: 5 }}
      onStart={() => setStartSch(schematic)}
      onDrag={(_e, { x, y }) => updatePosition(id, { x, y })}
      onStop={(_e, { x, y }) => updatePosition(id, { x, y }, startSch.data)}
      {...rest}
    >
      <Avatar
        ref={refMap.set(id)}
        src={symbols[fullName]}
        alt={type}
        variant='square'
        className='component-handle'
        onContextMenu={contextMenu.open}
        onDoubleClick={() => propertiesMenu.openTab(0)}
        sx={{
          width: width ?? 100,
          height: height ?? 100,
          filter: isSelected && `drop-shadow(3px 2px 0px #888)`,

          transform: rotationTransform,
          '&:hover': {
            transform: `${rotationTransform} scale(${
              process.env.REACT_APP_SCHEMATIC_HOVER_SCALE ?? 1
            })`,
          },
        }}
      />

      {ports?.map((port) => {
        return (
          <Port
            key={port.id}
            bounds={{ width: width ?? 100, height: height ?? 100 }}
            compRotation={position?.angle ?? 0}
            {...port}
            {...rest}
          />
        );
      })}

      {label && (
        <Label
          owner={id}
          canvasRef={canvasRef}
          updatePosition={updatePosition}
          onDoubleClick={() => propertiesMenu.openTab(1)}
          {...label}
        />
      )}

      <ContextMenu id={id} {...contextMenu} />
      <PropertiesMenu
        id={id}
        label={label}
        properties={properties}
        menu={propertiesMenu}
      />
    </DraggableComponent>
  );
}
