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
      <ContextMenu id={id} {...contextMenu} />
      <PropertiesMenu
        id={id}
        label={label}
        properties={properties}
        menu={propertiesMenu}
      />

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
          transform: `rotate(${position?.angle ?? 0}deg)`,
          filter: isSelected && `drop-shadow(3px 2px 0px #888)`,
          '&:hover': {
            transform: `scale(1.05) rotate(${position?.angle ?? 0}deg)`,
          },
        }}
      />

      {ports?.map((port) => {
        return (
          <Port
            key={port.id}
            bounds={{ width: width ?? 100, height: height ?? 100 }}
            rotation={position?.angle ?? 0}
            {...port}
            {...rest}
          />
        );
      })}

      {label && (
        <Label
          key={label.id}
          owner={id}
          canvasRef={canvasRef}
          updatePosition={updatePosition}
          onDoubleClick={() => propertiesMenu.openTab(1)}
          {...label}
        />
      )}
    </DraggableComponent>
  );
}
