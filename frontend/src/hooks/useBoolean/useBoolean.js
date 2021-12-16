import { useMemo, useState } from 'react';

export function useBoolean(initialValue) {
  const [value, setValue] = useState(initialValue);

  const boolean = useMemo(
    () => ({
      value,
      on: () => setValue(true),
      off: () => setValue(false),
      set: (newValue) => setValue(newValue),
      toggle: () => setValue((oldValue) => !oldValue),
    }),
    [value, setValue],
  );

  return boolean;
}
