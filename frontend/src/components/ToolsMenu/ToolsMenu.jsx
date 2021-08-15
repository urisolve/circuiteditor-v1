import React, { useCallback } from 'react';

import { Tool } from '../Tool';
import { useStyles } from './ToolsMenu.styles';

// Material-UI
import { Grid, Divider } from '@material-ui/core';

// Material-UI Icons
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import DeleteIcon from '@material-ui/icons/Delete';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RotateRightIcon from '@material-ui/icons/RotateRight';

export const ToolsMenu = ({ schematic, selection, history }) => {
  const classes = useStyles();

  // Deletes all of the currently selected elements
  const deleteSelection = useCallback(() => {
    schematic.deleteById(selection.selectedItems);
  }, [schematic, selection.selectedItems]);

  // Rotate all of the currently selected elements
  const rotateSelection = useCallback(
    (amount) => {
      schematic.editById([...selection.selectedItems], (elem) => {
        elem.position.angle = (elem.position.angle ?? 0) + amount;
        return elem;
      });
    },
    [schematic, selection.selectedItems],
  );

  return (
    <Grid container direction='row' justify='center' alignItems='center'>
      <Tool
        name='Undo'
        icon={<UndoIcon />}
        onClick={history.undo}
        disabled={!history.canUndo}
      />
      <Tool
        name='Redo'
        icon={<RedoIcon />}
        onClick={history.redo}
        disabled={!history.canRedo}
      />
      <Divider className={classes.divider} orientation='vertical' />
      <Tool
        name='Delete'
        icon={<DeleteIcon />}
        onClick={deleteSelection}
        disabled={!selection.selectedItems.size}
      />
      <Divider className={classes.divider} orientation='vertical' />
      <Tool
        name='Rotate Left'
        icon={<RotateLeftIcon />}
        onClick={() => rotateSelection(-90)}
        disabled={!selection.selectedItems.size}
      />
      <Tool
        name='Rotate Right'
        icon={<RotateRightIcon />}
        onClick={() => rotateSelection(+90)}
        disabled={!selection.selectedItems.size}
      />
    </Grid>
  );
};
