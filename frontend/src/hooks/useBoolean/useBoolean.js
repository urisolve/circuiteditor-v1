import { useState } from 'react';

export function useBoolean(initialValue) {
  const [value, setValue] = useState(!!initialValue);

  const on = () => setValue(true);
  const off = () => setValue(false);
  const toggle = () => setValue((oldValue) => !oldValue);

  return { value, set: setValue, on, off, toggle };
}
