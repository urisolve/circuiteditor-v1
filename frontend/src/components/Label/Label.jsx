import { useContext, useMemo, useState } from 'react';

import { Typography } from '@mui/material';

import { DraggableComponent } from '..';
import { SchematicContext } from '../../contexts';
import { useGlobalRefMap } from '../../hooks';
import { formatLabel } from '../../util';
import { constants } from '../../constants';

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
  isNameHidden,
  isValueHidden,
  ...rest
}) {
  const labelID = useMemo(() => `${owner}-label`, [owner]);
  const refMap = useGlobalRefMap(labelID);

  const { data: schematic } = useContext(SchematicContext);
  const [startSch, setStartSch] = useState(schematic);

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

  return (
    <DraggableComponent
      position={position}
      onStart={() => setStartSch(schematic)}
      onDrag={(_e, { x, y }) => updatePosition(owner, { x, y }, null, true)}
      onStop={(_e, { x, y }) => updatePosition(owner, { x, y }, startSch, true)}
      {...rest}
    >
      <Typography
        onDoubleClick={onDoubleClick}
        ref={refMap.get(labelID)}
        sx={{
          fontWeight: 'bold',
          padding: '5px',
          whiteSpace: 'nowrap',

          '&:hover': {
            transform: `scale(${constants.SCHEMATIC_HOVER_SCALE})`,
          },
        }}
      >
        {formattedLabel}
      </Typography>
    </DraggableComponent>
  );
}
