import { useState } from 'react';

export function useContextMenu() {
  const [position, setPosition] = useState(null);

  function open(e) {
    e.preventDefault();
    setPosition({ left: e.clientX, top: e.clientY });
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
