import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box, Button, Stack, Tab, Tabs } from '@mui/material';

import { CenterModal, MenuHeader, TabPanel } from '..';
import { SchematicContext } from '../../contexts';
import { isNameTaken, labelValueRegex } from '../../util';
import { LabelForm, PropertiesForm } from '../../forms';
import { useTranslation } from 'react-i18next';

const getSchema = (schematic, contextKey, id) =>
  yup.object({
    label: yup.object({
      name: yup
        .string()
        .trim()
        .test(
          'not_unique',
          'That name is already taken',
          (name) => !isNameTaken(schematic?.[contextKey], name, id),
        ),
      value: yup.string().trim().matches(labelValueRegex, {
        excludeEmptyString: true,
        message: 'Insert a valid value',
      }),
      unit: yup.string().trim(),
      isNameHidden: yup.bool(),
      isValueHidden: yup.bool(),
    }),
    properties: yup.object({}),
  });

export function PropertiesMenu({ contextKey, menu, id, label, properties }) {
  const { t } = useTranslation();
  const { data: schematic, editById } = useContext(SchematicContext);

  const form = useForm({
    defaultValues: { label, properties },
    resolver: yupResolver(getSchema(schematic, contextKey, id)),
  });

  const actions = {
    ok: (changes) => {
      editById([id], changes);
      menu.close();
    },
    cancel: () => {
      form.reset();
      menu.close();
    },
    apply: (changes) => {
      editById([id], changes);
    },
  };

  return (
    <CenterModal
      open={menu.isOpen}
      onClose={menu.close}
      aria-labelledby='modal-title'
    >
      <form onSubmit={form.handleSubmit(actions.ok)}>
        <MenuHeader id='modal-title' sx={{ mb: 2 }} onClose={menu.close}>
          {t('page.editor.propertyEditor')}
        </MenuHeader>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={menu.selectedTab}
            onChange={menu.changeTab}
            variant='fullWidth'
          >
            <Tab label={t('common.properties')} />
            <Tab label={t('common.label')} />
          </Tabs>
        </Box>

        {/* Properties */}
        <TabPanel value={menu.selectedTab} index={0}>
          <PropertiesForm form={form} id={id} {...properties} />
        </TabPanel>

        {/* Label */}
        <TabPanel value={menu.selectedTab} index={1}>
          <LabelForm form={form} {...label} />
        </TabPanel>

        <Stack direction='row' justifyContent='flex-end'>
          <Button type='submit'>{t('form.action.ok')}</Button>
          <Button onClick={actions.cancel}>{t('form.action.cancel')}</Button>
          <Button onClick={form.handleSubmit(actions.apply)}>
            {t('form.action.apply')}
          </Button>
        </Stack>
      </form>
    </CenterModal>
  );
}
