import { useMemo } from 'react';

import {
  ContextMenu,
  PropertiesMenu,
  ConnectionPoint,
  DraggableComponent,
  Label,
} from '..';
import {
  useBoolean,
  useContextMenu,
  useDoubleTap,
  usePropertiesMenu,
} from '../../hooks';
import { shadeColor } from '../../util';
import { constants } from '../../constants';
import { DraggableType } from '../../enums';

export function Node({
  id,
  connections,
  position,
  label,
  properties,
  updatePosition,
  isSelected,
  schematicRef,
  selectedItems,
  ...rest
}) {
  const contextMenu = useContextMenu();
  const propertiesMenu = usePropertiesMenu();

  const holdHandlers = useDoubleTap(contextMenu.open);
  const isDragging = useBoolean(false);

  const isDangling = useMemo(
    () => connections?.length <= 1,
    [connections?.length],
  );

  const color = useMemo(() => {
    let color = properties?.color;

    if (isDangling) {
      color = constants.ERROR_COLOR;
    }

    if (isSelected) {
      color = shadeColor(color, -40);
    }

    return color;
  }, [isDangling, isSelected, properties?.color]);

  return (
    <DraggableComponent
      handle='.handle'
      id={id}
      onStart={isDragging.on}
      onStop={isDragging.off}
      position={position}
      selectedItems={selectedItems}
      type={DraggableType.ITEM}
      {...rest}
    >
      <ConnectionPoint
        className='handle'
        id={id}
        isDragging={isDragging.value}
        {...holdHandlers}
        onContextMenu={contextMenu.open}
        onDoubleClick={() => propertiesMenu.openTab(0)}
        sx={{
          borderRadius: '50%',
          pointerEvents: 'auto',
          backgroundColor: color,

          position: 'relative',
          left: -properties?.radius,
          top: -properties?.radius,
          height: properties?.radius * 2,
          width: properties?.radius * 2,
        }}
      />

      {!isDangling && label && (
        <Label
          schematicRef={schematicRef}
          onDoubleClick={() => propertiesMenu.openTab(1)}
          {...label}
        />
      )}

      <ContextMenu
        id={id}
        openProperties={() => propertiesMenu.openTab(0)}
        {...contextMenu}
      />

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
