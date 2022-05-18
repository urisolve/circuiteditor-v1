import { useState } from 'react';

const isTouchEvent = (event) => event.hasOwnProperty('touches');

export function useContextMenu() {
  const [position, setPosition] = useState(null);

  function open(event) {
    if (isTouchEvent(event)) {
      const [touch] = event.touches;
      setPosition({ left: touch.clientX, top: touch.clientY });
    } else {
      setPosition({ left: event.clientX, top: event.clientY });
    }

    event.preventDefault();
  }

  function close() {
    setPosition(null);
  }

  return {
    position,
    open,
    close,
    isOpen: Boolean(position),
  };
}
