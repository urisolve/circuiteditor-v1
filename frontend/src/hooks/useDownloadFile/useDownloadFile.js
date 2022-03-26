import { useMemo } from 'react';

export function useDownloadFile(
  content,
  fileName = 'download.txt',
  type = 'plain',
) {
  const downloadData = useMemo(
    () => ({
      href: `data:text/${type};charset=utf-8,${encodeURIComponent(content)}`,
      download: fileName,
    }),
    [content, fileName, type],
  );

  return downloadData;
}
