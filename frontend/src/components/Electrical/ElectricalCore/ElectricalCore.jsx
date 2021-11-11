import { useRef, useMemo, forwardRef } from 'react';
import Draggable from 'react-draggable';
import { Avatar, Box } from '@mui/material';

import { svgMap } from '../../../assets/electrical';
import { Port } from '../Port';

export const ElectricalCore = forwardRef(
  (
    {
      id,
      type,
      position,
      ports,
      portsRefMap,
      width,
      height,
      gridSize,
      altImageIdx,
      imgPath,
      updatePosition,
      isSelected,
      ...rest
    },
    ref,
  ) => {
    const draggableRef = useRef();

    /**
     * Calculate which SVG to use.
     *
     * If a custom image is provided, then it uses that one.
     * Otherwise, if it was provided an alternate image index, use that.
     * Otherwise, use the default one.
     */
    const src = useMemo(() => {
      // If there is a custom image, use that one
      if (imgPath) return imgPath;

      // Otherwise, grab the correct SVG
      const src = svgMap.get(type);
      return Array.isArray(src) ? src[altImageIdx ?? 0] : src;
    }, [altImageIdx, imgPath, type]);

    return (
      <Draggable
        handle='.component-symbol'
        bounds='.schematic'
        nodeRef={draggableRef}
        position={position ?? { x: 0, y: 0 }}
        positionOffset={{ x: 5, y: 5 }}
        grid={[gridSize ?? 10, gridSize ?? 10]}
        onStop={(e, position) =>
          updatePosition?.(id, position ?? { x: 0, y: 0 })
        }
        {...rest}
      >
        <Box ref={draggableRef} sx={{ position: 'absolute', top: 0, left: 0 }}>
          <Avatar
            ref={ref}
            src={src}
            alt={type}
            variant='square'
            className='component-symbol'
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
                {...rest}
                {...port}
              />
            );
          })}
        </Box>
      </Draggable>
    );
  },
);
