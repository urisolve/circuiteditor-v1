import { Stack } from '@mui/material';

import { Checkbox } from '../Checkbox';
import { Property } from '../Property';

export function LabelForm({
  control,
  label,
  formState: { errors },
  register,
  unitDisabled,
}) {
  return (
    <>
      <Property errors={errors} label='Name' {...register('label.name')} />
      <Property errors={errors} label='Value' {...register('label.value')} />
      <Property
        disabled={!!unitDisabled}
        errors={errors}
        label='Unit'
        {...register('label.unit')}
      />

      <Stack direction='row'>
        <Checkbox
          control={control}
          label='Hide Label'
          name='label.isHidden'
          sx={{ flexGrow: 1 }}
        />
        <Checkbox
          control={control}
          label='Hide Value'
          name='label.isValueHidden'
          sx={{ flexGrow: 1 }}
        />
      </Stack>
    </>
  );
}
