import { useContext, useMemo, useState } from 'react';

import { Typography } from '@mui/material';

import { DraggableComponent } from '..';
import { SchematicContext } from '../../contexts';
import { useBoolean, useGlobalRefMap } from '../../hooks';
import { formatLabel } from '../../util';

export function Label({
  owner,
  id,
  schematicRef,
  position,
  updatePosition,
  name,
  value,
  unit,
  onDoubleClick,
  isNameHidden,
  isValueHidden,
  ...rest
}) {
  const refMap = useGlobalRefMap(id);

  const { data: schematic } = useContext(SchematicContext);
  const [startSchematic, setStartSchematic] = useState(schematic);

  const isDragging = useBoolean(false);

  const formattedLabel = useMemo(() => {
    let labelArgs = { name, value, unit };

    if (isNameHidden) {
      labelArgs = { ...labelArgs, name: '' };
    }

    if (isValueHidden) {
      labelArgs = { ...labelArgs, value: '', unit: '' };
    }

    return formatLabel(labelArgs);
  }, [isNameHidden, isValueHidden, name, value, unit]);

  const handlers = {
    onStart: () => {
      isDragging.on();
      setStartSchematic(schematic);
    },

    onDrag: (_e, { x, y }) => {
      updatePosition(owner, { x, y }, null, true);
    },

    onStop: (_e, { x, y }) => {
      isDragging.off();
      updatePosition(owner, { x, y }, startSchematic, true);
    },
  };

  return (
    <DraggableComponent position={position} {...handlers} {...rest}>
      <Typography
        onDoubleClick={onDoubleClick}
        ref={refMap.get(id)}
        sx={{
          cursor: isDragging.value ? 'grabbing' : 'grab',
          fontWeight: 'bold',
          padding: '5px',
          pointerEvents: 'auto',
          whiteSpace: 'nowrap',
        }}
      >
        {formattedLabel}
      </Typography>
    </DraggableComponent>
  );
}
