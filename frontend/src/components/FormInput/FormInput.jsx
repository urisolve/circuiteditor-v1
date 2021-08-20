import React from 'react';
import lodash from 'lodash';
import { FormHelperText, TextField } from '@material-ui/core';

import { formMap } from './formData';

export const FormInput = ({ name, errors, validationFunc, ...rest }) => {
  const formData = formMap.get(name);
  if (!formData) return;

  return (
    <>
      <TextField
        variant='outlined'
        error={errors[name]}
        inputRef={validationFunc(formData.validation)}
        fullWidth
        {...lodash.omit(formData, 'validation')}
        {...rest}
      />
      <FormHelperText>{errors[name] && errors[name]?.message}</FormHelperText>
    </>
  );
};
