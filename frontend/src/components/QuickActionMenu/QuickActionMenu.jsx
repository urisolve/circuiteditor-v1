import { useCallback, useContext, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
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

  const getThumbnail = useCallback(
    () => screenshot(schematicRef.current, area),
    [area, schematicRef],
  );

  const updateThumbnail = useCallback(async () => {
    if (!user) return;

    try {
      const thumbnail = await getThumbnail();

      await axios.patch(`/api/circuits?id=${circuitId}`, { thumbnail });
    } catch (error) {
      console.error(error);
    }
  }, [circuitId, getThumbnail, user]);

  async function saveCircuit() {
    if (!user) {
      isAccountAlertOpen.on();
      return;
    }

    try {
      const thumbnail = await getThumbnail();
      const circuit = { schematic, thumbnail };

      await axios.patch(`/api/circuits?id=${circuitId}`, circuit);
    } catch (error) {
      console.error(error);
    }
  }

  async function downloadScreenshot() {
    try {
      const image = await getThumbnail();
      download(image, `${circuitName}.png`);
    } catch (error) {
      console.error(error);
    }
  }

  async function uploadToURIsolve() {
    try {
      const image = await getThumbnail();
      const circuit = { image, netlist, schematic };

      await axios.post('https://urisolve.pt/app/circuit/load', circuit);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (user) {
      updateThumbnail();
    }
  }, [updateThumbnail, user]);

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
          disabled: true,
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
