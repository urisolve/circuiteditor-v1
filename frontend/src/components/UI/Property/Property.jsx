import { Box, FormHelperText, TextField } from '@mui/material';
import lodash from 'lodash';

export function Property({ name, value, desc }) {
  return (
    <Box>
      <TextField
        variant='outlined'
        margin='dense'
        label={lodash.startCase(name)}
        value={value}
        fullWidth
      />
      <FormHelperText>{desc}</FormHelperText>
    </Box>
  );
}
