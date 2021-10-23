import { createElement, forwardRef } from 'react';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';

// Material-UI
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
      grid={[gridSize, gridSize]}
      onStop={(_e, position) => updatePosition?.(owner, position, true)}
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

Label.displayName = 'Label';

Label.propTypes = {
  /**
   * A custom label component. Passes the given 'name', 'value' and 'unit' as
   * children.
   */
  as: PropTypes.func,
  /**
   * The id of the label.
   */
  id: PropTypes.string,
  /**
   * The id of this label's owner.
   */
  owner: PropTypes.string,
  /**
   * The name of the component.
   */
  name: PropTypes.string,
  /**
   * The value of the component.
   */
  value: PropTypes.string,
  /**
   * The unit of the component.
   */
  unit: PropTypes.string,
  /**
   * The function to execute when the use changes the name of the component.
   * Use this to update the state of the component's name.
   */
  onNameChange: PropTypes.func,
  /**
   * The function to execute when the use changes the value of the component.
   * Use this to update the state of the component's value.
   */
  onValueChange: PropTypes.func,
  /**
   * The default position of the label relative to the component.
   */
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  /**
   * The size of the grid, i.e., the amount of pixels the drag skips.
   */
  gridSize: PropTypes.number,
};

Label.defaultProps = {
  position: { x: 0, y: 0 },
  gridSize: 10,
};
