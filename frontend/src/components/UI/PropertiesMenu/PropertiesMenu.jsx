import lodash from 'lodash';

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Modal,
  Stack,
  Tab,
  Tabs,
} from '@mui/material';

import { MenuHeader, Property, TabPanel } from '..';
import { usePropertiesActions, usePropertiesForm } from '../../../hooks';

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

const defaultLabel = { name: '', value: '' };
const specialLabelProps = {
  omit: ['position', 'isHidden'],
  disabled: ['unit'],
};

export function PropertiesMenu({ menu, id, label, properties }) {
  const form = usePropertiesForm(label, properties, menu.isOpen);
  const actions = usePropertiesActions(id, menu, form);

  return (
    <Modal
      open={menu.isOpen}
      onClose={menu.close}
      aria-labelledby='Property Editor Menu'
      aria-describedby={`Properties for component ${id}`}
    >
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
          <Property name='ID' value={id} disabled />
          {Object.entries(properties ?? {}).map(([name, value], idx) => (
            <Property key={idx} name={name} value={value} />
          ))}
        </TabPanel>

        {/* Label */}
        <TabPanel value={menu.selectedTab} index={1}>
          {Object.keys({
            ...defaultLabel,
            ...lodash.omit(label, specialLabelProps.omit),
          }).map((key) => (
            <Property
              key={key}
              name={lodash.capitalize(key)}
              value={form.newComp.label?.[key] ?? ''}
              onChange={(e) => form.updateNewLabel(key, e.target.value)}
              disabled={specialLabelProps.disabled.includes(key)}
            />
          ))}
          <FormControlLabel
            control={
              <Checkbox
                checked={form.newComp.label.isHidden}
                onChange={form.toggleLabel}
              />
            }
            label='Hide Label'
          />
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
