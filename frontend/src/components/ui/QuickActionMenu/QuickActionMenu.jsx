import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Box, Paper, Stack } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CodeIcon from '@mui/icons-material/Code';
import SaveIcon from '@mui/icons-material/Save';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import { useBoolean } from '../../../hooks';
import { SchematicContext } from '../../../contexts';
import { QuickAction } from '../QuickAction';
import { download, screenshot } from '../../../util';

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
  const {
    area,
    data: schematic,
    history,
    netlist,
  } = useContext(SchematicContext);
  const { circuitID } = useParams();
  const isAccountAlertOpen = useBoolean(false);

  const getImage = () => screenshot(canvasRef.current, area);

  async function saveCircuit() {
    if (!circuitID) {
      isAccountAlertOpen.on();
      return;
    }

    try {
      const thumbnail = await getImage();

      await axios.patch(`/api/circuits?id=${circuitID}`, {
        schematic,
        thumbnail,
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function saveScreenshot() {
    try {
      const image = await getImage();
      download(image, `${circuitName}.png`);
    } catch (err) {
      console.error(err);
    }
  }

  async function uploadToURIsolve() {
    try {
      const image = await getImage();
      const circuit = { image, netlist, schematic };

      await axios.post('https://urisolve.pt/app/circuit/load', circuit);
    } catch (err) {
      console.error(err);
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
          onClick: saveScreenshot,
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
