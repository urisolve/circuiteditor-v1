import { useRef, useMemo, forwardRef } from 'react';

// Material-UI
import { Avatar, Box } from '@mui/material';

import { DraggableComponent, Label, Port } from '..';
import { svgMap } from '../../../assets/electrical';

export const Component = forwardRef(
  (
    {
      canvasRef,
      id,
      type,
      position,
      ports,
      label,
      portsRefMap,
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
    },
    ref,
  ) => {
    const draggableRef = useRef();

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
        nodeRef={draggableRef}
        onDrag={(_e, position) => {
          updatePosition(id, position);
          reRender();
        }}
        {...rest}
      >
        <Box ref={draggableRef} sx={{ position: 'absolute' }}>
          <Avatar
            ref={ref}
            src={src}
            alt={type}
            variant='square'
            className='component-handle'
            sx={{
              width: width ?? 100,
              height: height ?? 100,
              transform: `rotate(${position?.angle ?? 0}deg)`,
              filter: isSelected && `drop-shadow(3px 2px 0px #888)`,
            }}
          />

          {ports.map((port) => {
            return (
              <Port
                key={port.id}
                ref={portsRefMap.get(port.id)}
                bounds={{ width: width ?? 100, height: height ?? 100 }}
                rotation={position?.angle ?? 0}
                {...port}
                {...rest}
              />
            );
          })}

          <Label
            key={label.id}
            id={`${id}-label`}
            canvasRef={canvasRef}
            updatePosition={updatePosition}
            disabled={disabled}
            {...label}
          />
        </Box>
      </DraggableComponent>
    );
  },
);
