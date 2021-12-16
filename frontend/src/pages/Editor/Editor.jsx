import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Custom hooks & components
import { useBoolean, useSchematic } from '../../hooks';
import { CompLib, SourceView } from '../../components/UI';
import { Schematic } from '../../components/Electrical';
import { voltageDivider as defaultCircuit } from '../../templates';

// Material-UI
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
} from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CodeIcon from '@mui/icons-material/Code';
import SaveIcon from '@mui/icons-material/Save';

export function Editor({ ...rest }) {
  const { schematic, history, selection } = useSchematic(defaultCircuit);
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
      tooltipTitle: 'Undo',
      icon: <UndoIcon />,
      onClick: history.undo,
      disabled: !history.canUndo,
    },
    {
      tooltipTitle: 'Redo',
      icon: <RedoIcon />,
      onClick: history.redo,
      disabled: !history.canRedo,
    },
    {
      tooltipTitle: `${compLib.value ? 'Hide' : 'Show'} Component Library`,
      icon: <MenuBookIcon />,
      onClick: compLib.toggle,
    },
    {
      tooltipTitle: `${sourceView.value ? 'Hide' : 'Show'} Source View`,
      icon: <CodeIcon />,
      onClick: sourceView.toggle,
    },
    {
      tooltipTitle: 'Save',
      icon: <SaveIcon />,
      onClick: saveCircuit,
    },
  ];

  return (
    <>
      <Stack
        alignItems='center'
        justifyContent='center'
        sx={{ width: 2000, height: 2000 }}
      >
        <Schematic schematic={schematic} selection={selection} {...rest} />
      </Stack>

      <CompLib
        addToSchematic={schematic.add}
        open={compLib.value}
        onClose={compLib.off}
      />
      <SourceView
        code={schematic?.data}
        open={sourceView.value}
        onClose={sourceView.off}
      />

      <SpeedDial
        ariaLabel="Tools' menu"
        icon={<SpeedDialIcon />}
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
      >
        {actions.map((action, idx) => (
          <SpeedDialAction key={idx} {...action} />
        ))}
      </SpeedDial>
    </>
  );
}
