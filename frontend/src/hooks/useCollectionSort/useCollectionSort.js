import { useMemo } from 'react';

class CollectionSortError extends Error {
  constructor(errorProperty, ...args) {
    const message = `useCollection: no \`${errorProperty}\` specified.`;

    super(message, ...args);
    this.message = message;
  }
}

export function useCollectionSort(values, params) {
  if (!params.filterBy) throw new CollectionSortError('filterBy');
  if (!params.orderBy) throw new CollectionSortError('orderBy');
  if (!params.sortBy) throw new CollectionSortError('sortBy');

  const collection = useMemo(
    () =>
      values
        .filter((obj) => !!obj[params.filterBy])
        .sort(
          (a, b) =>
            (a[params.sortBy] > b[params.sortBy]) * +params.orderBy +
            (a[params.sortBy] < b[params.sortBy]) * -params.orderBy,
        ),
    [params, values],
  );

  return collection;
}
