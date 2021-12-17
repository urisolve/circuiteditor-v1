// Material-UI
import { Box, Drawer, Stack, Toolbar } from '@mui/material';

// Custom component
import { SidebarHeader } from '..';

const sidebarWidth = 310;

export function SourceView({ code, onClose, ...rest }) {
  return (
    <Drawer
      variant='persistent'
      anchor='right'
      sx={{
        width: sidebarWidth,
        '& .MuiBox-root': {
          width: sidebarWidth,
        },
      }}
      ModalProps={{ keepMounted: true }} // Better performance on mobile.
      {...rest}
    >
      <Toolbar />
      <Stack flexGrow={1} sx={{ p: 2 }}>
        <SidebarHeader onClose={onClose}>Source View</SidebarHeader>
        <Box sx={{ flexGrow: 1, overflow: 'scroll' }}>
          <pre>
            <code>{JSON.stringify(code, null, 1)}</code>
          </pre>
        </Box>
      </Stack>
    </Drawer>
  );
};
