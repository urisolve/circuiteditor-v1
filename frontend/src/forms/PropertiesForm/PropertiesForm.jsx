import { TextField } from '@mui/material';
import { useContext, useMemo } from 'react';

import {
  ComponentPropertiesForm,
  ConnectionPropertiesForm,
  NodePropertiesForm,
} from '..';
import { SchematicContext } from '../../contexts';
import { isComponent, isConnection, isNode } from '../../util';

export function PropertiesForm({ form, id, ...rest }) {
  const { itemsMap } = useContext(SchematicContext);

  const Form = useMemo(() => {
    const item = itemsMap[id];

    if (isConnection(item)) {
      return ConnectionPropertiesForm;
    }
    if (isNode(item)) {
      return NodePropertiesForm;
    }
    if (isComponent(item)) {
      return ComponentPropertiesForm;
    }

    return null;
  }, [id, itemsMap]);

  return (
    <>
      <TextField fullWidth label='ID' value={id} disabled />

      <Form form={form} {...rest} />
    </>
  );
}
