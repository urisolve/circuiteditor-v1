export const LabelOptions = Object.freeze({
  NUMERIC: '123456789',
  ALPHABETIC: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
});

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

export function isNameTaken(elements, name, id) {
  return !!elements.find(
    (elem) => elem?.id !== id && elem?.label?.name === name,
  );
}

export function isNameGloballyTaken(name, id, schematic) {
  return Object.values(schematic).reduce(
    (isTaken, elements) => isTaken || isNameTaken(name, id, elements),
    false,
  );
}

export function generateUniqueName(elements, options, prefix = '', label = '') {
  const lastChar = label.slice(-1);
  const lastOption = options.slice(-1);
  const lastCharIdx = options.indexOf(lastChar);
  const firstOption = options.charAt(0);
  const nextOption = options.charAt(lastCharIdx + 1);

  if (!label) {
    label = firstOption;
  }

  if (!isNameTaken(elements, prefix + label)) {
    return prefix + label;
  }

  const nextLabel =
    lastChar === lastOption
      ? label + firstOption
      : label.replace(/.$/gm, nextOption);

  return generateUniqueName(elements, options, prefix, nextLabel);
}
