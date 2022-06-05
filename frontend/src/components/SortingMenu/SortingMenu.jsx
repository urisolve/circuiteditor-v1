import { useTranslation } from 'react-i18next';

import { Box, Divider, ListItemText, Menu, MenuItem } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

export function SortingMenu({ categories, ...rest }) {
  const { t } = useTranslation();

  return (
    <Menu {...rest}>
      {categories.map(({ title, items, selected, selector }, i) => (
        <Box key={title}>
          {i !== 0 && <Divider />}

          <MenuItem disabled>
            <ListItemText inset>{title}</ListItemText>
          </MenuItem>

          {Object.entries(items).map(([key, item]) => (
            <MenuItem
              key={key}
              selected={selected === item}
              onClick={() => selector(item)}
            >
              {selected === item && <CheckIcon sx={{ mr: 1.5 }} />}

              <ListItemText inset={selected !== item}>
                {t(`filter.${key}`)}
              </ListItemText>
            </MenuItem>
          ))}
        </Box>
      ))}
    </Menu>
  );
}
