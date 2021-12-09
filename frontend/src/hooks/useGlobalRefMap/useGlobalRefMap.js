import { createRef } from 'react';

const refs = new Map();

function refMap(key) {
  if (!key) throw new Error(`The ref key must be valid (key: "${key}")`);

  // If the Ref already exists
  if (refs.has(key)) return refs.get(key);

  // If the Ref doesn't exist
  const ref = createRef();
  refs.set(key, ref);
  return ref;
}

export function useGlobalRefMap() {
  return refMap;
}
