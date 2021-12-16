import { IconButton, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export function SidebarHeader({ onClose, children, ...rest }) {
  return (
    <Stack direction='row' alignItems='center' justifyContent='space-between'>
      <Typography variant='h5' component='h3' noWrap>
        {children}
      </Typography>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Stack>
  );
}
