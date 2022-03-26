import { useContext } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { MenuHeader } from '..';
import { SchematicContext } from '../../../contexts';
import { Drawer } from '../Drawer';
import { DownloadButton } from '../DownloadButton';

export function SourceView({ circuitName, controller, ...rest }) {
  const { data: json, netlist } = useContext(SchematicContext);

  const sources = [
    {
      code: netlist,
      fileName: `${circuitName} - netlist.txt`,
      title: 'Netlist',
      type: 'plain',
    },
    {
      code: JSON.stringify(json, null, 2),
      fileName: `${circuitName} - schematic.json`,
      title: 'JSON',
      type: 'plain',
    },
  ];

  return (
    <Drawer anchor='right' controller={controller} {...rest}>
      <MenuHeader icon={<CodeIcon />} onClose={controller.off}>
        Source View
      </MenuHeader>

      <Box>
        {sources.map(({ code, disabled, title, fileName, type }) => (
          <Accordion disabled={disabled} variant='outlined'>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Stack direction='row' alignItems='center'>
                <DownloadButton
                  content={code}
                  fileName={fileName}
                  type={type}
                />
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
