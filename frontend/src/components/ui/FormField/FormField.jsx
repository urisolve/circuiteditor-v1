import { forwardRef } from 'react';
import { TextField } from '@mui/material';

export const FormField = forwardRef(
  (
    {
      autoComplete,
      disabled,
      formState,
      label,
      name,
      placeholder,
      register,
      type,
      sx,
    },
    ref,
  ) => {
    return (
      <TextField
        autoComplete={autoComplete}
        disabled={disabled}
        error={!!formState?.errors?.[name]}
        fullWidth
        helperText={formState?.errors?.[name]?.message}
        label={label}
        margin='normal'
        name={name}
        placeholder={placeholder}
        ref={ref}
        sx={sx}
        type={type}
        variant='outlined'
        {...register?.(name)}
      />
    );
  },
);
