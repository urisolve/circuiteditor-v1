import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Checkbox, FormField } from '../../components';

export function LabelForm({ form, unit }) {
  const { t } = useTranslation();

  return (
    <>
      <Stack direction='row' spacing={1}>
        <FormField
          label={t('form.label.name')}
          name='label.name'
          placeholder={t('form.placeholder.itemName')}
          {...form}
        />

        <Checkbox
          control={form.control}
          label={t('form.label.hide')}
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
        <FormField
          label={t('form.label.value')}
          name='label.value'
          placeholder={t('form.placeholder.value')}
          suffix={unit}
          {...form}
        />

        <Checkbox
          control={form.control}
          label={t('form.label.hide')}
          name='label.isValueHidden'
          sx={{ flexGrow: 1 }}
        />
      </Stack>
    </>
  );
}
