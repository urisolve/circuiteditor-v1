import { useMemo } from 'react';
import lodash from 'lodash';

// Material-UI
import { Avatar, Stack, Tooltip, Typography } from '@mui/material';

// Custom config
import { symbols } from '../../../configs';

const compSize = 65;

export function Comp({ fullName, action, ...rest }) {
  const name = useMemo(() => lodash.startCase(fullName), [fullName]);

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
        src={symbols[fullName]}
        alt={name}
        onDoubleClick={action}
        variant='square'
        sx={{ width: compSize, height: compSize }}
        {...rest}
      />
      <Tooltip enterDelay={500} enterNextDelay={500} title={name} arrow>
        <Typography align='center' noWrap sx={{ width: compSize }}>
          {name}
        </Typography>
      </Tooltip>
    </Stack>
  );
}
