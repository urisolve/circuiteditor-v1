import { IconButton, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export function MenuHeader({ onClose, children, icon, ...rest }) {
  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      {...rest}
    >
      <Stack direction='row' alignItems='center' spacing={1}>
        {icon}

        <Typography variant='h5' component='h3' textAlign='center' noWrap>
          {children}
        </Typography>
      </Stack>

      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Stack>
  );
}
