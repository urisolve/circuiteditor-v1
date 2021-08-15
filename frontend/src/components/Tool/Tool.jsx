import React from 'react';

import { Tooltip, IconButton } from '@material-ui/core';

export const Tool = ({ name, icon, onClick, disabled, ...rest }) => {
  return (
    <Tooltip title={name} arrow>
      <IconButton
        onClick={onClick}
        aria-label={name}
        disabled={disabled ?? false}
        {...rest}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};
