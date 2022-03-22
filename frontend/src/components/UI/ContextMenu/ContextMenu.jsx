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

  const items = useMemo(
    () => [
      [
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
      [
        {
          disabled: !isClickingOnComponent,
          icon: <RotateLeftIcon />,
          name: 'RotateLeft',
          onClick: () => rotateSelection(-ROTATION_INCREMENT),
        },
        {
          disabled: !isClickingOnComponent,
          icon: <RotateRightIcon />,
          name: 'RotateRight',
          onClick: () => rotateSelection(+ROTATION_INCREMENT),
        },
      ],
      [
        {
          color: 'IndianRed',
          icon: <DeleteIcon />,
          name: 'Delete',
          onClick: () => deleteById([id, ...selectedItems]),
        },
      ],
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
      {items.map((group, groupIdx) => (
        <Box key={groupIdx}>
          {group.map((item, itemIdx) => (
            <MenuItem
              dense
              disabled={item.disabled}
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
          ))}

          {groupIdx !== items.length - 1 && <Divider />}
        </Box>
      ))}
    </Menu>
  );
}
