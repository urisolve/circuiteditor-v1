import { useContext } from 'react';
import { SchematicContext } from '../../contexts';

export function usePropertiesActions(id, menu, form) {
  const schematic = useContext(SchematicContext);
  const save = () => schematic.editById(id, form.newComp, schematic.data);

  return {
    ok: () => {
      save();
      menu.close();
    },
    cancel: () => {
      menu.close();
      form.resetNewComp();
    },
    apply: () => {
      save();
    },
  };
}
