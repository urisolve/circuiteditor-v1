import { useEffect, useMemo, useState } from 'react';

export function useHoldTouch(callback, ms = 500) {
  const [event, setEvent] = useState(false);
  const isHolding = useMemo(() => !!event, [event]);

  useEffect(() => {
    let timer;

    if (isHolding) {
      timer = setTimeout(() => callback(event), ms);
    } else {
      clearTimeout(timer);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [callback, event, isHolding, ms]);

  return {
    onTouchStart: (event) => setEvent(event),
    onTouchEnd: () => setEvent(null),
  };
}
