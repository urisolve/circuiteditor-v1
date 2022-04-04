import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import lodash from 'lodash';

import {
  generateUniqueName,
  isComponent,
  isConnection,
  isNode,
  isSchematic,
  LabelOptions,
  snapPosToGrid,
} from '../../util';

export function useSchematicTools(setSchematic, history, gridSize) {
  const add = useCallback(
    (elements) => {
      setSchematic((oldSchematic) => {
        // Make a clone of the current schematic
        const newSchematic = lodash.cloneDeep(oldSchematic);

        // Default stranded elements to be components
        const schema = !isSchematic(elements)
          ? { components: [elements], nodes: [], connections: [] }
          : elements;

        // Add elements to schematic
        Object.entries(schema).forEach(([key, elementArr]) => {
          if (!['components', 'nodes', 'connections'].includes(key)) return;

          newSchematic[key] = newSchematic[key].concat(
            elementArr.map((element) => ({
              id: uuidv4(),
              ...element,

              // Add a position that is snapped to the grid
              ...(!isConnection(element) && {
                position: snapPosToGrid(element.position, gridSize),
              }),

              // Add IDs to the ports
              ...(isComponent(element) && {
                ports: element.ports?.map((port) => ({
                  id: uuidv4(),
                  ...port,
                })),
              }),

              label: {
                ...element.label,
                name: generateUniqueName(
                  newSchematic[key],
                  isNode(element)
                    ? LabelOptions.ALPHABETIC
                    : LabelOptions.NUMERIC,
                  element?.label?.name,
                ),
                isHidden: !isComponent(element),
              },
            })),
          );
        });

        // If the changes are valid, save the old schematic
        if (!lodash.isEqual(oldSchematic, newSchematic))
          history.save(oldSchematic);

        return newSchematic;
      });
    },
    [setSchematic, history, gridSize],
  );

  const deleteById = useCallback(
    (ids) => {
      setSchematic((oldSchematic) => {
        // Make a clone of the current schematic
        const newSchematic = lodash.cloneDeep(oldSchematic);

        // Force ids into array format
        if (ids instanceof Set) ids = [...ids];
        if (!(ids instanceof Array)) ids = [ids];

        // Delete each of the corresponding elements
        for (const id of ids) {
          for (const type in newSchematic) {
            // Find the element
            const elem = lodash.find(newSchematic[type], { id });
            if (!elem) continue;

            // Remove all connections if the element is a node
            if (isNode(elem)) {
              newSchematic.connections = newSchematic.connections.filter(
                (conn) => conn.start !== id && conn.end !== id,
              );
            }

            // Remove all connections to the ports of the component
            else if (isComponent(elem)) {
              for (const port of elem.ports) {
                newSchematic.connections = newSchematic.connections.filter(
                  (conn) => conn.start !== port.id && conn.end !== port.id,
                );
              }
            }

            // Delete the element with the given id
            newSchematic[type] = newSchematic[type].filter(
              (elem) => elem.id !== id,
            );
          }
        }

        // If the changes are valid, save the old schematic
        if (!lodash.isEqual(oldSchematic, newSchematic))
          history.save(oldSchematic);

        return newSchematic;
      });
    },
    [setSchematic, history],
  );

  const editById = useCallback(
    (ids, edits, startSch = null) => {
      setSchematic((oldSchematic) => {
        // Make a clone of the current schematic
        const newSchematic = lodash.cloneDeep(oldSchematic);

        // Force IDs into array format
        if (ids instanceof Set) ids = [...ids];
        if (!(ids instanceof Array)) ids = [ids];

        // Apply the edits
        for (const id of ids) {
          for (const type in newSchematic) {
            newSchematic[type] = newSchematic[type].map((elem) => {
              if (elem.id !== id) return elem;
              return lodash.isFunction(edits)
                ? edits(elem)
                : { ...elem, ...edits };
            });
          }
        }

        // If the changes are valid, save the old schematic
        if (startSch && !lodash.isEqual(startSch, newSchematic))
          history.save(startSch);

        return newSchematic;
      });
    },
    [setSchematic, history],
  );

  return { add, deleteById, editById };
}
