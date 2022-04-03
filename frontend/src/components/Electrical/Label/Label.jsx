import { useContext, useMemo, useState } from 'react';

import { Typography } from '@mui/material';

import { DraggableComponent } from '..';
import { SchematicContext } from '../../../contexts';
import { useGlobalRefMap } from '../../../hooks';

export function Label({
  owner,
  canvasRef,
  position,
  gridSize,
  updatePosition,
  name,
  value,
  unit,
  onDoubleClick,
  isHidden,
  ...rest
}) {
  const labelID = useMemo(() => `${owner}-label`, [owner]);
  const refMap = useGlobalRefMap(labelID);

  const schematic = useContext(SchematicContext);
  const [startSch, setStartSch] = useState(schematic);

  const formattedLabel = useMemo(() => {
    const formattedValue = (value ?? '')
      .replace(/(?<=\d)[^\d.,]$/gm, ' $&')
      .trim();

    let label = name;
    if (name && value) label += ' = ';
    if (value) label += formattedValue;
    if (unit) label += value ? `${unit}` : ` (${unit})`;

    return label;
  }, [name, value, unit]);

  if (isHidden) {
    return null;
  }

  return (
    <DraggableComponent
      position={position}
      onStart={() => setStartSch(schematic)}
      onDrag={(_e, { x, y }) => updatePosition(owner, { x, y }, null, true)}
      onStop={(_e, { x, y }) =>
        updatePosition(owner, { x, y }, startSch.data, true)
      }
      {...rest}
    >
      <Typography
        onDoubleClick={onDoubleClick}
        ref={refMap.set(labelID)}
        sx={{
          height: 20,
          padding: '5px',

          '&:hover': {
            transform: `scale(${
              process.env.REACT_APP_SCHEMATIC_HOVER_SCALE ?? 1
            })`,
          },
        }}
      >
        <b>{formattedLabel}</b>
      </Typography>
    </DraggableComponent>
  );
}
