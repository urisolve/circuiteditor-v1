import { useTranslation } from 'react-i18next';

import { FormField, Slider } from '../../components';
import { constants } from '../../constants';

export function NodePropertiesForm({ form }) {
  const { t } = useTranslation();

  return (
    <>
      <FormField
        label={t('form.label.color')}
        name='properties.color'
        placeholder={t('form.placeholder.color')}
        {...form}
      />

      <Slider
        control={form.control}
        inputProps={{
          min: 1,
          max: 10,
          marks: [{ value: constants.DEFAULT_NODE_RADIUS }],
        }}
        label={t('form.label.radius')}
        name='properties.radius'
      />
    </>
  );
}
