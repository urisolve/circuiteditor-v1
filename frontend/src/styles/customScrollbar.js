import { grey } from '@mui/material/colors';
import { theme } from './theme';

export const customScrollbar = {
  '*::-webkit-scrollbar': {
    width: 10,
    height: 10,
  },
  '*::-webkit-scrollbar-track': {
    display: 'none',
  },
  '*::-webkit-scrollbar-thumb': {
    borderRadius: theme.spacing(2),
    background: grey[500],
    '&:hover': {
      background: grey[400],
    },
  },
};
