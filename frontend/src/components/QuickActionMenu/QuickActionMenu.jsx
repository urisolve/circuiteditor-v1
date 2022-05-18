import { useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';

import { Box, Paper, Stack } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CodeIcon from '@mui/icons-material/Code';
import SaveIcon from '@mui/icons-material/Save';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import { useBoolean, useUser } from '../../hooks';
import { SchematicContext } from '../../contexts';
import { QuickAction } from '../QuickAction';
import { download, screenshot } from '../../util';

export function QuickActionMenu({
  schematicRef,
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
  const { user } = useUser();
  const match = useRouteMatch();
  const { circuitId } = match.params;

  const sch = useContext(SchematicContext);
  const { area, data: schematic, history, netlist } = sch;

  const isAccountAlertOpen = useBoolean(false);
  const { enqueueSnackbar } = useSnackbar();

  const getThumbnail = () => screenshot(schematicRef.current, area);

  async function saveCircuit() {
    if (!user) {
      isAccountAlertOpen.on();
      return;
    }

    try {
      const thumbnail = await getThumbnail();
      const circuit = { schematic, thumbnail };

      await axios.patch(`/api/circuits?id=${circuitId}`, circuit);

      enqueueSnackbar('The circuit has been saved!', { variant: 'success' });
    } catch ({ response: { statusText } }) {
      enqueueSnackbar(statusText, { variant: 'error' });
    }
  }

  async function downloadScreenshot() {
    try {
      const image = await getThumbnail();

      download(image, `${circuitName}.png`);
    } catch ({ response: { statusText } }) {
      enqueueSnackbar(statusText, { variant: 'error' });
    }
  }

  async function uploadToURIsolve() {
    try {
      const image = await getThumbnail();
      const circuit = { email: user.email, image, netlist, schematic };

      const { data: uploadURL } = await axios.post(
        'https://urisolve.pt/app/circuit/load',
        circuit,
      );

      window.open(uploadURL, '_blank');
      enqueueSnackbar('The circuit has been uploaded!', { variant: 'success' });
    } catch ({ message, request, response }) {
      if (response) {
        enqueueSnackbar(response.statusText, { variant: 'error' });
      } else {
        enqueueSnackbar(message, { variant: 'error' });
      }
    }
  }

  const actionGroups = [
    {
      name: 'History',
      actions: [
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
          onClick: downloadScreenshot,
        },
        {
          name: 'Export to URIsolve',
          icon: <FileUploadIcon />,
          onClick: uploadToURIsolve,
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
      <Stack direction='row' spacing={3} {...rest}>
        {actionGroups.map((group, groupIdx) => (
          <Box key={groupIdx}>
            {group.actions.map((action, actionIdx) => (
              <QuickAction key={actionIdx} {...action} />
            ))}
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}
