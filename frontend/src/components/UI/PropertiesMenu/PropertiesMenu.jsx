import { useContext, useState } from 'react';
import lodash from 'lodash';

import { Box, Button, Modal, Stack, Tab, Tabs } from '@mui/material';

import { MenuHeader, Property, TabPanel } from '..';
import { SchematicContext } from '../../../contexts';

const modalStyle = {
  // Positioning
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  // Styling
  width: 360,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
};

export function PropertiesMenu({ id, label, properties, isOpen, close }) {
  // Tabs
  const [openTab, setOpenTab] = useState(0);
  const changeTab = (_, newTab) => setOpenTab(newTab);

  // Properties form
  const starterComp = {
    label: label ?? {},
    properties: properties ?? {},
  };
  const [newComp, setNewComp] = useState(starterComp);
  const resetNewComp = () => setNewComp(starterComp);
  const updateNewComp = (mods) => setNewComp((comp) => ({ ...comp, ...mods }));
  const updateNewLabel = (key, event) =>
    updateNewComp({ label: { ...label, [key]: event.target.value } });

  // Buttons' actions
  const schematic = useContext(SchematicContext);
  const save = () => schematic.editById(id, newComp, schematic.data);
  const actions = {
    ok: () => {
      save();
      close();
    },
    cancel: () => {
      close();
      resetNewComp();
    },
    apply: () => {
      save();
    },
  };

  return (
    <Modal
      open={isOpen}
      onClose={close}
      aria-labelledby='Property Editor Menu'
      aria-describedby={`Properties for component ${id}`}
    >
      <Box sx={modalStyle}>
        <MenuHeader sx={{ mb: 2 }} onClose={close}>
          Properties Editor
        </MenuHeader>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={openTab} onChange={changeTab} variant='fullWidth'>
            <Tab label='Label' />
            <Tab label='Properties' />
          </Tabs>
        </Box>

        {/* Label */}
        <TabPanel value={openTab} index={0}>
          {label &&
            Object.keys(lodash.omit(label, ['position'])).map((key) => (
              <Property
                key={key}
                name={lodash.capitalize(key)}
                value={newComp.label?.[key] ?? ''}
                onChange={(event) => updateNewLabel(key, event)}
                disabled={key === 'unit'}
              />
            ))}
        </TabPanel>

        {/* Properties */}
        <TabPanel value={openTab} index={1}>
          <Property name='ID' value={id} disabled />
          {Object.entries(properties ?? {}).map(([name, value], idx) => (
            <Property key={idx} name={name} value={value} />
          ))}
        </TabPanel>

        <Stack direction='row' justifyContent='flex-end'>
          <Button onClick={actions.ok}>OK</Button>
          <Button onClick={actions.cancel}>Cancel</Button>
          <Button onClick={actions.apply}>Apply</Button>
        </Stack>
      </Box>
    </Modal>
  );
}
