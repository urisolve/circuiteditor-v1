import { createRef } from 'react';

const refMap = new Map();

function setRef(key) {
  if (!key) throw new Error(`Cannot set ref with key "${key}"`);

  if (refMap.has(key)) return refMap.get(key);

  const ref = createRef();
  refMap.set(key, ref);
  return ref;
}

function getRef(key) {
  if (!key) throw new Error(`Cannot get ref with key "${key}"`);
  if (!refMap.has(key)) throw new Error(`There is no ref with key "${key}"`);

  return refMap.get(key);
}

export function useRefMap() {
  return { refMap, setRef, getRef };
}
