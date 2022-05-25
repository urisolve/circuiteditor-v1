import { FormField, Slider } from '../../components';
import { constants } from '../../constants';

export function NodePropertiesForm({ form }) {
  return (
    <>
      <FormField label='Color' name='properties.color' {...form} />

      <Slider
        control={form.control}
        inputProps={{
          min: 0,
          max: 10,
          marks: [{ value: constants.DEFAULT_NODE_RADIUS }],
        }}
        label='Radius'
        name='properties.radius'
      />
    </>
  );
}
