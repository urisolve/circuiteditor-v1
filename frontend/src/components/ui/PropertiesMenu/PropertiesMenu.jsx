import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box, Button, Modal, Stack, Tab, Tabs, TextField } from '@mui/material';

import { MenuHeader, TabPanel } from '..';
import { LabelForm } from '../LabelForm';
import { SchematicContext } from '../../../contexts';
import { isNameTaken, labelValueRegex } from '../../../util';

const modalStyle = {
  // Positioning
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  // Styling
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
  width: 360,
};

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
  const { data: schematic, editById } = useContext(SchematicContext);

  const form = useForm({
    defaultValues: { label, properties },
    resolver: yupResolver(getSchema(schematic, contextKey, id)),
  });

  const actions = {
    ok: (data) => {
      editById(id, data, schematic);
      menu.close();
    },
    cancel: () => {
      menu.close();
      form.reset();
    },
    apply: (data) => {
      editById(id, data, schematic);
    },
  };

  return (
    <Modal
      open={menu.isOpen}
      onClose={menu.close}
      aria-labelledby='Property Editor Menu'
      aria-describedby={`Properties for component ${id}`}
    >
      <form onSubmit={form.handleSubmit(actions.ok)}>
        <Box sx={modalStyle}>
          <MenuHeader sx={{ mb: 2 }} onClose={menu.close}>
            Properties Editor
          </MenuHeader>

          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={menu.selectedTab}
              onChange={menu.changeTab}
              variant='fullWidth'
            >
              <Tab label='Properties' />
              <Tab label='Label' />
            </Tabs>
          </Box>

          {/* Properties */}
          <TabPanel value={menu.selectedTab} index={0}>
            <TextField fullWidth label='ID' value={id} disabled />
          </TabPanel>

          {/* Label */}
          <TabPanel value={menu.selectedTab} index={1}>
            <LabelForm form={form} {...label} />
          </TabPanel>

          <Stack direction='row' justifyContent='flex-end'>
            <Button type='submit'>OK</Button>
            <Button onClick={actions.cancel}>Cancel</Button>
            <Button onClick={form.handleSubmit(actions.apply)}>Apply</Button>
          </Stack>
        </Box>
      </form>
    </Modal>
  );
}
