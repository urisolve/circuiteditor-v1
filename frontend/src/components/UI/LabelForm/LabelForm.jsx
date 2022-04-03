import { Checkbox, FormControlLabel } from '@mui/material';
import { Property } from '../Property';

export function LabelForm({ register, formState: { errors } }) {
  return (
    <>
      <Property errors={errors} label='Name' {...register('label.name')} />
      <Property errors={errors} label='Value' {...register('label.value')} />
      <Property
        disabled
        errors={errors}
        label='Unit'
        {...register('label.unit')}
      />

      <FormControlLabel
        control={
          <Checkbox
            errors={errors}
            name='isHidden'
            {...register('label.isHidden')}
          />
        }
        label='Hide Label'
      />
    </>
  );
}
