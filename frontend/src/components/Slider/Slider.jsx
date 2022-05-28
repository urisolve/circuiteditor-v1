import { FormControlLabel, Slider as MuiSlider } from '@mui/material';
import { Controller } from 'react-hook-form';

export function Slider({ control, inputProps, label, sx, ...rest }) {
  return (
    <FormControlLabel
      control={
        <Controller
          control={control}
          render={({
            field: { onBlur, onChange, ref, value },
            fieldState: { error },
          }) => (
            <MuiSlider
              error={error}
              onBlur={(e) => onBlur(e.target.value)}
              onChange={(e) => onChange(e.target.value)}
              ref={ref}
              value={value ?? 0}
              valueLabelDisplay='auto'
              {...inputProps}
            />
          )}
        />
      }
      label={label}
      labelPlacement='top'
      sx={{
        alignItems: 'flex-start',
        color: 'text.secondary',
        mx: 0,
        my: 1,
        width: '100%',
        ...sx,
      }}
      {...rest}
    />
  );
}
