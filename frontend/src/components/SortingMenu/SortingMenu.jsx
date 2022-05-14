import { Box, Divider, ListItemText, Menu, MenuItem } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

export function SortingMenu({ categories, ...rest }) {
  return (
    <Menu {...rest}>
      {categories.map(({ title, items, selected, selector }, i) => (
        <Box key={title}>
          {i !== 0 && <Divider />}

          <MenuItem disabled>
            <ListItemText inset>{title}</ListItemText>
          </MenuItem>

          {items.map((item) => (
            <MenuItem
              key={item.name}
              selected={selected === item.value}
              onClick={() => selector(item.value)}
            >
              {selected === item.value && <CheckIcon sx={{ mr: 1.5 }} />}

              <ListItemText inset={selected !== item.value}>
                {item.name}
              </ListItemText>
            </MenuItem>
          ))}
        </Box>
      ))}
    </Menu>
  );
}
