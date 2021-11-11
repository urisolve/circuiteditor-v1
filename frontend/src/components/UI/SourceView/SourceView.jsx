// Material-UI
import {
  Box,
  Divider,
  Drawer,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';

const drawerWidth = 310;

const DrawerHeader = ({ children, ...rest }) => (
  <Typography
    variant='h5'
    component='h3'
    align='center'
    gutterBottom
    noWrap
    {...rest}
  >
    {children}
  </Typography>
);

export function SourceView({ schematic, ...rest }) {
  return (
    <Drawer
      variant='persistent'
      anchor='right'
      sx={{
        width: drawerWidth,
        '& .MuiBox-root': {
          width: drawerWidth,
        },
      }}
      {...rest}
    >
      <Toolbar />
      <Stack flexGrow={1} sx={{ py: 2 }}>
        <DrawerHeader>Source View</DrawerHeader>
        <Divider />
        <Box sx={{ flexGrow: 1, overflow: 'scroll' }}>
          <pre>
            <code>{JSON.stringify(schematic, null, 1)}</code>
          </pre>
        </Box>
      </Stack>
    </Drawer>
  );
};
