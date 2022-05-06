import { Stack, SwipeableDrawer } from '@mui/material';
import { constants } from '../../constants';

const drawerStyle = {
  width: constants.DRAWER_SIZE,
  '& .MuiBox-root': {
    width: constants.DRAWER_SIZE,
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
      <Stack
        spacing={4}
        sx={{ mt: constants.TOOLBAR_SIZE, overflow: 'auto', p: 2 }}
      >
        {children}
      </Stack>
    </SwipeableDrawer>
  );
}
