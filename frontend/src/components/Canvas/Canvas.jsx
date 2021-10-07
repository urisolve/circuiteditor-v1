import { Schematic } from 'react-circuit-schematics';

// Material-UI
import { Paper, Stack } from '@mui/material';

export const Canvas = ({ schematic, selection, ...rest }) => {
  return (
    <Stack
      alignItems='center'
      justifyContent='center'
      sx={{ flexGrow: 1, width: 1, height: 1 }}
    >
      <Paper elevation={3} sx={{ width: '80%', height: '80%' }}>
        <Schematic schematic={schematic} selection={selection} {...rest} />
      </Paper>
    </Stack>
  );
};
