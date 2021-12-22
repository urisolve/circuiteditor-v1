import { useMemo } from 'react';

// Material-UI
import { Avatar } from '@mui/material';

import { DraggableComponent, Label, Port } from '..';
import { svgMap } from '../../../assets/electrical';
import { useGlobalRefMap } from '../../../hooks';

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
  imgPath,
  updatePosition,
  isSelected,
  disabled,
  reRender,
  ...rest
}) {
  const refMap = useGlobalRefMap(id);

  const src = useMemo(() => {
    // If there is a custom image, use that one
    if (imgPath) return imgPath;

    // Otherwise, grab the correct SVG
    const src = svgMap.get(type);
    return Array.isArray(src) ? src[altImageIdx ?? 0] : src;
  }, [altImageIdx, imgPath, type]);

  return (
    <DraggableComponent
      handle='.component-handle'
      position={position}
      positionOffset={{ x: 5, y: 5 }}
      onDrag={(_e, position) => {
        updatePosition(id, position);
        reRender();
      }}
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
