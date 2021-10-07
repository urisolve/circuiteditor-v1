import React, { useCallback, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import { Tool } from '../Tool';

// Material-UI
import {
  Grid,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import DeleteIcon from '@mui/icons-material/Delete';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import CodeIcon from '@mui/icons-material/Code';
import SaveIcon from '@mui/icons-material/Save';

export const ToolsMenu = ({ schematic, selection, history }) => {
  const { id } = useParams();

  const [isAccountAlertOpen, setIsAccountAlertOpen] = useState(false);
  const closeAccountAlert = () => setIsAccountAlertOpen(false);

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
    if (!Boolean(id)) {
      setIsAccountAlertOpen(true);
      return;
    }

    try {
      await axios.patch(`/api/circuits?id=${id}`, {
        schematic: schematic.data,
      });
    } catch (err) {
      console.error(err);
    }
  }, [id, schematic]);

  const tools = [
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
        name: 'View Source',
        icon: <CodeIcon />,
        onClick: () => {},
      },
      {
        name: 'Save',
        icon: <SaveIcon />,
        onClick: saveCircuit,
      },
    ],
  ];

  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
      {tools.map((menu, menuId) => (
        <React.Fragment key={menuId}>
          {menuId !== 0 && (
            <Divider
              orientation='vertical'
              sx={{ height: 35, mx: 1, backgroundColor: '#ddd' }}
            />
          )}
          {menu.map((tool, toolId) => (
            <Tool key={toolId} {...tool} />
          ))}
        </React.Fragment>
      ))}

      <Dialog open={isAccountAlertOpen} onClose={closeAccountAlert}>
        <DialogTitle>Log In</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To be able to save the circuit you need to be logged into an
            account.
            <br />
            Otherwise, this circuit will be deleted when you leave the page.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAccountAlert} color='primary'>
            Remain like this
          </Button>
          <Button
            component={Link}
            to='/auth'
            onClick={closeAccountAlert}
            color='primary'
            variant='contained'
          >
            Log In
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};
