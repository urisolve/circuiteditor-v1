import { Checkbox, FormField, Slider } from '../../components';
import { constants } from '../../constants';

export function ConnectionPropertiesForm({ form }) {
  const isDashed = form.watch('properties.dashed');

  return (
    <>
      <FormField label='Color' name='properties.color' {...form} />

      <Slider
        control={form.control}
        label='Grid Break'
        inputProps={{
          min: 0,
          max: 100,
          marks: [{ value: constants.DEFAULT_GRID_BREAK }],
        }}
        name='properties.gridBreak'
      />

      <Slider
        control={form.control}
        inputProps={{
          min: 1,
          max: 10,
          marks: [{ value: constants.DEFAULT_STROKE_WIDTH }],
        }}
        label='Stroke Width'
        name='properties.strokeWidth'
      />

      <Slider
        control={form.control}
        inputProps={{
          min: -10,
          max: 10,
          marks: [{ value: constants.DEFAULT_DASHED_ANIMATION_SPEED }],
          disabled: !isDashed,
        }}
        label='Dashed Animation Speed'
        name='properties.dashedAnimationSpeed'
      />

      <Checkbox
        control={form.control}
        label='Dashed'
        name='properties.dashed'
        sx={{ flexGrow: 1 }}
      />
    </>
  );
}
