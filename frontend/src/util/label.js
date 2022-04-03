export const numberPattern = '[+-]?([0-9]+[.,]{1}[0-9]+|[0-9]+)';
export const unitPrefixPattern = '[pnumkMGT]?';
export const labelValueRegex = new RegExp(
  `^${numberPattern}${unitPrefixPattern}$`,
);

export function validateLabelValue(value = '') {
  return value.test(labelValueRegex);
}

export function formatLabel({ name = '', value = '', unit = '' }) {
  // Insert space between value and unit prefix
  const pattern = new RegExp(numberPattern);
  const formattedValue = value.replace(pattern, '$& ').trim();

  let label = name;
  if (name && value) label += ' = ';
  if (value) label += formattedValue;
  if (unit) label += value ? `${unit}` : ` (${unit})`;

  return label;
}
