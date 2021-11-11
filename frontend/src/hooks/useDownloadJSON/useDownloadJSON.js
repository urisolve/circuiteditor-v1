import { useMemo } from 'react';

export function useDownloadJSON(obj) {
  return useMemo(
    () =>
      `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(obj, null, 2)
      )}`,
    [obj]);
}