// Material-UI
import { Box, Stack, SwipeableDrawer, Toolbar } from '@mui/material';
import { useContext } from 'react';

// Custom component
import { MenuHeader } from '..';
import { SchematicContext } from '../../../contexts';

const sidebarWidth = 310;

export function SourceView({ controller, ...rest }) {
  const { data: code } = useContext(SchematicContext);

  return (
    <SwipeableDrawer
      variant='persistent'
      anchor='right'
      sx={{
        width: sidebarWidth,
        '& .MuiBox-root': {
          width: sidebarWidth,
        },
      }}
      ModalProps={{ keepMounted: true }} // Better performance on mobile.
      open={controller.value}
      onClose={controller.off}
      onOpen={controller.on}
      {...rest}
    >
      <Toolbar />
      <Stack flexGrow={1} sx={{ p: 2 }}>
        <MenuHeader onClose={controller.off}>Source View</MenuHeader>
        <Box sx={{ flexGrow: 1, overflow: 'scroll' }}>
          <pre>
            <code>{JSON.stringify(code, null, 1)}</code>
          </pre>
        </Box>
      </Stack>
    </SwipeableDrawer>
  );
};
