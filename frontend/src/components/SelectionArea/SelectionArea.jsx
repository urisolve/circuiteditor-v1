import {
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useLayoutEffect,
} from 'react';
import lodash from 'lodash';

// Material-UI
import { Box } from '@mui/material';

// Utility
import { useBoolean, useGlobalRefMap } from '../../hooks';
import { areasIntersect } from '../../util';

// An ENUM of the different types of mouse-clicks
const MOUSE = Object.freeze({ NONE: 0, LEFT: 1, MIDDLE: 2, RIGHT: 3 });

export function SelectionArea({
  parentRef,
  ignoreItems,
  selectableItems,
  setSelectedItems,
  fps,
  disabled,
  ...rest
}) {
  const showArea = useBoolean(false);
  const selectionArea = useRef({ left: 0, top: 0, width: 0, height: 0 });
  const ignoreAreas = useRef([]);
  const selectableAreas = useRef([]);
  const parentRect = useRef(null);
  const startPoint = useRef(null);

  const refMap = useGlobalRefMap();

  /**
   * Calculate the areas of the elements
   */
  useLayoutEffect(() => {
    // Calculate the bounding area of the parent element
    const rect = parentRef.current?.getBoundingClientRect() ?? {};
    parentRect.current = {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    };

    // Calculate the bounding areas of the items marked to ignore
    ignoreAreas.current = [];
    for (const elem of ignoreItems ?? []) {
      const elemArea = refMap.get(elem.id).current.getBoundingClientRect();
      ignoreAreas.current.push({
        id: elem.id,
        left: elemArea.left - parentRect.current.left,
        top: elemArea.top - parentRect.current.top,
        width: elemArea.width,
        height: elemArea.height,
      });
    }

    // Calculate the bounding areas of the items
    selectableAreas.current = [];
    for (const elem of selectableItems ?? []) {
      try {
        const elemArea = refMap.get(elem.id).current.getBoundingClientRect();
        selectableAreas.current.push({
          id: elem.id,
          left: elemArea.left - parentRect.current.left,
          top: elemArea.top - parentRect.current.top,
          width: elemArea.width,
          height: elemArea.height,
        });
      } catch {
        continue;
      }
    }
  }, [refMap, ignoreItems, selectableItems, parentRef]);

  /**
   * Handler for moving the mouse.
   */
  const onMouseMove = useMemo(
    () =>
      lodash.throttle((event) => {
        // Start dragging
        showArea.on();

        // Calculate the current position of mouse
        const endPoint = {
          left: event.clientX - parentRect.current.left,
          top: event.clientY - parentRect.current.top,
        };

        // Calculate the selection area
        selectionArea.current = {
          height: Math.abs(endPoint.top - startPoint.current.top),
          width: Math.abs(endPoint.left - startPoint.current.left),
          top:
            endPoint.top - startPoint.current.top > 0
              ? startPoint.current.top
              : endPoint.top,
          left:
            endPoint.left - startPoint.current.left > 0
              ? startPoint.current.left
              : endPoint.left,
        };

        // Calculate which elements are being selected
        const items = new Set();
        for (const area of selectableAreas.current)
          if (areasIntersect(area, selectionArea.current)) items.add(area.id);

        // Apply the selection
        setSelectedItems?.((selected) => new Set([...selected, ...items]));

        event.preventDefault();
      }, 1000 / (fps ?? 30)),
    [setSelectedItems, startPoint, fps, showArea],
  );

  /**
   * Handler for letting go of mouse1.
   */
  const onMouseUp = useCallback(
    (event) => {
      // Stop dragging
      showArea.off();

      // Cancel throttled function calls
      onMouseMove.cancel();

      // Remove event listeners while not being used
      parentRef.current.removeEventListener('mousemove', onMouseMove);
      parentRef.current.removeEventListener('mouseup', onMouseUp);

      event.preventDefault();
    },
    [onMouseMove, parentRef, showArea],
  );

  /**
   * Handler for pressing left mouse button.
   */
  const onMouseDown = useCallback(
    (event) => {
      if (disabled) return;

      // Only allow left clicks
      if (event.which !== MOUSE.LEFT) return;

      // Check if CTRL was pressed
      if (!event.ctrlKey) setSelectedItems?.(new Set());

      // Calculate click point
      const clickPoint = {
        left: event.clientX - parentRect.current.left,
        top: event.clientY - parentRect.current.top,
      };

      // Ignore click if it was on an item marked to ignore
      for (const area of ignoreAreas.current) {
        if (areasIntersect(clickPoint, area)) {
          event.preventDefault();
          return;
        }
      }

      // Single click on selectable items
      for (const area of selectableAreas.current) {
        if (areasIntersect(clickPoint, area)) {
          setSelectedItems?.((items) => {
            if (items.has(area.id)) items.delete(area.id);
            else items.add(area.id);
            return items;
          });

          event.preventDefault();
          return;
        }
      }

      // Initialize the selection area
      startPoint.current = clickPoint;
      selectionArea.current = {
        ...startPoint.current,
        width: 0,
        height: 0,
      };

      // Enable event listeners for drag
      parentRef.current.addEventListener('mousemove', onMouseMove);
      parentRef.current.addEventListener('mouseup', onMouseUp);

      event.preventDefault();
    },
    [setSelectedItems, disabled, parentRef, onMouseUp, onMouseMove],
  );

  /**
   * Apply the event listener for clicking the mouse.
   */
  useEffect(() => {
    const cleanup = parentRef;
    parentRef.current.addEventListener('mousedown', onMouseDown);

    return () => {
      if (!cleanup.current) return;
      cleanup.current.removeEventListener('mousedown', onMouseDown);
    };
  }, [parentRef, onMouseDown]);

  return (
    <Box
      sx={{
        // Fixed
        zIndex: 1,
        position: 'absolute',
        display: showArea.value ? 'inline-block' : 'none',
        width: selectionArea.current.width,
        height: selectionArea.current.height,
        transform: `translate(${selectionArea.current.left}px, ${selectionArea.current.top}px)`,

        // Customizable
        backgroundColor: 'rgba(100, 149, 237, 0.25)',
        boxShadow: '0px 0px 0px 2px rgba(100, 149, 237, 0.75) inset',
      }}
      {...rest}
    />
  );
}
