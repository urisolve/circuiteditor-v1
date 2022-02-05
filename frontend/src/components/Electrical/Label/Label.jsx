import { useContext, useMemo, useState } from 'react';

import { Typography } from '@mui/material';

import { useGlobalRefMap } from '../../../hooks';
import { DraggableComponent } from '..';
import { SchematicContext } from '../../../contexts';

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
  ...rest
}) {
  const labelID = useMemo(() => `${owner}-label`, [owner]);
  const refMap = useGlobalRefMap(labelID);

  const schematic = useContext(SchematicContext);
  const [startSch, setStartSch] = useState(schematic);

  const multiplier = useMemo(() => {
    if (!value) return null;
    const lastChar = value.charAt(value.length - 1);
    return lastChar.match(/[a-z]/i) ? lastChar : '';
  }, [value]);

  const cleanValue = useMemo(
    () => (multiplier ? value.slice(0, -1) : value),
    [multiplier, value],
  );

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
            transform: 'scale(1.1)',
          },
        }}
      >
        <b>
          {name}
          {value && unit && ` = ${cleanValue} ${multiplier}${unit}`}
        </b>
      </Typography>
    </DraggableComponent>
  );
}
