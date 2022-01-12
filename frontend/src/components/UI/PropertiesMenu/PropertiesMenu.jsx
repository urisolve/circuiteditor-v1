import { Box, Modal, Tab, Tabs } from '@mui/material';
import { useState } from 'react';

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
  function changeTab(event, newTab) {
    setOpenTab(newTab);
  }

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

        <TabPanel value={openTab} index={0}>
          <Property name='Name' value={label?.name} />
          <Property name='Value' value={label?.value} />
        </TabPanel>

        <TabPanel value={openTab} index={1}>
          {Object.entries(properties ?? {}).map(([name, value], idx) => (
            <Property key={idx} name={name} value={value} />
          ))}
        </TabPanel>
      </Box>
    </Modal>
  );
}
