import { useCallback, useContext, useMemo } from 'react';

import { Box, Divider, Menu, MenuItem } from '@mui/material';
import PasteIcon from '@mui/icons-material/ContentPaste';
import CutIcon from '@mui/icons-material/ContentCut';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import DuplicateIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';

import { SchematicContext } from '../../../contexts';

const ROTATION_INCREMENT = 45;

export function ContextMenu({ id, isOpen, close, position }) {
  const {
    data: schematic,
    deleteById,
    editById,
    selection: { selectedItems },
  } = useContext(SchematicContext);

  const rotateSelection = useCallback(
    (amount) => {
      editById([id, ...selectedItems], (elem) => {
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

  const actions = useMemo(
    () => [
      {
        name: 'Edit',
        items: [
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
        items: [
          {
            icon: <RotateLeftIcon />,
            name: 'Rotate Left',
            onClick: () => rotateSelection(-ROTATION_INCREMENT),
          },
          {
            icon: <RotateRightIcon />,
            name: 'Rotate Right',
            onClick: () => rotateSelection(+ROTATION_INCREMENT),
          },
        ],
      },
      {
        name: 'Delete',
        items: [
          {
            color: 'IndianRed',
            icon: <DeleteIcon />,
            name: 'Delete',
            onClick: () => deleteById([id, ...selectedItems]),
          },
        ],
      },
    ],
    [deleteById, id, isClickingOnComponent, rotateSelection, selectedItems],
  );

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
      {actions.map(
        (group, groupIdx) =>
          !group.hidden && (
            <Box key={groupIdx}>
              {group.items.map(
                (item, itemIdx) =>
                  !item.hidden && (
                    <MenuItem
                      dense
                      disabled={item.disabled || group.disabled}
                      key={itemIdx}
                      onClick={() => {
                        item.onClick();
                        close();
                      }}
                      sx={{ color: item.color }}
                    >
                      {item.icon}
                      {item.name}
                    </MenuItem>
                  ),
              )}

              {groupIdx !== actions.length - 1 && <Divider />}
            </Box>
          ),
      )}
    </Menu>
  );
}
