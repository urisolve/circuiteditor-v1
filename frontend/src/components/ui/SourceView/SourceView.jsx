import { useContext } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import DownloadIcon from '@mui/icons-material/Download';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { downloadCode } from '../../../util';
import { Drawer } from '../Drawer';
import { MenuHeader } from '..';
import { SchematicContext } from '../../../contexts';

export function SourceView({ circuitName, controller, ...rest }) {
  const { data: json, netlist } = useContext(SchematicContext);

  const sources = [
    {
      code: netlist,
      fileName: `${circuitName}.txt`,
      title: 'Netlist',
      type: 'text/plain',
    },
    {
      code: JSON.stringify(json, null, 2),
      fileName: `${circuitName}.json`,
      title: 'JSON',
      type: 'text/json',
    },
  ];

  return (
    <Drawer anchor='right' controller={controller} {...rest}>
      <MenuHeader icon={<CodeIcon />} onClose={controller.off}>
        Source View
      </MenuHeader>

      <Box>
        {sources.map(({ code, disabled, title, fileName, type }) => (
          <Accordion key={title} disabled={disabled} variant='outlined'>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Stack direction='row' alignItems='center'>
                <IconButton onClick={() => downloadCode(code, type, fileName)}>
                  <DownloadIcon />
                </IconButton>
                <Typography>{title}</Typography>
              </Stack>
            </AccordionSummary>

            <AccordionDetails sx={{ overflow: 'auto' }}>
              <pre>
                <code>{code}</code>
              </pre>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Drawer>
  );
}
