import { Avatar, Stack, Tooltip, Typography } from '@mui/material';
import { camelCase } from 'lodash';
import { useTranslation } from 'react-i18next';

import { symbols } from '../../assets/electrical';

export function Comp({ type, fullName, action, ...rest }) {
  const { t } = useTranslation();

  const name = t(`library.component.${camelCase(fullName)}`);

  return (
    <Stack
      alignItems='center'
      direction='column'
      spacing={1}
      sx={{
        p: 1,
        '&:hover': {
          transform: 'scale(1.1)',
        },
      }}
    >
      <Avatar
        alt={fullName}
        onDoubleClick={action}
        src={symbols[type]}
        sx={{ width: '100%', height: '100%' }}
        variant='square'
        {...rest}
      />

      <Tooltip arrow enterDelay={500} enterNextDelay={500} title={name}>
        <Typography align='center' noWrap sx={{ width: '100%' }}>
          {name}
        </Typography>
      </Tooltip>
    </Stack>
  );
}
