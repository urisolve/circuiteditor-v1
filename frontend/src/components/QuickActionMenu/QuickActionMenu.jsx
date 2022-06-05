import { useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

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

      enqueueSnackbar(t('feedback.saved'), { variant: 'success' });
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
      enqueueSnackbar(t('feedback.uploaded'), { variant: 'success' });
    } catch ({ message, request, response }) {
      if (response) {
        enqueueSnackbar(response.statusText, { variant: 'error' });
      } else {
        enqueueSnackbar(message, { variant: 'error' });
      }
    }
  }

  const actionGroups = [
    [
      {
        name: t('page.editor.action.undo'),
        icon: <UndoIcon />,
        onClick: history.undo,
        disabled: !history.canUndo,
      },
      {
        name: t('page.editor.action.redo'),
        icon: <RedoIcon />,
        onClick: history.redo,
        disabled: !history.canRedo,
      },
    ],
    [
      {
        name: t('page.editor.action.compLib', {
          action: compLib.value ? t('common.hide') : t('common.show'),
        }),
        icon: <ListAltIcon />,
        onClick: compLib.toggle,
      },
      {
        name: t('page.editor.action.sourceView', {
          action: sourceView.value ? t('common.hide') : t('common.show'),
        }),
        icon: <CodeIcon />,
        onClick: sourceView.toggle,
      },
    ],
    [
      {
        name: t('common.save'),
        icon: <SaveIcon />,
        onClick: saveCircuit,
      },
      {
        name: t('page.editor.action.saveImage'),
        icon: <CameraAltIcon />,
        onClick: downloadScreenshot,
      },
      {
        name: t('page.editor.action.exportUrisolve'),
        icon: <FileUploadIcon />,
        onClick: uploadToURIsolve,
      },
    ],
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
            {group.map((action, actionIdx) => (
              <QuickAction key={actionIdx} {...action} />
            ))}
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}
