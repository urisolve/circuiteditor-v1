import { useState } from 'react';

export function useBoolean(initialValue) {
  const [value, setValue] = useState(!!initialValue);

  const on = () => setValue(true);
  const off = () => setValue(false);
  const toggle = () => setValue((oldValue) => !oldValue);

  return {
    // useState logic
    value,
    set: setValue,

    // Boolean logic
    on,
    off,
    toggle,

    // Aliases for Modals
    open: on,
    close: off,
    isOpen: value,
  };
}
