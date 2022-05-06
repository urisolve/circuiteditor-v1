import { Controller } from 'react-hook-form';

import { Checkbox as MuiCheckbox, FormControlLabel } from '@mui/material';

export function Checkbox({ control, label, ...rest }) {
  return (
    <FormControlLabel
      control={
        <Controller
          control={control}
          render={({
            field: { onBlur, onChange, ref, value },
            fieldState: { error },
          }) => (
            <MuiCheckbox
              checked={!!value}
              error={error}
              inputRef={ref}
              onBlur={(e) => onBlur(e.target.checked)}
              onChange={(e) => onChange(e.target.checked)}
            />
          )}
        />
      }
      label={label}
      {...rest}
    />
  );
}
