import { Stack } from '@mui/material';

import { Checkbox } from '../Checkbox';
import { FormField } from '../FormField';

export function LabelForm({ form, unitDisabled }) {
  return (
    <>
      <Stack direction='row' spacing={1}>
        <FormField label='Name' name='label.name' {...form} />

        <Checkbox
          control={form.control}
          label='Hide'
          name='label.isNameHidden'
          sx={{ flexGrow: 1 }}
        />
      </Stack>

      <Stack
        alignItems='center'
        direction='row'
        justifyContent='center'
        spacing={1}
      >
        <FormField label='Value' name='label.value' {...form} />

        <Checkbox
          control={form.control}
          label='Hide'
          name='label.isValueHidden'
          sx={{ flexGrow: 1 }}
        />
      </Stack>

      <FormField
        disabled={!!unitDisabled}
        label='Unit'
        name='label.unit'
        {...form}
      />
    </>
  );
}
