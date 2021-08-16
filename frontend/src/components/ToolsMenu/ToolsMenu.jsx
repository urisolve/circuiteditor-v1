import React, { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Tool } from '../Tool';

// Material-UI
import { Grid, Divider } from '@material-ui/core';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import DeleteIcon from '@material-ui/icons/Delete';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import SaveIcon from '@material-ui/icons/Save';
import { useStyles } from './ToolsMenu.styles';

export const ToolsMenu = ({ schematic, selection, history }) => {
  const classes = useStyles();
  const { id } = useParams();

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

  // Save the current circuit to the database
  const saveCircuit = useCallback(async () => {
    try {
      // await axios.patch('/');
      console.log('TODO: Save the circuit');
    } catch (err) {
      console.error(err);
    }
  }, []);

  const tools = useMemo(
    () => [
      [
        {
          name: 'Undo',
          icon: <UndoIcon />,
          onClick: history.undo,
          disabled: !history.canUndo,
        },
        {
          name: 'Redo',
          icon: <RedoIcon />,
          onClick: history.redo,
          disabled: !history.canRedo,
        },
      ],
      [
        {
          name: 'Delete',
          icon: <DeleteIcon />,
          onClick: deleteSelection,
          disabled: !selection.selectedItems.size,
        },
      ],
      [
        {
          name: 'Rotate Left',
          icon: <RotateLeftIcon />,
          onClick: () => rotateSelection(-90),
          disabled: !selection.selectedItems.size,
        },
        {
          name: 'Rotate Right',
          icon: <RotateRightIcon />,
          onClick: () => rotateSelection(-90),
          disabled: !selection.selectedItems.size,
        },
      ],
      [
        {
          name: 'Save',
          icon: <SaveIcon />,
          onClick: saveCircuit,
        },
      ],
    ],
    [selection, history, deleteSelection, rotateSelection, saveCircuit],
  );

  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
      {tools.map((menu, menuId) => (
        <React.Fragment key={menuId}>
          {menuId !== 0 && (
            <Divider className={classes.divider} orientation='vertical' />
          )}
          {menu.map((tool, toolId) => (
            <Tool key={toolId} {...tool} />
          ))}
        </React.Fragment>
      ))}
    </Grid>
  );
};
