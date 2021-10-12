// Syntax highlighting
import SyntaxHighlighter from 'react-syntax-highlighter';
import {
  atomOneLight, // Light mode
  // atomOneDark, // Dark mode
} from 'react-syntax-highlighter/dist/esm/styles/hljs';

// Material-UI
import {
  Box,
  Divider,
  Drawer,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';

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

export const SourceView = ({ schematic, ...rest }) => {
  return (
    <Drawer variant='persistent' anchor='right' {...rest}>
      <Toolbar />
      <Stack flexGrow={1} sx={{ py: 2 }}>
        <DrawerHeader>Source View</DrawerHeader>
        <Divider />
        <Box sx={{ flexGrow: 1, overflow: 'scroll' }}>
          <SyntaxHighlighter
            language='json'
            style={atomOneLight}
            showLineNumbers
            customStyle={{ padding: 0, margin: 0 }}
          >
            {JSON.stringify(schematic, null, 1)}
          </SyntaxHighlighter>
        </Box>
      </Stack>
    </Drawer>
  );
};
