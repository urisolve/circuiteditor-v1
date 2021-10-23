import { useMemo } from 'react'
import moment from 'moment';

export function useTimeSince(timeStamp) {
  return useMemo(() => moment(timeStamp).fromNow(), [timeStamp]);
}