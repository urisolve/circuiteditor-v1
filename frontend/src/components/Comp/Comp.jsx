import React, { useMemo } from 'react';
import { Tooltip } from '@material-ui/core';
import { svgMap } from '../../assets/electrical/index.js';

export const Comp = ({ name, altImgIdx, ...rest }) => {
  const src = useMemo(() => {
    let src = svgMap.get(name);
    if (src instanceof Array) src = src[altImgIdx ?? 0];
    return src;
  }, [name, altImgIdx]);

  return (
    <Tooltip title={name} key={name} arrow>
      <img src={src} alt={name} {...rest} />
    </Tooltip>
  );
};
