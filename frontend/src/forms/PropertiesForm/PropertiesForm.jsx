import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { TextField } from '@mui/material';

import {
  ComponentPropertiesForm,
  ConnectionPropertiesForm,
  NodePropertiesForm,
} from '..';
import { SchematicContext } from '../../contexts';
import { isComponent, isConnection, isNode } from '../../util';

export function PropertiesForm({ form, id, ...rest }) {
  const { t } = useTranslation();
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
      <TextField disabled fullWidth label={t('form.label.id')} value={id} />

      <Form form={form} {...rest} />
    </>
  );
}
