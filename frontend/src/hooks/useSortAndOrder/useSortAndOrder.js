import { useState, useMemo } from 'react';

export const SORT_OPTIONS = Object.freeze({
  alphabetically: 'name',
  dateCreated: 'createdAt',
  lastModified: 'updatedAt',
});

export const ORDER_OPTIONS = Object.freeze({
  ascending: +1,
  descending: -1,
});

export function useSortAndOrder(values) {
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.lastModified);
  const [orderBy, setOrderBy] = useState(ORDER_OPTIONS.descending);

  const sortedValues = useMemo(
    () =>
      values.sort(
        (a, b) =>
          (a[sortBy] > b[sortBy]) * orderBy +
          (a[sortBy] < b[sortBy]) * -orderBy,
      ),
    [values, sortBy, orderBy],
  );

  return [
    sortedValues,
    { sortBy, orderBy },
    { setSortBy, setOrderBy },
  ];
};
