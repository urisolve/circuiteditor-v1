import { useState } from 'react';
import lodash from 'lodash';

import { Box, Button, Modal, Stack, Tab, Tabs } from '@mui/material';

import { MenuHeader, Property, TabPanel } from '..';

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
  const [openTab, setOpenTab] = useState(0);
  const changeTab = (_, newTab) => setOpenTab(newTab);

  const [newComp, setNewComp] = useState({ label, properties });
  const updateNewComp = (mods) => setNewComp((comp) => ({ ...comp, ...mods }));
  const updateNewLabel = (key, event) =>
    updateNewComp({ label: { [key]: event.target.value } });

  // TODO: Save the changes to the schematic
  function save() {}

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
                value={newComp.label?.[key]}
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
          <Button
            onClick={() => {
              save();
              close();
            }}
          >
            OK
          </Button>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={save}>Apply</Button>
        </Stack>
      </Box>
    </Modal>
  );
}
