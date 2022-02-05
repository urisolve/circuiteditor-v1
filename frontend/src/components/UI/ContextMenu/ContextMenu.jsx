import { useContext } from 'react';

import { Menu, MenuItem } from '@mui/material';
import PasteIcon from '@mui/icons-material/ContentPaste';
import CutIcon from '@mui/icons-material/ContentCut';
import DuplicateIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';

import { SchematicContext } from '../../../contexts';

export function ContextMenu({ id, isOpen, close, position }) {
  const schematic = useContext(SchematicContext);

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
      <MenuItem onClick={close} disabled>
        <DuplicateIcon />
        Copy
      </MenuItem>
      <MenuItem onClick={close} disabled>
        <PasteIcon />
        Paste
      </MenuItem>
      <MenuItem onClick={close} disabled>
        <CutIcon />
        Cut
      </MenuItem>
      <MenuItem
        onClick={() => {
          schematic.deleteById(id);
          close();
        }}
      >
        <DeleteIcon />
        Delete
      </MenuItem>
    </Menu>
  );
}
