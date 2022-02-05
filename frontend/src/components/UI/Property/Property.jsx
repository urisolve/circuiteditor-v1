import lodash from 'lodash';

import { Box, FormHelperText, TextField } from '@mui/material';

export function Property({ name, desc, ...rest }) {
  return (
    <Box>
      <TextField
        variant='outlined'
        margin='dense'
        label={lodash.startCase(name)}
        fullWidth
        {...rest}
      />
      <FormHelperText>{desc}</FormHelperText>
    </Box>
  );
}
