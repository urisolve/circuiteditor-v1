// Material-UI
import { Avatar, Stack, Tooltip, Typography } from '@mui/material';

// Custom config
import { symbols } from '../../../configs';

export function Comp({ type, fullName, action, ...rest }) {
  return (
    <Stack
      direction='column'
      alignItems='center'
      spacing={1}
      sx={{
        p: 1,
        '&:hover': {
          transform: 'scale(1.1)',
        },
      }}
    >
      <Avatar
        src={symbols[type]}
        alt={fullName}
        onDoubleClick={action}
        variant='square'
        sx={{ width: '100%', height: '100%' }}
        {...rest}
      />
      <Tooltip
        enterDelay={500}
        enterNextDelay={500}
        title={fullName ?? type}
        arrow
      >
        <Typography align='center' noWrap sx={{ width: '100%' }}>
          {fullName}
        </Typography>
      </Tooltip>
    </Stack>
  );
}
