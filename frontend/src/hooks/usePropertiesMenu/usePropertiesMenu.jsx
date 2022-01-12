import { useBoolean } from '..';

export function usePropertiesMenu() {
  const { value, on, off } = useBoolean(false);
  return { isOpen: value, open: on, close: off };
}
