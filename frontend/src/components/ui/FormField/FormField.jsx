import { forwardRef } from 'react';
import { InputAdornment, TextField } from '@mui/material';

export const FormField = forwardRef(
  (
    {
      autoComplete,
      disabled,
      formState,
      label,
      name,
      placeholder,
      prefix,
      register,
      suffix,
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
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>{suffix}</InputAdornment>
          ),
          startAdornment: (
            <InputAdornment position='start'>{prefix}</InputAdornment>
          ),
        }}
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
