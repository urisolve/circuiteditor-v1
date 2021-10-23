import { createElement, forwardRef } from 'react';
import Draggable from 'react-draggable';
import { Box } from '@mui/material'

export const Label = forwardRef(
  ({
    as,
    owner,
    position,
    gridSize,
    updatePosition,
    name,
    value,
    unit,
    ...rest
  }, ref) => (
    <Draggable
      bounds='.schematic'
      position={position}
      nodeRef={ref}
      grid={[gridSize ?? 10, gridSize ?? 10]}
      onStop={(_e, position) =>
        updatePosition?.(owner, position ?? { x: 0, y: 0 }, true)
      }
      {...rest}
    >
      <Box
        ref={ref}
        sx={{
          userSelect: 'none',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        {as ? createElement(as, rest) : (
          <b>
            {name}{(value && unit) && ` = ${value} ${unit}`}
          </b >
        )}
      </Box>
    </Draggable>
  )
);
