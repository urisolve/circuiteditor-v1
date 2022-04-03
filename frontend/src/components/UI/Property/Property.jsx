import lodash from 'lodash';

import { forwardRef, useMemo } from 'react';
import { TextField } from '@mui/material';

export const Property = forwardRef(({ errors, name, ...rest }, ref) => {
  const error = useMemo(() => lodash.get(errors, name), [errors, name]);

  return (
    <TextField
      fullWidth
      error={!!error}
      helperText={error?.message}
      margin='normal'
      name={name}
      ref={ref}
      variant='outlined'
      {...rest}
    />
  );
});
