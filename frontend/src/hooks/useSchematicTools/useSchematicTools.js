import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep, find, isEqual, isFunction, pick } from 'lodash';

import {
  generateUniqueName,
  isComponent,
  isConnection,
  isGround,
  isNode,
  isSchematic,
  LabelOptions,
  snapPosToGrid,
} from '../../util';
import { constants } from '../../constants';

export function useSchematicTools(setSchematic, history) {
  const applyChanges = useCallback(
    (callback, { startSchematic = null, save = true } = {}) =>
      setSchematic((oldSchematic) => {
        const newSchematic = cloneDeep(oldSchematic);

        callback(newSchematic);

        const hasChanges = !isEqual(
          startSchematic ?? oldSchematic,
          newSchematic,
        );

        if (save && hasChanges) {
          history.save(startSchematic ?? oldSchematic);
        }

        return newSchematic;
      }),
    [history, setSchematic],
  );

  const add = useCallback(
    (elements) => {
      // Fix data structure of elements
      const schema = !isSchematic(elements)
        ? { components: [elements], nodes: [], connections: [] }
        : pick(elements, ['components', 'nodes', 'connections']);

      applyChanges(
        (schematic) => {
          Object.entries(schema).forEach(([key, elementArr]) => {
            elementArr.forEach((element) => {
              const elementId = element?.id ?? uuidv4();

              schematic[key].push({
                id: elementId,
                ...element,

                ...(!isConnection(element) && {
                  position: {
                    ...snapPosToGrid(element?.position),
                    angle: element?.position?.angle ?? 0,
                  },
                }),

                ...(isComponent(element) && {
                  ports: element?.ports?.map((port) => ({
                    id: uuidv4(),
                    owner: elementId,
                    ...port,
                  })),
                }),

                label: {
                  id: uuidv4(),
                  owner: elementId,
                  ...element?.label,
                  name:
                    !isGround(element) &&
                    generateUniqueName(
                      schematic[key],
                      isComponent(element)
                        ? LabelOptions.NUMERIC
                        : LabelOptions.ALPHABETIC,
                      element?.label?.name ?? element?.type,
                    ),
                  position: {
                    x:
                      (element?.position?.x ?? 0) +
                      constants.LABEL_POSITION_OFFSET.x,
                    y:
                      (element?.position?.y ?? 0) +
                      constants.LABEL_POSITION_OFFSET.y,
                    ...element.label?.position,
                  },
                },
              });
            });
          });
        },
        { save: true },
      );
    },
    [applyChanges],
  );

  const deleteById = useCallback(
    (ids) =>
      applyChanges(
        (schematic) => {
          // Delete each of the corresponding elements
          for (const id of ids) {
            for (const type in schematic) {
              // Find the element
              const elem = find(schematic[type], { id });
              if (!elem) continue;

              // Remove all connections if the element is a node
              if (isNode(elem)) {
                schematic.connections = schematic.connections.filter(
                  (conn) => conn.start !== id && conn.end !== id,
                );
              }

              // Remove all connections to the ports of the component
              else if (isComponent(elem)) {
                for (const port of elem.ports) {
                  schematic.connections = schematic.connections.filter(
                    (conn) => conn.start !== port.id && conn.end !== port.id,
                  );
                }
              }

              // Delete the element with the given id
              schematic[type] = schematic[type].filter(
                (elem) => elem.id !== id,
              );
            }
          }
        },
        { save: true },
      ),
    [applyChanges],
  );

  const editById = useCallback(
    (ids, edits, options) =>
      applyChanges((schematic) => {
        for (const id of ids) {
          for (const type in schematic) {
            schematic[type] = schematic[type].map((elem) => {
              if (elem.id !== id) return elem;

              return isFunction(edits) ? edits(elem) : { ...elem, ...edits };
            });
          }
        }
      }, options),
    [applyChanges],
  );

  const genericMove = useCallback(
    (getMovedElement, ids, pos, options) =>
      editById(
        ids,
        (element) => {
          const position = isFunction(pos) ? pos(element) : pos;
          const snappedPosition = snapPosToGrid(position);

          return getMovedElement(element, snappedPosition);
        },
        options,
      ),
    [editById],
  );

  const moveItems = useCallback(
    (...args) =>
      genericMove(
        (element, newPosition) => ({
          ...element,
          position: { ...element?.position, ...newPosition },
          label: {
            ...element?.label,
            position: {
              ...element?.label?.position,
              x:
                element?.label?.position.x +
                newPosition?.x -
                element?.position?.x,
              y:
                element?.label?.position.y +
                newPosition?.y -
                element?.position?.y,
            },
          },
        }),
        ...args,
      ),
    [genericMove],
  );

  const moveLabels = useCallback(
    (...args) =>
      genericMove(
        (element, newPosition) => ({
          ...element,
          label: {
            ...element?.label,
            position: { ...element.label.position, ...newPosition },
          },
        }),
        ...args,
      ),
    [genericMove],
  );

  const rotateSelection = useCallback(
    (ids, amount) =>
      editById(
        ids,
        (elem) => ({
          ...elem,
          position: {
            ...elem?.position,
            angle: (elem.position.angle ?? 0) + amount,
          },
        }),
        { save: true },
      ),
    [editById],
  );

  return {
    add,
    deleteById,
    editById,

    move: {
      items: moveItems,
      labels: moveLabels,
    },

    rotateSelection,
  };
}
