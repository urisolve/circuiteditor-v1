import { useState, useMemo, useCallback } from 'react';

export function useHistory(setter, maxLength) {
  const [history, setHistory] = useState({ undoStack: [], redoStack: [] });

  const save = useCallback(
    (change) =>
      setHistory((hist) => {
        if (hist.undoStack.push(change) > maxLength) hist.undoStack.shift();
        return hist;
      }),
    [setHistory, maxLength],
  );

  const updateHistory = useCallback(
    (isUndo) => {
      setter((prev) => {
        let curr = prev;

        setHistory((hist) => {
          const saveStack = isUndo ? hist.redoStack : hist.undoStack;
          const getStack = isUndo ? hist.undoStack : hist.redoStack;

          if (getStack.length) {
            if (saveStack.push(prev) > maxLength) saveStack.shift();
            curr = getStack.pop();
          }

          return hist;
        });

        return curr;
      });
    },
    [setter, setHistory, maxLength],
  );

  const undo = useCallback(() => updateHistory(true), [updateHistory]);
  const redo = useCallback(() => updateHistory(false), [updateHistory]);

  const canUndo = useMemo(
    () => !!history.undoStack.length,
    [history.undoStack.length],
  );
  const canRedo = useMemo(
    () => !!history.redoStack.length,
    [history.redoStack.length],
  );

  return { save, undo, redo, canUndo, canRedo };
};
