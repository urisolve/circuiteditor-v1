import { useCallback, useState } from 'react';

export function useForceUpdate() {
  const [, setForceUpdate] = useState({});
  const forceUpdate = useCallback(() => setForceUpdate({}), []);

  return forceUpdate;
}
