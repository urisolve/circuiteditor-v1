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
  useContextMenu,
  useGlobalRefMap,
  usePropertiesMenu,
} from '../../hooks';
import { SchematicContext } from '../../contexts';
import { symbols } from '../../assets/electrical';
import { constants } from '../../constants';

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
        ref={refMap.get(id)}
        src={symbols[type]}
        alt={type}
        variant='square'
        className='component-handle'
        onContextMenu={contextMenu.open}
        onDoubleClick={() => propertiesMenu.openTab(0)}
        sx={{
          width: width ?? 100,
          height: height ?? 100,
          filter: isSelected && `drop-shadow(3px 2px 0px #888)`,
          pointerEvents: 'auto',

          transform: rotationTransform,
          '&:hover': {
            transform: `${rotationTransform} scale(${constants.SCHEMATIC_HOVER_SCALE})`,
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
