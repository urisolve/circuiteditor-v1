import { useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Paper, Stack } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CodeIcon from '@mui/icons-material/Code';
import SaveIcon from '@mui/icons-material/Save';

import { useBoolean } from '../../../hooks';
import { QuickAction } from '../QuickAction';
import { SchematicContext } from '../../../contexts';

export function QuickActionMenu({
  offset,
  anchor,
  children,
  duration,
  easing,
  compLib,
  sourceView,
  sx,
  ...rest
}) {
  const schematic = useContext(SchematicContext);
  const { circuitID } = useParams();
  const isAccountAlertOpen = useBoolean(false);

  const saveCircuit = useCallback(async () => {
    if (!circuitID) {
      isAccountAlertOpen.on();
      return;
    }

    try {
      await axios.patch(`/api/circuits?id=${circuitID}`, {
        schematic: schematic.data,
      });
    } catch (err) {
      console.error(err);
    }
  }, [circuitID, schematic, isAccountAlertOpen]);

  const actions = [
    {
      tooltip: 'Undo',
      icon: <UndoIcon />,
      onClick: schematic.history.undo,
      disabled: !schematic.history.canUndo,
    },
    {
      tooltip: 'Redo',
      icon: <RedoIcon />,
      onClick: schematic.history.redo,
      disabled: !schematic.history.canRedo,
    },
    {
      tooltip: `${compLib.value ? 'Hide' : 'Show'} Component Library`,
      icon: <MenuBookIcon />,
      onClick: compLib.toggle,
    },
    {
      tooltip: `${sourceView.value ? 'Hide' : 'Show'} Source View`,
      icon: <CodeIcon />,
      onClick: sourceView.toggle,
    },
    {
      tooltip: 'Save',
      icon: <SaveIcon />,
      onClick: saveCircuit,
    },
  ];

  return (
    <Paper
      sx={{
        position: 'fixed',
        transform: `translate(${offset.x ?? 0}px, ${offset.y ?? 0}px)`,
        transition: `transform ${duration ?? '0.25s'} ${easing ?? ''}`,
        ...anchor,
        ...sx,
      }}
      {...rest}
    >
      <Stack direction='row' {...rest}>
        {actions.map((action, idx) => (
          <QuickAction key={idx} aria-label={action.tooltip} {...action} />
        ))}
      </Stack>
    </Paper>
  );
}
