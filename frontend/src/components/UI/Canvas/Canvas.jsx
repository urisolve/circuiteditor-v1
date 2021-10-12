import { Paper, Stack } from '@mui/material';
import { Schematic } from '../../Electrical/Schematic';

export const Canvas = ({ schematic, selection, ...rest }) => {
  return (
    <Stack
      alignItems='center'
      justifyContent='center'
      flexGrow={1}
      sx={{ width: 1, height: 1 }}
    >
      <Paper elevation={3} sx={{ width: '80%', height: '80%' }}>
        <Schematic schematic={schematic} selection={selection} {...rest} />
      </Paper>
    </Stack>
  );
};
