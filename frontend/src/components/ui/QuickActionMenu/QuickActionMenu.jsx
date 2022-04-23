import { toPng } from 'html-to-image';
import { useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Box, Paper, Stack } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CodeIcon from '@mui/icons-material/Code';
import SaveIcon from '@mui/icons-material/Save';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ShareIcon from '@mui/icons-material/Share';

import { useBoolean } from '../../../hooks';
import { SchematicContext } from '../../../contexts';
import { QuickAction } from '../QuickAction';
import { download } from '../../../util';

export function QuickActionMenu({
  canvasRef,
  circuitName,
  offset,
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

  const actionGroups = [
    {
      name: 'History',
      actions: [
        {
          name: 'Undo',
          icon: <UndoIcon />,
          onClick: schematic.history.undo,
          disabled: !schematic.history.canUndo,
        },
        {
          name: 'Redo',
          icon: <RedoIcon />,
          onClick: schematic.history.redo,
          disabled: !schematic.history.canRedo,
        },
      ],
    },
    {
      name: 'Drawers',
      actions: [
        {
          name: `${compLib.value ? 'Hide' : 'Show'} Component Library`,
          icon: <ListAltIcon />,
          onClick: compLib.toggle,
        },
        {
          name: `${sourceView.value ? 'Hide' : 'Show'} Source View`,
          icon: <CodeIcon />,
          onClick: sourceView.toggle,
        },
      ],
    },
    {
      name: 'External',
      actions: [
        {
          name: 'Save',
          icon: <SaveIcon />,
          onClick: saveCircuit,
        },
        {
          name: 'Screenshot',
          icon: <CameraAltIcon />,
          onClick: () =>
            toPng(canvasRef.current)
              .then((imageUrl) => download(imageUrl, `${circuitName}.png`))
              .catch(console.error),
        },
        {
          name: 'Share',
          icon: <ShareIcon />,
          href: 'https://urisolve.pt/app/',
          target: '_blank',
          rel: 'noopener',
        },
      ],
    },
  ];

  return (
    <Paper
      sx={{
        bottom: 0,
        left: '50%',
        position: 'fixed',
        transform: 'translate(-50%, -50%)',
        ...sx,
      }}
      {...rest}
    >
      <Stack direction='row' {...rest}>
        {actionGroups.map((group, groupIdx) => (
          <Box
            key={groupIdx}
            sx={{ mr: groupIdx !== actionGroups.length - 1 ? 2 : 0 }}
          >
            {group.actions.map((action, actionIdx) => (
              <QuickAction key={actionIdx} {...action} />
            ))}
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}
