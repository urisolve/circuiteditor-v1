import { useMemo } from 'react';

const multiplierPattern = /[a-z]/i;

export function useLabelValue(value = '') {
  const multiplier = useMemo(() => {
    const lastChar = value.charAt(value.length - 1);
    return lastChar.match(multiplierPattern) ? lastChar : '';
  }, [value]);

  const cleanValue = useMemo(
    () => (multiplier ? value.slice(0, -1) : value),
    [multiplier, value],
  );

  return { multiplier, cleanValue };
}
