import { useMemo } from 'react';
import { Avatar, Stack, Tooltip, Typography } from '@mui/material';

import { svgMap } from '../../../assets/electrical';

const compSize = 65;

export function Comp({ type, name, altImgIdx, ...rest }) {
  const src = useMemo(() => {
    let src = svgMap.get(type ?? name);
    if (src instanceof Array) src = src[altImgIdx ?? 0];
    return src;
  }, [type, name, altImgIdx]);

  return (
    <Tooltip title={name} arrow>
      <Stack direction='column' alignItems='center' spacing={1} sx={{ p: 1 }}>
        <Avatar
          src={src}
          alt={name}
          variant='square'
          sx={{ width: compSize, height: compSize }}
          {...rest}
        />
        <Typography align='center' noWrap sx={{ width: compSize }}>
          {name}
        </Typography>
      </Stack>
    </Tooltip>
  );
};
