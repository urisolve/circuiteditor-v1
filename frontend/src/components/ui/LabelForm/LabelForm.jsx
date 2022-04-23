import { Stack } from '@mui/material';

import { Checkbox } from '../Checkbox';
import { FormField } from '../FormField';

export function LabelForm({ form, unitDisabled }) {
  return (
    <>
      <FormField label='Name' name='label.name' {...form} />
      <FormField label='Value' name='label.value' {...form} />
      <FormField
        disabled={!!unitDisabled}
        label='Unit'
        name='label.unit'
        {...form}
      />

      <Stack direction='row'>
        <Checkbox
          control={form.control}
          label='Hide Label'
          name='label.isHidden'
          sx={{ flexGrow: 1 }}
        />
        <Checkbox
          control={form.control}
          label='Hide Value'
          name='label.isValueHidden'
          sx={{ flexGrow: 1 }}
        />
      </Stack>
    </>
  );
}
