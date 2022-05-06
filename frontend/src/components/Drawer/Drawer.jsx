import { Stack, SwipeableDrawer } from '@mui/material';

const toolbarSize = 8;

const drawerWidth = 300;
const drawerStyle = {
  width: drawerWidth,
  '& .MuiBox-root': {
    width: drawerWidth,
  },
};

export function Drawer({ controller, children, sx, ...rest }) {
  return (
    <SwipeableDrawer
      ModalProps={{ keepMounted: true }} // Better performance on mobile.
      open={controller.value}
      onClose={controller.off}
      onOpen={controller.on}
      variant='persistent'
      sx={{ ...drawerStyle, ...sx }}
      {...rest}
    >
      <Stack spacing={4} sx={{ mt: toolbarSize, overflow: 'auto', p: 2 }}>
        {children}
      </Stack>
    </SwipeableDrawer>
  );
}
