import { useCallback, useEffect, useState } from 'react';

export function useForceUpdate(callback) {
  const [, setForceUpdate] = useState({});
  const forceUpdate = useCallback(() => setForceUpdate({}), []);

  useEffect(() => {
    callback?.();
    forceUpdate();
  }, [callback, forceUpdate]);

  return forceUpdate;
}
