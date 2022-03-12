import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Custom hooks & components
import { useBoolean, useSchematic } from '../../hooks';
import {
  CompLib,
  QuickAction,
  QuickActionMenu,
  SourceView,
} from '../../components/UI';
import { Schematic } from '../../components/Electrical';
import { SchematicContext } from '../../contexts';

// Material-UI
import { Stack } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CodeIcon from '@mui/icons-material/Code';
import SaveIcon from '@mui/icons-material/Save';

const sidebarSize = 310;
const canvasSize = { width: 2560, height: 1440 }; // 16:9 resolution (1440p)

const defaultCircuit = require('../../templates/voltageDivider.json');

export function Editor({ ...rest }) {
  const schematic = useSchematic(defaultCircuit);
  const { id } = useParams();

  const compLib = useBoolean(false);
  const sourceView = useBoolean(false);
  const isAccountAlertOpen = useBoolean(false);

  const saveCircuit = useCallback(async () => {
    if (!id) {
      isAccountAlertOpen.on();
      return;
    }

    try {
      await axios.patch(`/api/circuits?id=${id}`, {
        schematic: schematic.data,
      });
    } catch (err) {
      console.error(err);
    }
  }, [id, schematic, isAccountAlertOpen]);

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
    <SchematicContext.Provider value={schematic}>
      <Stack
        alignItems='center'
        justifyContent='center'
        sx={{
          ...canvasSize,
          overflow: 'scroll',
          background: 'radial-gradient(#fff, #eee)',
        }}
      >
        <Schematic
          schematic={schematic}
          selection={schematic.selection}
          {...rest}
        />

        <CompLib
          addToSchematic={schematic.addComponents}
          open={compLib.value}
          onClose={compLib.off}
        />
        <SourceView
          code={schematic?.data}
          open={sourceView.value}
          onClose={sourceView.off}
        />

        <QuickActionMenu shift={compLib.value ? sidebarSize : 0}>
          {actions.map((action, idx) => (
            <QuickAction key={idx} aria-label={action.tooltip} {...action} />
          ))}
        </QuickActionMenu>
      </Stack>
    </SchematicContext.Provider>
  );
}
