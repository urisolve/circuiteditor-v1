import { useContext, useState } from 'react';

import { Avatar } from '@mui/material';

import {
  ContextMenu,
  DraggableComponent,
  Label,
  Port,
  PropertiesMenu,
} from '..';
import {
  useBoolean,
  useContextMenu,
  useGlobalRefMap,
  usePropertiesMenu,
} from '../../hooks';
import { SchematicContext } from '../../contexts';
import { symbols } from '../../assets/electrical';

export function Component({
  schematicRef,
  id,
  type,
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

  const isDragging = useBoolean(false);

  const handlers = {
    onDrag: (_e, { x, y }) => {
      updatePosition(id, { x, y });
    },
    onStart: () => {
      isDragging.on();
      setStartSch(schematic);
    },
    onStop: (_e, { x, y }) => {
      isDragging.off();
      updatePosition(id, { x, y }, startSch.data);
    },
  };

  return (
    <DraggableComponent
      handle='.component-handle'
      position={position}
      positionOffset={{ x: 5, y: 5 }}
      {...handlers}
      {...rest}
    >
      <Avatar
        ref={refMap.get(id)}
        src={symbols[type]}
        alt={type}
        variant='square'
        className='component-handle'
        onContextMenu={contextMenu.open}
        onDoubleClick={() => propertiesMenu.openTab(0)}
        sx={{
          cursor: isDragging.value ? 'grabbing' : 'grab',
          filter: isSelected && `drop-shadow(3px 2px 0px #888)`,
          height: height ?? 100,
          pointerEvents: 'auto',
          transform: `rotate(${position?.angle ?? 0}deg)`,
          width: width ?? 100,
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
          schematicRef={schematicRef}
          updatePosition={updatePosition}
          onDoubleClick={() => propertiesMenu.openTab(1)}
          {...label}
        />
      )}

      <ContextMenu id={id} {...contextMenu} />
      <PropertiesMenu
        contextKey='components'
        id={id}
        label={label}
        properties={properties}
        menu={propertiesMenu}
      />
    </DraggableComponent>
  );
}
