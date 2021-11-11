import { useMemo } from 'react'

// Day.js
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export function useTimeSince(timeStamp) {
  return useMemo(() => dayjs(timeStamp).fromNow(), [timeStamp]);
}