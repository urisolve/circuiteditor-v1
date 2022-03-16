import { useMemo } from 'react';

const multiplierPattern = /[a-z]/i;

export function useFormattedLabel(name, value = '', unit) {
  const multiplier = useMemo(() => {
    const lastChar = value.charAt(value.length - 1);
    return lastChar.match(multiplierPattern) ? lastChar : '';
  }, [value]);

  const cleanValue = useMemo(
    () => (multiplier ? value.slice(0, -1) : value),
    [multiplier, value],
  );

  const formattedLabel = useMemo(() => {
    let label = name;
    if (name && value) label += ' = ';
    if (value) label += `${cleanValue} ${multiplier}`;
    if (unit) label += value ? `${unit}` : ` (${unit})`;
    return label;
  }, [name, value, cleanValue, multiplier, unit]);

  return formattedLabel;
}
