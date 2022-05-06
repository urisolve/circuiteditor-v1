import { useCallback, useContext, useMemo } from 'react';

import { Box, Divider, Menu, MenuItem } from '@mui/material';
import PasteIcon from '@mui/icons-material/ContentPaste';
import CutIcon from '@mui/icons-material/ContentCut';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import DuplicateIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';

import { SchematicContext } from '../../contexts';

export function ContextMenu({ id, isOpen, close, position }) {
  const {
    data: schematic,
    deleteById,
    editById,
    selection: { selectedItems },
  } = useContext(SchematicContext);

  const rotationIncrement = process.env.REACT_APP_ROTATION_INCREMENT ?? 45;

  const rotateSelection = useCallback(
    (amount) => {
      editById([...new Set([id, ...selectedItems])], (elem) => {
        elem.position.angle = (elem.position.angle ?? 0) + amount;
        return elem;
      });
    },
    [id, editById, selectedItems],
  );

  const isClickingOnComponent = useMemo(
    () => !!schematic.components.find((comp) => comp.id === id),
    [id, schematic],
  );

  const actionGroups = [
    {
      name: 'Edit',
      actions: [
        {
          disabled: true,
          icon: <DuplicateIcon />,
          name: 'Copy',
        },
        {
          disabled: true,
          icon: <PasteIcon />,
          name: 'Paste',
        },
        {
          disabled: true,
          icon: <CutIcon />,
          name: 'Cut',
        },
      ],
    },
    {
      name: 'Rotate',
      hidden: !isClickingOnComponent,
      actions: [
        {
          icon: <RotateLeftIcon />,
          name: 'Rotate Left',
          onClick: () => rotateSelection(-rotationIncrement),
        },
        {
          icon: <RotateRightIcon />,
          name: 'Rotate Right',
          onClick: () => rotateSelection(+rotationIncrement),
        },
      ],
    },
    {
      name: 'Delete',
      actions: [
        {
          color: 'IndianRed',
          icon: <DeleteIcon />,
          name: 'Delete',
          onClick: () => deleteById([id, ...selectedItems]),
        },
      ],
    },
  ];

  return (
    <Menu
      open={isOpen}
      onClose={close}
      anchorReference='anchorPosition'
      anchorPosition={position}
      sx={(theme) => ({
        '& .MuiMenuItem-root': {
          '& .MuiSvgIcon-root': {
            fontSize: 18,
            marginRight: theme.spacing(1.5),
          },
        },
      })}
    >
      {actionGroups.map(
        (group, groupIdx) =>
          !group.hidden && (
            <Box key={groupIdx}>
              {group.actions.map(
                (action, actionIdx) =>
                  !action.hidden && (
                    <MenuItem
                      dense
                      disabled={action.disabled || group.disabled}
                      key={actionIdx}
                      onClick={() => {
                        action.onClick();
                        close();
                      }}
                      sx={{ color: action.color }}
                    >
                      {action.icon}
                      {action.name}
                    </MenuItem>
                  ),
              )}

              {groupIdx !== actionGroups.length - 1 && <Divider />}
            </Box>
          ),
      )}
    </Menu>
  );
}
