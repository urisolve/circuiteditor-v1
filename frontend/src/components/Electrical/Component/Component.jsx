import { useContext, useMemo, useState } from 'react';

// Material-UI
import { Avatar } from '@mui/material';

import { DraggableComponent, Label, Port } from '..';
import { svgMap } from '../../../assets/electrical';
import { useGlobalRefMap } from '../../../hooks';
import { SchematicContext } from '../../../contexts';

export function Component({
  canvasRef,
  id,
  type,
  position,
  ports,
  label,
  width,
  height,
  gridSize,
  altImageIdx,
  updatePosition,
  isSelected,
  disabled,
  ...rest
}) {
  const refMap = useGlobalRefMap(id);

  const schematic = useContext(SchematicContext);
  const [startSch, setStartSch] = useState(schematic);

  const src = useMemo(() => {
    const src = svgMap.get(type);
    return Array.isArray(src) ? src[altImageIdx ?? 0] : src;
  }, [altImageIdx, type]);

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
        src={src}
        alt={type}
        variant='square'
        className='component-handle'
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

      {ports.map((port) => {
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

      <Label
        key={label.id}
        owner={id}
        canvasRef={canvasRef}
        updatePosition={updatePosition}
        disabled={disabled}
        {...label}
      />
    </DraggableComponent>
  );
}
