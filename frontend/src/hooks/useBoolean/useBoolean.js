import { useRef, useState } from 'react';

export function useBoolean(initialValue) {
  const [value, setValue] = useState(initialValue);

  const boolean = useRef({
    value,
    on: () => setValue(true),
    off: () => setValue(false),
    set: (value) => setValue(value),
    toggle: () => setValue((oldValue) => !oldValue),
  });

  return boolean.current;
}
