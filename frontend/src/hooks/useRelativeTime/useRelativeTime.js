import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Supported locales
import 'dayjs/locale/pt';

dayjs.extend(relativeTime);

export function useRelativeTime(timeStamp) {
  const { i18n } = useTranslation();

  return useMemo(
    () => dayjs(timeStamp).locale(i18n.resolvedLanguage).fromNow(),
    [i18n.resolvedLanguage, timeStamp],
  );
}
