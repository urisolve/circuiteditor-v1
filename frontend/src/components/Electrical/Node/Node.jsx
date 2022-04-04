import { useContext, useState } from 'react';

import { ConnectionPoint, DraggableComponent, Label } from '..';
import { useContextMenu, usePropertiesMenu } from '../../../hooks';
import { SchematicContext } from '../../../contexts';
import { ContextMenu, PropertiesMenu } from '../../UI';

export function Node({
  id,
  position,
  label,
  properties,
  gridSize,
  updatePosition,
  isSelected,
  canvasRef,
  ...rest
}) {
  const schematic = useContext(SchematicContext);
  const [startSch, setStartSch] = useState(schematic);

  const contextMenu = useContextMenu();
  const propertiesMenu = usePropertiesMenu();

  return (
    <DraggableComponent
      handle='.node-handle'
      position={position}
      onStart={() => setStartSch(schematic)}
      onDrag={(_e, { x, y }) => updatePosition(id, { x, y })}
      onStop={(_e, { x, y }) => updatePosition(id, { x, y }, startSch.data)}
      {...rest}
    >
      <ConnectionPoint
        id={id}
        className='node-handle'
        onContextMenu={contextMenu.open}
        onDoubleClick={() => propertiesMenu.openTab(0)}
        sx={{
          width: (properties?.radius ?? 5) * 2,
          height: (properties?.radius ?? 5) * 2,
          backgroundColor: isSelected ? '#3475FF' : '#6495ED',
        }}
      />

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
        contextKey='nodes'
        id={id}
        label={label}
        properties={properties}
        menu={propertiesMenu}
      />
    </DraggableComponent>
  );
}
