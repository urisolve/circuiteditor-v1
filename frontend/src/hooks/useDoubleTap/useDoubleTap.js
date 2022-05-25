import { useCallback, useRef } from 'react';

export function useDoubleTap(callback, threshold = 300) {
  const timer = useRef(null);

  const handler = useCallback(
    (event) => {
      if (!timer.current) {
        timer.current = setTimeout(() => {
          timer.current = null;
        }, threshold);
      } else {
        clearTimeout(timer.current);
        timer.current = null;

        callback(event);
      }
    },
    [callback, threshold],
  );

  return { onTouchStart: handler };
}
